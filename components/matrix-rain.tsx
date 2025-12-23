"use client"

import { useEffect, useRef, useState } from "react"
import { MatrixRainCSS } from "./matrix-rain-css"

/**
 * Adaptive Matrix Rain Effect
 *
 * Automatically chooses between:
 * - CSS version (default): Lightweight, 60fps on any device
 * - Canvas version: Full effect, only on high-performance devices
 *
 * Detection based on:
 * - Hardware concurrency (CPU cores)
 * - Device memory
 * - Mobile vs desktop
 */
export function MatrixRain() {
  const [useCanvas, setUseCanvas] = useState(false)

  useEffect(() => {
    // Detect device performance
    const isHighPerformance = (): boolean => {
      // Mobile devices: always use CSS
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return false
      }

      // Check hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 2
      if (cores < 4) return false

      // Check device memory if available
      const memory = (navigator as { deviceMemory?: number }).deviceMemory
      if (memory && memory < 4) return false

      // Desktop with 4+ cores and 4GB+ RAM: use canvas
      return true
    }

    setUseCanvas(isHighPerformance())
  }, [])

  // Default to CSS (SSR-safe, lightweight)
  if (!useCanvas) {
    return <MatrixRainCSS />
  }

  return <MatrixRainCanvas />
}

/**
 * Canvas-based Matrix Rain (heavy, for high-end devices only)
 */
function MatrixRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Matrix characters - including crypto symbols
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン₿ΞTONUSDT$%&"
    const charArray = chars.split("")

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = Array(columns).fill(1)

    // Colors - primary green with occasional cyan highlights
    const primaryColor = "rgba(34, 197, 94, " // green-500
    const accentColor = "rgba(6, 182, 212, " // cyan-500

    function draw() {
      // Semi-transparent black to create fade effect
      ctx!.fillStyle = "rgba(8, 26, 8, 0.05)"
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      ctx!.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)]

        // Occasional bright cyan character for variety
        const isBright = Math.random() > 0.98
        const opacity = isBright ? "1)" : `${0.3 + Math.random() * 0.5})`
        ctx!.fillStyle = isBright ? accentColor + opacity : primaryColor + opacity

        // Draw the character
        ctx!.fillText(char, i * fontSize, drops[i] * fontSize)

        // Reset drop to top randomly after reaching bottom
        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" aria-hidden="true" />
}

/**
 * GPU Capability Detection for Progressive Enhancement
 * Determines whether to load Three.js/WebGL features based on device capabilities
 */

export type GPUTier = 'high' | 'medium' | 'low' | 'none'

interface GPUInfo {
  tier: GPUTier
  renderer: string
  vendor: string
  supportsWebGL2: boolean
  maxTextureSize: number
  memory: number
  cores: number
}

// Cache the result to avoid repeated detection
let cachedGPUInfo: GPUInfo | null = null

export function getGPUInfo(): GPUInfo {
  if (cachedGPUInfo) return cachedGPUInfo

  // Default for SSR
  if (typeof window === 'undefined') {
    return {
      tier: 'none',
      renderer: 'unknown',
      vendor: 'unknown',
      supportsWebGL2: false,
      maxTextureSize: 0,
      memory: 4,
      cores: 4,
    }
  }

  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')

  const memory = (navigator as any).deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4

  if (!gl) {
    cachedGPUInfo = {
      tier: 'none',
      renderer: 'no-webgl',
      vendor: 'unknown',
      supportsWebGL2: false,
      maxTextureSize: 0,
      memory,
      cores,
    }
    return cachedGPUInfo
  }

  const supportsWebGL2 = !!(canvas.getContext('webgl2'))
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')

  let renderer = 'unknown'
  let vendor = 'unknown'

  if (debugInfo) {
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'unknown'
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'unknown'
  }

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096

  // Determine tier based on GPU
  let tier: GPUTier = 'low'

  const rendererLower = renderer.toLowerCase()

  // High-end GPUs
  if (
    /rtx|rx 6|rx 7|radeon pro|m1|m2|m3|apple gpu|a14|a15|a16|a17/i.test(renderer) ||
    (maxTextureSize >= 16384 && cores >= 8)
  ) {
    tier = 'high'
  }
  // Medium GPUs
  else if (
    /gtx 10|gtx 16|rx 5|intel iris|intel uhd|adreno 6|mali-g7/i.test(renderer) ||
    (maxTextureSize >= 8192 && cores >= 4)
  ) {
    tier = 'medium'
  }
  // Low-end or integrated
  else if (supportsWebGL2) {
    tier = 'low'
  }

  cachedGPUInfo = {
    tier,
    renderer,
    vendor,
    supportsWebGL2,
    maxTextureSize,
    memory,
    cores,
  }

  return cachedGPUInfo
}

export function getGPUTier(): GPUTier {
  return getGPUInfo().tier
}

/**
 * Determines if Three.js features should be enabled
 * Only enables on high/medium tier devices with sufficient resources
 */
export function shouldUseThreeJS(): boolean {
  const info = getGPUInfo()

  // Require at least medium tier GPU
  if (info.tier === 'none' || info.tier === 'low') return false

  // Require at least 4GB RAM and 4 cores
  if (info.memory < 4 || info.cores < 4) return false

  // Require WebGL2 for modern features
  if (!info.supportsWebGL2) return false

  // Check for reduced motion preference
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return false
  }

  return true
}

/**
 * Get recommended quality settings based on GPU tier
 */
export function getQualitySettings(): {
  antialias: boolean
  shadows: boolean
  particleCount: number
  pixelRatio: number
  postProcessing: boolean
} {
  const tier = getGPUTier()

  switch (tier) {
    case 'high':
      return {
        antialias: true,
        shadows: true,
        particleCount: 5000,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        postProcessing: true,
      }
    case 'medium':
      return {
        antialias: true,
        shadows: false,
        particleCount: 2000,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        postProcessing: false,
      }
    case 'low':
      return {
        antialias: false,
        shadows: false,
        particleCount: 500,
        pixelRatio: 1,
        postProcessing: false,
      }
    default:
      return {
        antialias: false,
        shadows: false,
        particleCount: 0,
        pixelRatio: 1,
        postProcessing: false,
      }
  }
}

/**
 * Hook for responsive Three.js loading
 */
export function useGPUCapabilities() {
  if (typeof window === 'undefined') {
    return {
      info: null,
      shouldUse3D: false,
      quality: null,
      isLoading: true,
    }
  }

  const info = getGPUInfo()
  const shouldUse3D = shouldUseThreeJS()
  const quality = shouldUse3D ? getQualitySettings() : null

  return {
    info,
    shouldUse3D,
    quality,
    isLoading: false,
  }
}

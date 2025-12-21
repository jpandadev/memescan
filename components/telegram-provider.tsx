"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

interface TelegramContext {
  user: TelegramUser | null
  isInTelegram: boolean
  isMiniApp: boolean
  expand: () => void
  close: () => void
  showAlert: (message: string) => void
  hapticFeedback: (type: "light" | "medium" | "heavy") => void
}

const TelegramContext = createContext<TelegramContext>({
  user: null,
  isInTelegram: false,
  isMiniApp: false,
  expand: () => {},
  close: () => {},
  showAlert: () => {},
  hapticFeedback: () => {},
})

export function useTelegram() {
  return useContext(TelegramContext)
}

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isInTelegram, setIsInTelegram] = useState(false)
  const [isMiniApp, setIsMiniApp] = useState(false)

  useEffect(() => {
    // Check if running in Telegram
    const tg = (window as any).Telegram?.WebApp
    if (tg) {
      setIsInTelegram(true)
      setIsMiniApp(true)

      // Initialize the Mini App
      tg.ready()
      tg.expand()

      // Set theme colors to match our app
      tg.setHeaderColor("#0a1a0a")
      tg.setBackgroundColor("#0a1a0a")

      // Get user data
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user)
      }

      // Update viewport height CSS variable
      const updateViewportHeight = () => {
        document.documentElement.style.setProperty("--tg-viewport-height", `${tg.viewportHeight}px`)
        document.documentElement.style.setProperty("--tg-viewport-stable-height", `${tg.viewportStableHeight}px`)
      }

      tg.onEvent("viewportChanged", updateViewportHeight)
      updateViewportHeight()

      return () => {
        tg.offEvent("viewportChanged", updateViewportHeight)
      }
    }
  }, [])

  const expand = () => {
    const tg = (window as any).Telegram?.WebApp
    tg?.expand()
  }

  const close = () => {
    const tg = (window as any).Telegram?.WebApp
    tg?.close()
  }

  const showAlert = (message: string) => {
    const tg = (window as any).Telegram?.WebApp
    if (tg) {
      tg.showAlert(message)
    } else {
      alert(message)
    }
  }

  const hapticFeedback = (type: "light" | "medium" | "heavy") => {
    const tg = (window as any).Telegram?.WebApp
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred(type)
    }
  }

  return (
    <TelegramContext.Provider
      value={{
        user,
        isInTelegram,
        isMiniApp,
        expand,
        close,
        showAlert,
        hapticFeedback,
      }}
    >
      {children}
    </TelegramContext.Provider>
  )
}

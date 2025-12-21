"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

const initialTokens: TickerItem[] = [
  { symbol: "TON", price: 2.45, change: 0.28, changePercent: 12.5 },
  { symbol: "NOT", price: 0.0089, change: 0.0028, changePercent: 45.2 },
  { symbol: "DOGS", price: 0.00042, change: -0.00001, changePercent: -3.2 },
  { symbol: "HMSTR", price: 0.0037, change: 0.0003, changePercent: 8.7 },
  { symbol: "CATI", price: 0.0046, change: -0.00005, changePercent: -1.2 },
  { symbol: "PTON", price: 0.000012, change: 0.000007, changePercent: 156.8 },
  { symbol: "JETTON", price: 0.089, change: 0.012, changePercent: 15.6 },
  { symbol: "GRAM", price: 0.0042, change: 0.0003, changePercent: 8.3 },
  { symbol: "SCALE", price: 0.0015, change: -0.0001, changePercent: -6.2 },
  { symbol: "REDO", price: 0.023, change: 0.004, changePercent: 21.1 },
]

export function LiveTicker() {
  const [tokens, setTokens] = useState(initialTokens)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setTokens((prev) =>
        prev.map((token) => {
          const priceChange = (Math.random() - 0.5) * token.price * 0.02
          const newPrice = Math.max(0.000001, token.price + priceChange)
          const newChange = token.change + priceChange
          const newChangePercent = (newChange / (newPrice - newChange)) * 100

          return {
            ...token,
            price: newPrice,
            change: newChange,
            changePercent: Math.max(-99, Math.min(999, newChangePercent)),
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [isPaused])

  const duplicatedTokens = [...tokens, ...tokens]

  const formatPrice = (price: number) => {
    if (price < 0.0001) return `$${price.toFixed(8)}`
    if (price < 0.01) return `$${price.toFixed(6)}`
    if (price < 1) return `$${price.toFixed(4)}`
    return `$${price.toFixed(2)}`
  }

  return (
    <div
      className="relative overflow-hidden bg-card border-y-2 border-primary py-2 sm:py-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex animate-ticker hover:animation-pause">
        {duplicatedTokens.map((token, index) => (
          <div
            key={`${token.symbol}-${index}`}
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 border-r border-border/50 whitespace-nowrap"
          >
            <div className="font-bold text-xs sm:text-sm text-primary">{token.symbol}</div>
            <div className="font-mono text-xs sm:text-sm">{formatPrice(token.price)}</div>
            <div
              className={`flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold ${
                token.changePercent >= 0 ? "text-chart-1" : "text-destructive"
              }`}
            >
              {token.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {token.changePercent >= 0 ? "+" : ""}
              {token.changePercent.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

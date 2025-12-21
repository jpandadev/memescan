"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

const initialStocks: TickerItem[] = [
  { symbol: "TSLA", price: 242.84, change: 12.4, changePercent: 5.4 },
  { symbol: "AAPL", price: 191.24, change: -2.14, changePercent: -1.1 },
  { symbol: "NVDA", price: 495.22, change: 38.7, changePercent: 8.5 },
  { symbol: "MSFT", price: 378.91, change: 5.2, changePercent: 1.4 },
  { symbol: "GOOGL", price: 139.5, change: 1.8, changePercent: 1.3 },
  { symbol: "META", price: 356.78, change: -4.2, changePercent: -1.2 },
  { symbol: "AMZN", price: 151.94, change: 2.5, changePercent: 1.7 },
  { symbol: "GME", price: 23.67, change: 7.2, changePercent: 43.5 },
  { symbol: "AMC", price: 6.89, change: 1.5, changePercent: 27.8 },
  { symbol: "PLTR", price: 18.45, change: 2.3, changePercent: 14.2 },
  { symbol: "COIN", price: 156.78, change: 14.2, changePercent: 9.9 },
  { symbol: "NFLX", price: 487.23, change: -8.4, changePercent: -1.7 },
]

export function LiveTicker() {
  const [stocks, setStocks] = useState(initialStocks)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((stock) => {
          // Simulate real-time price changes
          const priceChange = (Math.random() - 0.5) * 2
          const newPrice = stock.price + priceChange
          const newChange = stock.change + priceChange
          const newChangePercent = (newChange / (newPrice - newChange)) * 100

          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [isPaused])

  // Duplicate items for seamless loop
  const duplicatedStocks = [...stocks, ...stocks]

  return (
    <div
      className="relative overflow-hidden bg-card border-y-2 border-primary py-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex animate-ticker hover:animation-pause">
        {duplicatedStocks.map((stock, index) => (
          <div
            key={`${stock.symbol}-${index}`}
            className="flex items-center gap-3 px-6 border-r border-border/50 whitespace-nowrap"
          >
            <div className="font-bold text-sm">{stock.symbol}</div>
            <div className="font-mono text-sm">${stock.price.toFixed(2)}</div>
            <div
              className={`flex items-center gap-1 text-xs font-mono font-bold ${
                stock.change >= 0 ? "text-chart-1" : "text-destructive"
              }`}
            >
              {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stock.changePercent >= 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

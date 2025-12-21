"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface OrderBookEntry {
  price: number
  size: number
  total: number
}

function generateOrderBook(basePrice: number): { bids: OrderBookEntry[]; asks: OrderBookEntry[] } {
  const bids: OrderBookEntry[] = []
  const asks: OrderBookEntry[] = []
  let totalBid = 0
  let totalAsk = 0

  for (let i = 0; i < 15; i++) {
    const bidSize = Math.random() * 5 + 0.5
    const askSize = Math.random() * 5 + 0.5
    totalBid += bidSize
    totalAsk += askSize

    bids.push({
      price: basePrice - i * 50 - Math.random() * 30,
      size: bidSize,
      total: totalBid,
    })

    asks.push({
      price: basePrice + i * 50 + Math.random() * 30,
      size: askSize,
      total: totalAsk,
    })
  }

  return { bids, asks }
}

export function CryptoOrderBook({ symbol = "BTC/USD", basePrice = 43782 }: { symbol?: string; basePrice?: number }) {
  const [orderBook, setOrderBook] = useState(() => generateOrderBook(basePrice))

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook(basePrice + (Math.random() - 0.5) * 200))
    }, 1500)

    return () => clearInterval(interval)
  }, [basePrice])

  const maxTotal = Math.max(
    orderBook.bids[orderBook.bids.length - 1]?.total || 0,
    orderBook.asks[orderBook.asks.length - 1]?.total || 0,
  )

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-sm font-bold flex items-center justify-between">
          <span>ORDER BOOK</span>
          <span className="text-xs font-mono text-muted-foreground">{symbol}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-muted-foreground mb-2 px-1">
          <div className="text-left">PRICE</div>
          <div className="text-right">SIZE</div>
          <div className="text-right">TOTAL</div>
        </div>

        {/* ASKS */}
        <div className="space-y-0.5 mb-2">
          {orderBook.asks
            .slice(0, 8)
            .reverse()
            .map((ask, i) => (
              <div key={`ask-${i}`} className="relative grid grid-cols-3 gap-2 text-[10px] font-mono py-0.5 px-1">
                <div
                  className="absolute inset-y-0 right-0 bg-destructive/10"
                  style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                />
                <div className="relative text-destructive font-bold">{ask.price.toFixed(0)}</div>
                <div className="relative text-right">{ask.size.toFixed(3)}</div>
                <div className="relative text-right text-muted-foreground">{ask.total.toFixed(2)}</div>
              </div>
            ))}
        </div>

        {/* SPREAD */}
        <div className="flex items-center justify-center gap-2 py-1.5 bg-primary/10 border border-primary/30 rounded-lg mb-2">
          <span className="text-[10px] font-mono text-muted-foreground">SPREAD</span>
          <span className="text-xs font-mono font-bold text-primary">
            ${(orderBook.asks[0].price - orderBook.bids[0].price).toFixed(0)}
          </span>
        </div>

        {/* BIDS */}
        <div className="space-y-0.5">
          {orderBook.bids.slice(0, 8).map((bid, i) => (
            <div key={`bid-${i}`} className="relative grid grid-cols-3 gap-2 text-[10px] font-mono py-0.5 px-1">
              <div
                className="absolute inset-y-0 right-0 bg-chart-1/10"
                style={{ width: `${(bid.total / maxTotal) * 100}%` }}
              />
              <div className="relative text-chart-1 font-bold">{bid.price.toFixed(0)}</div>
              <div className="relative text-right">{bid.size.toFixed(3)}</div>
              <div className="relative text-right text-muted-foreground">{bid.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

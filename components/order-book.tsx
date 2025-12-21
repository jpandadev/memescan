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
    const bidSize = Math.random() * 1000 + 100
    const askSize = Math.random() * 1000 + 100
    totalBid += bidSize
    totalAsk += askSize

    bids.push({
      price: basePrice - i * 0.5 - Math.random() * 0.3,
      size: bidSize,
      total: totalBid,
    })

    asks.push({
      price: basePrice + i * 0.5 + Math.random() * 0.3,
      size: askSize,
      total: totalAsk,
    })
  }

  return { bids, asks }
}

export function OrderBook({ symbol = "TSLA", basePrice = 242.84 }: { symbol?: string; basePrice?: number }) {
  const [orderBook, setOrderBook] = useState(() => generateOrderBook(basePrice))

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook(basePrice + (Math.random() - 0.5) * 2))
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
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-primary">▣</span>
            ORDER BOOK
          </span>
          <span className="text-sm font-mono text-muted-foreground">{symbol}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-xs font-mono text-muted-foreground mb-2 px-1">
          <div className="text-left">PRICE</div>
          <div className="text-right">SIZE</div>
          <div className="text-right">TOTAL</div>
        </div>

        {/* ASKS (SELL ORDERS) */}
        <div className="space-y-0.5 mb-3">
          {orderBook.asks
            .slice(0, 10)
            .reverse()
            .map((ask, i) => (
              <div key={`ask-${i}`} className="relative grid grid-cols-3 gap-2 text-xs font-mono py-1 px-1">
                <div
                  className="absolute inset-y-0 right-0 bg-destructive/10"
                  style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                />
                <div className="relative text-destructive font-bold">{ask.price.toFixed(2)}</div>
                <div className="relative text-right">{ask.size.toFixed(0)}</div>
                <div className="relative text-right text-muted-foreground">{ask.total.toFixed(0)}</div>
              </div>
            ))}
        </div>

        {/* SPREAD */}
        <div className="flex items-center justify-center gap-2 py-2 bg-muted/50 rounded-lg mb-3">
          <span className="text-xs font-mono text-muted-foreground">SPREAD</span>
          <span className="text-sm font-mono font-bold text-primary">
            ${(orderBook.asks[0].price - orderBook.bids[0].price).toFixed(2)}
          </span>
        </div>

        {/* BIDS (BUY ORDERS) */}
        <div className="space-y-0.5">
          {orderBook.bids.slice(0, 10).map((bid, i) => (
            <div key={`bid-${i}`} className="relative grid grid-cols-3 gap-2 text-xs font-mono py-1 px-1">
              <div
                className="absolute inset-y-0 right-0 bg-chart-1/10"
                style={{ width: `${(bid.total / maxTotal) * 100}%` }}
              />
              <div className="relative text-chart-1 font-bold">{bid.price.toFixed(2)}</div>
              <div className="relative text-right">{bid.size.toFixed(0)}</div>
              <div className="relative text-right text-muted-foreground">{bid.total.toFixed(0)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

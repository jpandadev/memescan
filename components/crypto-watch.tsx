"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchMultipleCryptos } from "@/lib/api"

interface CryptoData {
  symbol: string
  name: string
  price: string
  change: string
  positive: boolean
}

export function CryptoWatch() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([
    { name: "Bitcoin", symbol: "BTC", price: "$43,782", change: "+5.2%", positive: true },
    { name: "Ethereum", symbol: "ETH", price: "$2,289", change: "+3.8%", positive: true },
    { name: "Solana", symbol: "SOL", price: "$108", change: "+12.4%", positive: true },
    { name: "Dogecoin", symbol: "DOGE", price: "$0.089", change: "-2.1%", positive: false },
  ])

  useEffect(() => {
    async function loadCryptos() {
      try {
        const data = await fetchMultipleCryptos()

        if (data) {
          setCryptos((prev) =>
            prev.map((crypto) => {
              if (crypto.symbol === "BTC" && data.BTC) {
                return {
                  ...crypto,
                  price: `$${data.BTC.price?.toLocaleString() || crypto.price}`,
                }
              }
              if (crypto.symbol === "ETH" && data.ETH) {
                return {
                  ...crypto,
                  price: `$${data.ETH.price?.toLocaleString() || crypto.price}`,
                }
              }
              return crypto
            }),
          )
        }
      } catch (error) {
        console.error("[v0] Crypto load error:", error)
      }
    }

    loadCryptos()
    const interval = setInterval(loadCryptos, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Bitcoin className="w-5 h-5 text-primary" />
          <span className="truncate">CRYPTO ZONE</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cryptos.map((crypto) => (
            <div
              key={crypto.symbol}
              className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer min-w-0"
            >
              <div className="min-w-0 flex-1">
                <div className="font-bold truncate">{crypto.symbol}</div>
                <div className="text-xs text-muted-foreground truncate">{crypto.name}</div>
              </div>

              <div className="text-right flex-shrink-0 ml-2">
                <div className="font-bold font-mono text-sm truncate">{crypto.price}</div>
                <div
                  className={`text-xs font-mono flex items-center justify-end gap-1 ${crypto.positive ? "text-chart-1" : "text-destructive"}`}
                >
                  {crypto.positive ? (
                    <TrendingUp className="w-3 h-3 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="w-3 h-3 flex-shrink-0" />
                  )}
                  <span className="truncate">{crypto.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

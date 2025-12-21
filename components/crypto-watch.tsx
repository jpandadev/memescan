"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { useTelegram } from "./telegram-provider"

interface TokenData {
  symbol: string
  name: string
  price: string
  change: string
  positive: boolean
  mcap: string
}

export function CryptoWatch() {
  const { hapticFeedback } = useTelegram()
  const [tokens, setTokens] = useState<TokenData[]>([
    { name: "Toncoin", symbol: "TON", price: "$2.45", change: "+12.5%", positive: true, mcap: "$8.4B" },
    { name: "Notcoin", symbol: "NOT", price: "$0.0089", change: "+45.2%", positive: true, mcap: "$890M" },
    { name: "Dogs", symbol: "DOGS", price: "$0.00042", change: "-3.2%", positive: false, mcap: "$420M" },
    { name: "Hamster", symbol: "HMSTR", price: "$0.0037", change: "+8.7%", positive: true, mcap: "$310M" },
  ])

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) =>
        prev.map((token) => {
          const changeVal = (Math.random() - 0.5) * 5
          const isPositive = changeVal >= 0
          return {
            ...token,
            change: `${isPositive ? "+" : ""}${changeVal.toFixed(1)}%`,
            positive: isPositive,
          }
        }),
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="truncate">TOP TON TOKENS</span>
          <Badge className="bg-primary/20 text-primary text-[10px]">LIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tokens.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
              onClick={() => hapticFeedback("light")}
            >
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm text-primary">{token.symbol}</div>
                <div className="text-[10px] text-muted-foreground truncate">{token.name}</div>
              </div>

              <div className="text-center px-2 flex-shrink-0">
                <div className="text-[10px] text-muted-foreground">MCap</div>
                <div className="text-xs font-mono">{token.mcap}</div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="font-bold font-mono text-sm">{token.price}</div>
                <div
                  className={`text-xs font-mono flex items-center justify-end gap-1 ${token.positive ? "text-chart-1" : "text-destructive"}`}
                >
                  {token.positive ? (
                    <TrendingUp className="w-3 h-3 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="w-3 h-3 flex-shrink-0" />
                  )}
                  <span>{token.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

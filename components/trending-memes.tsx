"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Flame } from "lucide-react"
import { useTelegram } from "./telegram-provider"

interface MemeToken {
  rank: number
  name: string
  symbol: string
  price: string
  change: number
  mcap: string
  safety: "safe" | "caution" | "danger"
  isHot?: boolean
}

const trendingMemes: MemeToken[] = [
  { rank: 1, name: "Toncoin", symbol: "TON", price: "$2.45", change: 12.5, mcap: "$8.4B", safety: "safe", isHot: true },
  {
    rank: 2,
    name: "Notcoin",
    symbol: "NOT",
    price: "$0.0089",
    change: 45.2,
    mcap: "$890M",
    safety: "safe",
    isHot: true,
  },
  { rank: 3, name: "Dogs", symbol: "DOGS", price: "$0.00042", change: -3.2, mcap: "$420M", safety: "caution" },
  { rank: 4, name: "Hamster", symbol: "HMSTR", price: "$0.0037", change: 8.7, mcap: "$310M", safety: "safe" },
  { rank: 5, name: "Catizen", symbol: "CATI", price: "$0.0046", change: -1.2, mcap: "$156M", safety: "caution" },
  {
    rank: 6,
    name: "PepeTON",
    symbol: "PTON",
    price: "$0.000012",
    change: 156.8,
    mcap: "$12M",
    safety: "danger",
    isHot: true,
  },
  { rank: 7, name: "WojakTON", symbol: "WJK", price: "$0.00008", change: 23.4, mcap: "$8M", safety: "caution" },
  { rank: 8, name: "MoonDoge", symbol: "MDOGE", price: "$0.00001", change: -15.6, mcap: "$2.1M", safety: "danger" },
]

export function TrendingMemes() {
  const { hapticFeedback } = useTelegram()

  const getSafetyBadge = (safety: MemeToken["safety"]) => {
    switch (safety) {
      case "safe":
        return (
          <Badge variant="outline" className="text-[9px] border-chart-1 text-chart-1 px-1">
            <Shield className="w-2.5 h-2.5 mr-0.5" />
            SAFE
          </Badge>
        )
      case "caution":
        return (
          <Badge variant="outline" className="text-[9px] border-chart-5 text-chart-5 px-1">
            <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
            DYOR
          </Badge>
        )
      case "danger":
        return (
          <Badge variant="outline" className="text-[9px] border-destructive text-destructive px-1">
            <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
            RISK
          </Badge>
        )
    }
  }

  return (
    <Card className="border-2 border-primary/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <Flame className="w-5 h-5 text-chart-3" />
          <span>TRENDING ON TON</span>
          <Badge className="bg-primary text-primary-foreground text-[10px]">LIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {trendingMemes.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center gap-2 sm:gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => hapticFeedback("light")}
            >
              <div className="text-xs font-mono text-muted-foreground w-5 flex-shrink-0">{token.rank}.</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm truncate">{token.symbol}</span>
                  {token.isHot && <Flame className="w-3 h-3 text-chart-3 flex-shrink-0" />}
                </div>
                <div className="text-[10px] text-muted-foreground truncate">{token.name}</div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="font-mono text-sm font-bold">{token.price}</div>
                <div className="text-[10px] text-muted-foreground">{token.mcap}</div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div
                  className={`flex items-center gap-0.5 text-xs font-mono font-bold ${
                    token.change >= 0 ? "text-chart-1" : "text-destructive"
                  }`}
                >
                  {token.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {token.change >= 0 ? "+" : ""}
                  {token.change.toFixed(1)}%
                </div>
                {getSafetyBadge(token.safety)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

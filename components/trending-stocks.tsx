"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Flame, Rocket } from "lucide-react"

const hotStocks = [
  { symbol: "TSLA", name: "Tesla Inc", price: "$242.84", change: "+12.4%", volume: "156M", badge: "ROCKET" },
  { symbol: "NVDA", name: "NVIDIA Corp", price: "$495.22", change: "+8.7%", volume: "89M", badge: "HOT" },
  { symbol: "GME", name: "GameStop", price: "$23.67", change: "+45.2%", volume: "234M", badge: "ROCKET" },
  { symbol: "AMC", name: "AMC Entertainment", price: "$6.89", change: "+28.9%", volume: "178M", badge: "FIRE" },
  { symbol: "PLTR", name: "Palantir Tech", price: "$18.45", change: "+15.3%", volume: "67M", badge: "HOT" },
  { symbol: "COIN", name: "Coinbase", price: "$156.78", change: "+9.8%", volume: "23M", badge: "ROCKET" },
]

export function TrendingStocks() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" fill="currentColor" />
          TRENDING PLAYS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {hotStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-lg hover:border-primary hover:bg-muted transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  {stock.badge === "ROCKET" && <Rocket className="w-4 h-4 text-primary" />}
                  {stock.badge === "HOT" && <Flame className="w-4 h-4 text-primary" fill="currentColor" />}
                  {stock.badge === "FIRE" && <TrendingUp className="w-4 h-4 text-primary" />}

                  <div>
                    <div className="font-bold text-base">{stock.symbol}</div>
                    <div className="text-xs text-muted-foreground">{stock.name}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-mono text-muted-foreground">VOL</div>
                  <div className="text-sm font-bold">{stock.volume}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg">{stock.price}</div>
                  <div className="text-sm font-mono text-chart-1 font-bold">{stock.change}</div>
                </div>

                <Badge className="bg-primary text-primary-foreground font-bold">BUY</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

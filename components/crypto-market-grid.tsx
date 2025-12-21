"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Flame } from "lucide-react"

const cryptoMarkets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "$43,782",
    change: "+5.2%",
    volume: "$28.4B",
    badge: "KING",
    icon: "bitcoin",
  },
  { symbol: "ETH", name: "Ethereum", price: "$2,289", change: "+3.8%", volume: "$12.1B", badge: "HOT", icon: "eth" },
  { symbol: "SOL", name: "Solana", price: "$108", change: "+12.4%", volume: "$4.2B", badge: "ROCKET", icon: "sol" },
  { symbol: "DOGE", name: "Dogecoin", price: "$0.089", change: "+28.9%", volume: "$2.8B", badge: "MEME", icon: "doge" },
  { symbol: "AVAX", name: "Avalanche", price: "$39.45", change: "+8.7%", volume: "$892M", badge: "HOT", icon: "avax" },
  { symbol: "MATIC", name: "Polygon", price: "$0.845", change: "-2.1%", volume: "$456M", badge: "", icon: "matic" },
  { symbol: "LINK", name: "Chainlink", price: "$15.23", change: "+6.4%", volume: "$678M", badge: "HOT", icon: "link" },
  { symbol: "UNI", name: "Uniswap", price: "$7.89", change: "+4.2%", volume: "$234M", badge: "", icon: "uni" },
]

export function CryptoMarketGrid() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" fill="currentColor" />
          CRYPTO MARKETS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cryptoMarkets.map((crypto) => {
            const isPositive = !crypto.change.startsWith("-")
            return (
              <div
                key={crypto.symbol}
                className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg hover:border-primary hover:bg-muted transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {crypto.symbol[0]}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{crypto.symbol}</span>
                      {crypto.badge && (
                        <Badge
                          variant="secondary"
                          className="h-5 px-1.5 text-[9px] font-bold bg-primary text-primary-foreground"
                        >
                          {crypto.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{crypto.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold">{crypto.price}</div>
                  <div
                    className={`text-xs font-mono flex items-center justify-end gap-1 ${isPositive ? "text-chart-1" : "text-destructive"}`}
                  >
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {crypto.change}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

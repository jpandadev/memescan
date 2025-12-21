import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, TrendingUp, TrendingDown } from "lucide-react"

const movers = [
  { symbol: "GME", price: "$23.67", change: "+45.2%", volume: "234M", direction: "up" },
  { symbol: "AMC", price: "$6.89", change: "+28.9%", volume: "178M", direction: "up" },
  { symbol: "TSLA", price: "$242.84", change: "+12.4%", volume: "156M", direction: "up" },
  { symbol: "PLTR", price: "$18.45", change: "+15.3%", volume: "67M", direction: "up" },
]

export function MarketMovers() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          TOP MOVERS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {movers.map((mover) => (
            <div
              key={mover.symbol}
              className="flex items-center justify-between p-3 bg-chart-1/10 border border-chart-1/30 rounded-lg hover:border-chart-1 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {mover.direction === "up" ? (
                  <TrendingUp className="w-4 h-4 text-chart-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
                <div>
                  <div className="font-bold text-sm">{mover.symbol}</div>
                  <div className="text-xs text-muted-foreground font-mono">{mover.volume}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-sm">{mover.price}</div>
                <div className="text-xs font-mono text-chart-1 font-bold">{mover.change}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

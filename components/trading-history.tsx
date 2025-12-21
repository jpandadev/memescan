import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const trades = [
  {
    symbol: "TSLA",
    type: "BUY",
    shares: 50,
    price: "$242.84",
    total: "$12,142",
    time: "2 hours ago",
    status: "FILLED",
  },
  {
    symbol: "NVDA",
    type: "SELL",
    shares: 25,
    price: "$495.22",
    total: "$12,381",
    time: "5 hours ago",
    status: "FILLED",
  },
  {
    symbol: "BTC",
    type: "BUY",
    shares: 0.5,
    price: "$43,782",
    total: "$21,891",
    time: "1 day ago",
    status: "FILLED",
  },
  {
    symbol: "ETH",
    type: "BUY",
    shares: 10,
    price: "$2,289",
    total: "$22,890",
    time: "1 day ago",
    status: "FILLED",
  },
  {
    symbol: "AAPL",
    type: "BUY",
    shares: 100,
    price: "$191.24",
    total: "$19,124",
    time: "2 days ago",
    status: "FILLED",
  },
]

export function TradingHistory() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          TRADING HISTORY
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {trades.map((trade, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-4">
                <Badge className={trade.type === "BUY" ? "bg-chart-1 text-black" : "bg-destructive"}>
                  {trade.type}
                </Badge>

                <div>
                  <div className="font-bold">{trade.symbol}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {trade.shares} @ {trade.price}
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-mono">TOTAL</div>
                  <div className="font-bold font-mono">{trade.total}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{trade.time}</div>
                  <Badge variant="outline" className="text-xs font-mono">
                    {trade.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

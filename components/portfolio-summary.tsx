import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp } from "lucide-react"

const positions = [
  { symbol: "AAPL", shares: 150, value: "$28,650", return: "+$3,240", percent: "+12.7%" },
  { symbol: "MSFT", shares: 85, value: "$32,130", return: "+$5,891", percent: "+22.4%" },
  { symbol: "TSLA", shares: 200, value: "$48,568", return: "+$12,450", percent: "+34.5%" },
  { symbol: "GOOGL", shares: 120, value: "$16,740", return: "+$1,980", percent: "+13.4%" },
]

export function PortfolioSummary() {
  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          YOUR POSITIONS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {positions.map((position) => (
            <div
              key={position.symbol}
              className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg"
            >
              <div>
                <div className="font-bold text-lg">{position.symbol}</div>
                <div className="text-xs text-muted-foreground">{position.shares} shares</div>
              </div>

              <div className="text-right">
                <div className="font-bold">{position.value}</div>
                <div className="text-xs text-chart-1 font-mono flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {position.percent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

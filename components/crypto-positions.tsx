import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const positions = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    type: "LONG",
    entry: "$41,234",
    current: "$43,782",
    size: "2.5 BTC",
    value: "$109,455",
    pnl: "+$6,370",
    pnlPercent: "+6.18%",
    leverage: "5x",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    type: "LONG",
    entry: "$2,156",
    current: "$2,289",
    size: "45 ETH",
    value: "$103,005",
    pnl: "+$5,985",
    pnlPercent: "+6.17%",
    leverage: "3x",
  },
  {
    symbol: "SOL",
    name: "Solana",
    type: "LONG",
    entry: "$96.20",
    current: "$108.00",
    size: "450 SOL",
    value: "$48,600",
    pnl: "+$5,310",
    pnlPercent: "+12.26%",
    leverage: "10x",
  },
]

export function CryptoPositions() {
  return (
    <Card className="border-2 border-chart-1">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-chart-1" />
            ACTIVE POSITIONS
          </span>
          <div className="text-right">
            <div className="text-xs font-mono text-muted-foreground">TOTAL UNREALIZED P&L</div>
            <div className="text-2xl font-bold text-chart-1">+$17,665 (+8.20%)</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {positions.map((position) => (
            <div
              key={position.symbol}
              className="flex items-center justify-between p-4 bg-chart-1/5 border-2 border-chart-1/30 rounded-lg hover:border-chart-1 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-chart-1/20 flex items-center justify-center font-bold text-chart-1 text-lg">
                  {position.symbol[0]}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">{position.symbol}</span>
                    <Badge className="bg-chart-1 text-black font-bold h-5">{position.type}</Badge>
                    <Badge variant="outline" className="font-mono text-xs">
                      {position.leverage}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{position.name}</div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-mono">ENTRY</div>
                  <div className="font-mono text-sm">{position.entry}</div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-mono">CURRENT</div>
                  <div className="font-mono text-sm font-bold">{position.current}</div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-mono">SIZE</div>
                  <div className="font-mono text-sm">{position.size}</div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-mono">VALUE</div>
                  <div className="font-mono text-sm font-bold">{position.value}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-chart-1 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {position.pnl}
                </div>
                <div className="text-sm font-mono text-chart-1 font-bold">{position.pnlPercent}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

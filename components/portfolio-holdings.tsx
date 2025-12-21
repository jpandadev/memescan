import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const holdings = [
  {
    symbol: "TSLA",
    name: "Tesla Inc",
    shares: 200,
    avgCost: "$230.42",
    currentPrice: "$242.84",
    value: "$48,568",
    gain: "+$2,484",
    gainPercent: "+5.39%",
    positive: true,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    shares: 125,
    avgCost: "$456.50",
    currentPrice: "$495.22",
    value: "$61,903",
    gain: "+$4,840",
    gainPercent: "+8.48%",
    positive: true,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc",
    shares: 150,
    avgCost: "$181.22",
    currentPrice: "$191.24",
    value: "$28,686",
    gain: "+$1,503",
    gainPercent: "+5.53%",
    positive: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    shares: 85,
    avgCost: "$365.80",
    currentPrice: "$378.91",
    value: "$32,208",
    gain: "+$1,114",
    gainPercent: "+3.58%",
    positive: true,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    shares: 2.5,
    avgCost: "$41,234",
    currentPrice: "$43,782",
    value: "$109,455",
    gain: "+$6,370",
    gainPercent: "+6.18%",
    positive: true,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    shares: 45,
    avgCost: "$2,156",
    currentPrice: "$2,289",
    value: "$103,005",
    gain: "+$5,985",
    gainPercent: "+6.17%",
    positive: true,
  },
]

export function PortfolioHoldings() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">HOLDINGS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {holdings.map((holding) => (
            <div
              key={holding.symbol}
              className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {holding.symbol[0]}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{holding.symbol}</span>
                    <span className="text-xs text-muted-foreground">{holding.name}</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    {holding.shares} @ {holding.avgCost}
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-mono">CURRENT</div>
                  <div className="font-mono font-bold">{holding.currentPrice}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-mono">VALUE</div>
                  <div className="font-bold">{holding.value}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-chart-1 flex items-center gap-1 justify-end">
                  <TrendingUp className="w-4 h-4" />
                  {holding.gain}
                </div>
                <div className="text-sm font-mono text-chart-1">{holding.gainPercent}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

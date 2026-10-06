"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Area, ComposedChart } from "recharts"
import { useEffect, useState } from "react"
import { TrendingUp, Rocket, Bitcoin } from "lucide-react"

interface ChartData {
  time: string
  price: number
  volume: number
}

function generateChartData(basePrice: number, points: number): ChartData[] {
  const data: ChartData[] = []
  let price = basePrice
  const now = Date.now()

  for (let i = points; i >= 0; i--) {
    price += (Math.random() - 0.45) * 500
    data.push({
      time: new Date(now - i * 60000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      price: Math.max(price, basePrice - 2000),
      volume: Math.random() * 500 + 200,
    })
  }

  return data
}

export function CryptoTradingChart({ symbol = "BTC/USD", basePrice = 43782 }: { symbol?: string; basePrice?: number }) {
  const [chartData, setChartData] = useState<ChartData[]>(() => generateChartData(basePrice, 50))
  const [timeframe, setTimeframe] = useState("1H")
  const [chartType, setChartType] = useState<"area" | "candle">("area")

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev.slice(1)]
        const lastPrice = prev[prev.length - 1].price
        const newPrice = lastPrice + (Math.random() - 0.45) * 500

        newData.push({
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          price: newPrice,
          volume: Math.random() * 500 + 200,
        })

        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const currentPrice = chartData[chartData.length - 1]?.price || basePrice
  const priceChange = currentPrice - basePrice
  const percentChange = (priceChange / basePrice) * 100

  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bitcoin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">{symbol}</h2>
              <span className="px-1.5 py-0.5 rounded bg-chart-5/20 text-chart-5 text-[10px] font-mono font-bold">
                SIMULATED
              </span>
              {percentChange > 5 && <Rocket className="w-5 h-5 text-primary animate-bounce" />}
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">${currentPrice.toFixed(2)}</span>
              <span
                className={`text-xl font-mono font-bold flex items-center gap-1 ${priceChange >= 0 ? "text-chart-1" : "text-destructive"}`}
              >
                <TrendingUp className={`w-5 h-5 ${priceChange < 0 ? "rotate-180" : ""}`} />
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(2)} ({percentChange >= 0 ? "+" : ""}
                {percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "ghost"}
                  size="sm"
                  className="h-7 px-2 text-xs font-mono"
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Price Chart */}
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <defs>
                  <linearGradient id="cryptoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={priceChange >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor={priceChange >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  domain={["dataMin - 500", "dataMax + 500"]}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "2px solid hsl(var(--primary))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={priceChange >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                  strokeWidth={3}
                  fill="url(#cryptoGradient)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t-2 border-border">
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1">24H HIGH</div>
              <div className="text-sm font-bold text-chart-1">${(currentPrice + 1500).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1">24H LOW</div>
              <div className="text-sm font-bold text-destructive">${(currentPrice - 2100).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1">24H VOLUME</div>
              <div className="text-sm font-bold">$28.4B</div>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1">MARKET CAP</div>
              <div className="text-sm font-bold">$857.2B</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

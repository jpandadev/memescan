"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts"
import { useEffect, useState, useMemo, useCallback, memo, useRef } from "react"
import { TrendingUp } from "lucide-react"

interface ChartData {
  time: string
  price: number
  volume: number
}

// Move outside component to avoid recreation
function generateChartData(basePrice: number, points: number): ChartData[] {
  const data: ChartData[] = []
  let price = basePrice
  const now = Date.now()

  for (let i = points; i >= 0; i--) {
    price += (Math.random() - 0.48) * 5
    data.push({
      time: new Date(now - i * 60000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      price: Math.max(price, basePrice - 50),
      volume: Math.random() * 100000 + 50000,
    })
  }

  return data
}

// Memoized timeframe button
const TimeframeButton = memo(function TimeframeButton({
  tf,
  active,
  onClick
}: {
  tf: string
  active: boolean
  onClick: () => void
}) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      size="sm"
      className="h-7 px-2 text-xs font-mono"
      onClick={onClick}
      aria-pressed={active}
    >
      {tf}
    </Button>
  )
})

function TradingChartComponent({ symbol = "TSLA", basePrice = 242.84 }: { symbol?: string; basePrice?: number }) {
  const [chartData, setChartData] = useState<ChartData[]>(() => generateChartData(basePrice, 50))
  const [timeframe, setTimeframe] = useState("1H")

  // Use ref for circular buffer to avoid array recreation
  const dataRef = useRef(chartData)
  dataRef.current = chartData

  useEffect(() => {
    // Increased interval from 2s to 5s for better performance
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev.slice(1)]
        const lastPrice = prev[prev.length - 1].price
        const newPrice = lastPrice + (Math.random() - 0.48) * 5

        newData.push({
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          price: newPrice,
          volume: Math.random() * 100000 + 50000,
        })

        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentPrice = chartData[chartData.length - 1]?.price || basePrice
  const priceChange = currentPrice - basePrice
  const percentChange = (priceChange / basePrice) * 100

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold mb-1">{symbol}</CardTitle>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">${currentPrice.toFixed(2)}</span>
              <span
                className={`text-lg font-mono font-bold flex items-center gap-1 ${priceChange >= 0 ? "text-chart-1" : "text-destructive"}`}
              >
                <TrendingUp className={`w-4 h-4 ${priceChange < 0 ? "rotate-180" : ""}`} />
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(2)} ({percentChange >= 0 ? "+" : ""}
                {percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>

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
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Price Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={priceChange >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                      stopOpacity={0.3}
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
                  domain={["dataMin - 5", "dataMax + 5"]}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={priceChange >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Volume Chart */}
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Export both named and memoized versions
export const TradingChart = memo(TradingChartComponent)
export { TradingChartComponent }

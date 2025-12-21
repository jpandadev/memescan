"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts"
import { useEffect, useState } from "react"

const mockData = Array.from({ length: 50 }, (_, i) => ({
  value: 4200 + Math.sin(i / 5) * 200 + Math.random() * 100,
}))

const indices = [
  { name: "S&P 500", symbol: "SPX", price: "4,783.45", change: "+1.24%", value: 1.24, data: mockData },
  { name: "NASDAQ", symbol: "IXIC", price: "15,521.89", change: "+2.18%", value: 2.18, data: mockData },
  { name: "DOW JONES", symbol: "DJI", price: "37,440.34", change: "-0.52%", value: -0.52, data: mockData },
  { name: "RUSSELL 2000", symbol: "RUT", price: "2,066.22", change: "+0.89%", value: 0.89, data: mockData },
]

export function MarketOverview() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <span className="text-primary">◆</span>
          MARKET OVERVIEW
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indices.map((index) => (
            <div
              key={index.symbol}
              className="bg-muted/50 border border-border rounded-lg p-4 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-muted-foreground truncate">{index.symbol}</div>
                  <div className="text-sm font-semibold truncate">{index.name}</div>
                </div>
                {index.value > 0 ? (
                  <TrendingUp className="w-5 h-5 text-chart-1 flex-shrink-0" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-destructive flex-shrink-0" />
                )}
              </div>

              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold truncate">{index.price}</div>
                  <div
                    className={`text-sm font-mono truncate ${index.value > 0 ? "text-chart-1" : "text-destructive"}`}
                  >
                    {index.change}
                  </div>
                </div>

                <ResponsiveContainer width={80} height={40} className="flex-shrink-0">
                  <LineChart data={index.data}>
                    <YAxis domain={["dataMin", "dataMax"]} hide />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={index.value > 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts"
import { useState } from "react"
import { TrendingUp } from "lucide-react"

const generatePerformanceData = (days: number, startValue: number) => {
  const data = []
  let value = startValue
  const now = Date.now()

  for (let i = days; i >= 0; i--) {
    value += (Math.random() - 0.3) * 20000
    data.push({
      date: new Date(now - i * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.max(value, startValue - 100000),
    })
  }

  return data
}

export function PortfolioPerformanceChart() {
  const [timeframe, setTimeframe] = useState("1M")
  const [data] = useState(() => generatePerformanceData(30, 2719901))

  const currentValue = data[data.length - 1]?.value || 2847392
  const startValue = data[0]?.value || 2719901
  const change = currentValue - startValue
  const percentChange = (change / startValue) * 100

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold mb-2">PORTFOLIO PERFORMANCE</CardTitle>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">${currentValue.toLocaleString()}</span>
              <span className="text-xl font-mono font-bold text-chart-1 flex items-center gap-1">
                <TrendingUp className="w-5 h-5" />
                +${change.toLocaleString()} (+{percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            {["1W", "1M", "3M", "6M", "1Y", "ALL"].map((tf) => (
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
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                domain={["dataMin - 50000", "dataMax + 50000"]}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                fill="url(#portfolioGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

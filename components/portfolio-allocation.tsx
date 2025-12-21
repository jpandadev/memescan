"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const allocationData = [
  { name: "Tech Stocks", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Crypto", value: 25, color: "hsl(var(--primary))" },
  { name: "Index Funds", value: 15, color: "hsl(var(--chart-2))" },
  { name: "Growth", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Cash", value: 5, color: "hsl(var(--muted))" },
]

export function PortfolioAllocation() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">ALLOCATION</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2 mt-4">
          {allocationData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-mono">{item.name}</span>
              </div>
              <span className="font-bold">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

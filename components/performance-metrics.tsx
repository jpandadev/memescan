import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"

const metrics = [
  { label: "TOTAL RETURN", value: "+18.4%", subtext: "ALL TIME" },
  { label: "ANNUALIZED", value: "+45.2%", subtext: "YEARLY" },
  { label: "ALPHA", value: "2.8", subtext: "VS SPY" },
  { label: "BETA", value: "1.15", subtext: "VOLATILITY" },
  { label: "MAX DRAWDOWN", value: "-12.3%", subtext: "WORST DROP" },
  { label: "PROFIT FACTOR", value: "2.45", subtext: "WIN/LOSS" },
]

export function PerformanceMetrics() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          METRICS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="text-xs font-mono text-muted-foreground">{metric.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{metric.subtext}</div>
              </div>
              <div className="text-xl font-bold">{metric.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

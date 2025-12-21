"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, TrendingUp } from "lucide-react"

const sentimentData = [
  { ticker: "TSLA", bullish: 85, bearish: 15, mentions: "12.4K", trend: "up" },
  { ticker: "GME", bullish: 92, bearish: 8, mentions: "8.7K", trend: "up" },
  { ticker: "NVDA", bullish: 78, bearish: 22, mentions: "6.2K", trend: "up" },
  { ticker: "AMC", bullish: 88, bearish: 12, mentions: "5.9K", trend: "up" },
  { ticker: "AAPL", bullish: 65, bearish: 35, mentions: "4.1K", trend: "neutral" },
]

export function SocialSentiment() {
  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          SOCIAL SENTIMENT
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sentimentData.map((item) => (
            <div key={item.ticker} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{item.ticker}</span>
                  {item.trend === "up" && <TrendingUp className="w-4 h-4 text-chart-1" />}
                </div>
                <span className="text-xs font-mono text-muted-foreground">{item.mentions} mentions</span>
              </div>

              <div className="space-y-1">
                <Progress value={item.bullish} className="h-2 bg-destructive/20">
                  <div
                    className="h-full bg-chart-1 rounded-full transition-all"
                    style={{ width: `${item.bullish}%` }}
                  />
                </Progress>

                <div className="flex justify-between text-xs font-mono">
                  <span className="text-chart-1 font-bold">{item.bullish}% BULLISH</span>
                  <span className="text-destructive font-bold">{item.bearish}% BEARISH</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

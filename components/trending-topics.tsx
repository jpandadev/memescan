import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, TrendingUp } from "lucide-react"

const topics = [
  { tag: "#DiamondHands", mentions: "45.2K", change: "+234%" },
  { tag: "#ToTheMoon", mentions: "38.7K", change: "+189%" },
  { tag: "#HODL", mentions: "32.1K", change: "+156%" },
  { tag: "#BuyTheDip", mentions: "28.4K", change: "+142%" },
  { tag: "#YOLO", mentions: "24.8K", change: "+128%" },
  { tag: "#Stonks", mentions: "21.3K", change: "+115%" },
]

export function TrendingTopics() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" fill="currentColor" />
          TRENDING
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topics.map((topic, i) => (
            <div
              key={topic.tag}
              className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary">{i + 1}.</span>
                <span className="font-bold text-sm">{topic.tag}</span>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-bold">{topic.mentions}</div>
                <div className="text-xs font-mono text-chart-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {topic.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

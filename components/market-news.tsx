import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, TrendingUp } from "lucide-react"

const news = [
  {
    title: "Tech Stocks Surge as AI Investments Skyrocket",
    time: "5 min ago",
    source: "Bloomberg",
    sentiment: "bullish",
  },
  {
    title: "Federal Reserve Signals Rate Cuts in 2024",
    time: "23 min ago",
    source: "Reuters",
    sentiment: "bullish",
  },
  {
    title: "Meme Stock Mania Returns: GME Up 45% in Morning Trading",
    time: "1 hour ago",
    source: "WSJ",
    sentiment: "bullish",
  },
  {
    title: "Crypto Markets Rally as Bitcoin Tests $44K",
    time: "2 hours ago",
    source: "CoinDesk",
    sentiment: "bullish",
  },
]

export function MarketNews() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary" />
          MARKET PULSE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-muted/50 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-chart-1/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-chart-1" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold">{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

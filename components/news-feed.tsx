import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, TrendingUp, TrendingDown, Flame } from "lucide-react"

const newsItems = [
  {
    title: "Tesla Surges 12% After Announcing Record Q4 Deliveries",
    source: "Bloomberg",
    time: "5 min ago",
    sentiment: "bullish",
    impact: "high",
    category: "EARNINGS",
    excerpt:
      "Tesla reported record-breaking deliveries in Q4, exceeding analyst expectations by 15%. Stock rockets in pre-market trading.",
  },
  {
    title: "Federal Reserve Signals Potential Rate Cuts in 2024",
    source: "Reuters",
    time: "23 min ago",
    sentiment: "bullish",
    impact: "high",
    category: "MACRO",
    excerpt:
      "Fed Chairman hints at multiple rate cuts throughout 2024, citing cooling inflation and strong employment data.",
  },
  {
    title: "GameStop Mania Returns: Retail Traders Push GME Up 45%",
    source: "WSJ",
    time: "1 hour ago",
    sentiment: "bullish",
    impact: "medium",
    category: "MEME",
    excerpt:
      "r/WallStreetBets community rallies around GameStop again, driving massive volume and volatility in morning session.",
  },
  {
    title: "Bitcoin Tests $44K as Crypto Markets Rally Across the Board",
    source: "CoinDesk",
    time: "2 hours ago",
    sentiment: "bullish",
    impact: "medium",
    category: "CRYPTO",
    excerpt:
      "Major cryptocurrencies surge as Bitcoin breaks key resistance levels, with altcoins following suit in strong rally.",
  },
  {
    title: "NVIDIA Announces Next-Gen AI Chips, Stock Jumps 8%",
    source: "TechCrunch",
    time: "3 hours ago",
    sentiment: "bullish",
    impact: "high",
    category: "TECH",
    excerpt:
      "New AI chip architecture promises 10x performance improvement, solidifying NVIDIA's dominance in AI computing space.",
  },
  {
    title: "Oil Prices Surge on Middle East Supply Concerns",
    source: "Bloomberg",
    time: "4 hours ago",
    sentiment: "neutral",
    impact: "medium",
    category: "COMMODITIES",
    excerpt:
      "Crude oil jumps 5% amid geopolitical tensions, raising concerns about inflation and energy sector valuations.",
  },
  {
    title: "JPMorgan Reports Blockbuster Earnings, Beats Estimates",
    source: "CNBC",
    time: "5 hours ago",
    sentiment: "bullish",
    impact: "high",
    category: "FINANCIALS",
    excerpt: "Banking giant crushes earnings expectations with record trading revenue and strong loan growth in Q4.",
  },
  {
    title: "Meme Stock AMC Entertainment Rallies 28% on Social Media Hype",
    source: "MarketWatch",
    time: "6 hours ago",
    sentiment: "bullish",
    impact: "low",
    category: "MEME",
    excerpt: "AMC stock explodes higher as retail traders coordinate buying campaign across social media platforms.",
  },
]

export function NewsFeed() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary" />
          BREAKING NEWS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item, i) => {
            const sentimentColor =
              item.sentiment === "bullish"
                ? "text-chart-1"
                : item.sentiment === "bearish"
                  ? "text-destructive"
                  : "text-muted-foreground"
            const SentimentIcon =
              item.sentiment === "bullish" ? TrendingUp : item.sentiment === "bearish" ? TrendingDown : Flame

            return (
              <div
                key={i}
                className="p-4 bg-muted/50 border-2 border-border rounded-lg hover:border-primary transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-chart-1/20 flex items-center justify-center flex-shrink-0`}
                  >
                    <SentimentIcon className={`w-5 h-5 ${sentimentColor}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.excerpt}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-primary text-primary-foreground font-bold text-xs">{item.category}</Badge>
                      {item.impact === "high" && (
                        <Badge variant="destructive" className="font-bold text-xs">
                          HIGH IMPACT
                        </Badge>
                      )}
                      <span className="text-xs font-semibold">{item.source}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

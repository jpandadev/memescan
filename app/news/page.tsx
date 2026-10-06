import { TerminalHeader } from "@/components/terminal-header"
import { LiveTicker } from "@/components/live-ticker"
import { NewsFeed } from "@/components/news-feed"
import { SocialSentiment } from "@/components/social-sentiment"
import { TrendingTopics } from "@/components/trending-topics"
import { MarketMovers } from "@/components/market-movers"
import { EarningsCalendar } from "@/components/earnings-calendar"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />
      <LiveTicker />

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-primary">◉</span>
              MARKET INTELLIGENCE
            </h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">SAMPLE HEADLINES • SOCIAL BUZZ • MARKET PULSE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <NewsFeed />
          </div>

          <div className="space-y-6">
            <SocialSentiment />
            <TrendingTopics />
            <MarketMovers />
          </div>
        </div>

        <EarningsCalendar />
      </main>
    </div>
  )
}

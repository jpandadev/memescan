import { MarketOverview } from "@/components/market-overview"
import { PortfolioSummary } from "@/components/portfolio-summary"
import { TrendingStocks } from "@/components/trending-stocks"
import { CryptoWatch } from "@/components/crypto-watch"
import { MarketNews } from "@/components/market-news"
import { TerminalHeader } from "@/components/terminal-header"
import { LiveTicker } from "@/components/live-ticker"
import { TradingChart } from "@/components/trading-chart"
import { OrderBook } from "@/components/order-book"
import { NationStateAdvantages } from "@/components/nation-state-advantages"
import { TraderCards } from "@/components/trader-cards"
import { HeroBanner } from "@/components/hero-banner"

export default function TerminalPage() {
  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />
      <LiveTicker />

      <main className="container mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <HeroBanner />

        {/* Hero Stats - improved responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-card border-2 border-primary rounded-lg p-3 sm:p-4 md:p-6">
            <div className="text-[10px] sm:text-xs font-mono text-muted-foreground mb-1">PORTFOLIO VALUE</div>
            <div className="text-xl sm:text-2xl md:text-4xl font-bold text-primary mb-1 sm:mb-2 truncate">
              $2,847,392
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs flex-wrap">
              <span className="text-chart-1 font-bold">+$127,491</span>
              <span className="text-chart-1 font-mono">(+4.68%)</span>
              <span className="text-muted-foreground">TODAY</span>
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-lg p-3 sm:p-4 md:p-6">
            <div className="text-[10px] sm:text-xs font-mono text-muted-foreground mb-1">BUYING POWER</div>
            <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 truncate">$456,891</div>
            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs">
              <span className="text-muted-foreground font-mono">READY TO DEPLOY</span>
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-lg p-3 sm:p-4 md:p-6">
            <div className="text-[10px] sm:text-xs font-mono text-muted-foreground mb-1">24H VOLUME</div>
            <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 truncate">$12.4M</div>
            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs flex-wrap">
              <span className="text-chart-2 font-bold">+892K</span>
              <span className="text-chart-2 font-mono">(+7.74%)</span>
            </div>
          </div>
        </div>

        <TraderCards />

        {/* Nation State Advantages */}
        <NationStateAdvantages />

        {/* Chart and Order Book - improved responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <TradingChart symbol="BTC" basePrice={98420.5} />
          </div>
          <div>
            <OrderBook symbol="BTC" basePrice={98420.5} />
          </div>
        </div>

        {/* Main Grid - improved responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <MarketOverview />
            <TrendingStocks />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <PortfolioSummary />
            <CryptoWatch />
          </div>
        </div>

        {/* News Section */}
        <MarketNews />
      </main>
    </div>
  )
}

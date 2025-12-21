import { TerminalHeader } from "@/components/terminal-header"
import { LiveTicker } from "@/components/live-ticker"
import { PortfolioPerformanceChart } from "@/components/portfolio-performance-chart"
import { PortfolioAllocation } from "@/components/portfolio-allocation"
import { PortfolioHoldings } from "@/components/portfolio-holdings"
import { PortfolioStats } from "@/components/portfolio-stats"
import { TradingHistory } from "@/components/trading-history"
import { PerformanceMetrics } from "@/components/performance-metrics"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />
      <LiveTicker />

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-primary">◈</span>
              PORTFOLIO COMMAND CENTER
            </h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              TRACK GAINS • ANALYZE PERFORMANCE • STACK PAPER
            </p>
          </div>
        </div>

        {/* Portfolio Stats */}
        <PortfolioStats />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PortfolioPerformanceChart />
            <PortfolioHoldings />
          </div>

          <div className="space-y-6">
            <PortfolioAllocation />
            <PerformanceMetrics />
          </div>
        </div>

        {/* Trading History */}
        <TradingHistory />
      </main>
    </div>
  )
}

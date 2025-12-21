import { TerminalHeader } from "@/components/terminal-header"
import { LiveTicker } from "@/components/live-ticker"
import { CryptoTradingChart } from "@/components/crypto-trading-chart"
import { CryptoOrderBook } from "@/components/crypto-order-book"
import { CryptoMarketGrid } from "@/components/crypto-market-grid"
import { TradePanel } from "@/components/trade-panel"
import { CryptoPositions } from "@/components/crypto-positions"

export default function CryptoPage() {
  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />
      <LiveTicker />

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-primary">⬡</span>
              CRYPTO ZONE
            </h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">TO THE MOON • DIAMOND HANDS • HODL GANG</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-chart-1/20 border border-chart-1 rounded-lg">
              <div className="text-xs font-mono text-muted-foreground">TOTAL MARKET CAP</div>
              <div className="text-xl font-bold text-chart-1">$2.84T</div>
            </div>
          </div>
        </div>

        {/* Main Trading View */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <CryptoTradingChart symbol="BTC/USD" basePrice={43782} />
            <CryptoMarketGrid />
          </div>

          <div className="space-y-6">
            <TradePanel />
            <CryptoOrderBook symbol="BTC/USD" basePrice={43782} />
          </div>
        </div>

        {/* Positions */}
        <CryptoPositions />
      </main>
    </div>
  )
}

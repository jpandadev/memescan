import { TerminalHeader } from "@/components/terminal-header"
import { LiveTicker } from "@/components/live-ticker"
import { HeroBanner } from "@/components/hero-banner"
import { TrendingMemes } from "@/components/trending-memes"
import { CryptoWatch } from "@/components/crypto-watch"
import { NewLaunches } from "@/components/new-launches"
import { ScanMascot } from "@/components/scan-mascot"
import { QuickActions } from "@/components/quick-actions"

export default function MemeScanPage() {
  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />
      <LiveTicker />

      <main className="container mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 pb-20">
        <HeroBanner />

        <QuickActions />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-card border border-primary/50 rounded-lg p-3">
            <div className="text-[10px] font-mono text-muted-foreground mb-1">TOKENS SCANNED</div>
            <div className="text-lg sm:text-xl font-bold text-primary">2,847</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-[10px] font-mono text-muted-foreground mb-1">RUGS DETECTED</div>
            <div className="text-lg sm:text-xl font-bold text-destructive">127</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-[10px] font-mono text-muted-foreground mb-1">GEMS FOUND</div>
            <div className="text-lg sm:text-xl font-bold text-chart-1">48</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-[10px] font-mono text-muted-foreground mb-1">TON PRICE</div>
            <div className="text-lg sm:text-xl font-bold">$2.45</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <TrendingMemes />
          </div>
          <div className="space-y-4">
            <NewLaunches />
            <CryptoWatch />
          </div>
        </div>

        {/* Mascot Section */}
        <ScanMascot />
      </main>
    </div>
  )
}

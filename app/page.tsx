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

        {/* Preview status: what is and isn't real on this site */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-card border border-primary/50 rounded-lg p-3">
            <div className="text-[10px] font-mono text-muted-foreground mb-1">SCANNER</div>
            <div className="text-lg sm:text-xl font-bold text-primary">PREVIEW</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-[10px] font-mono text-muted-foreground mb-1">RUG CHECKS</div>
            <div className="text-lg sm:text-xl font-bold text-chart-5">NOT LIVE</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-[10px] font-mono text-muted-foreground mb-1">TOKEN DATA</div>
            <div className="text-lg sm:text-xl font-bold text-chart-1">SAMPLE</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-[10px] font-mono text-muted-foreground mb-1">PRICES</div>
            <div className="text-lg sm:text-xl font-bold">NOT LIVE</div>
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

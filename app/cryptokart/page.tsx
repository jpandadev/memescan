import { TerminalHeader } from "@/components/terminal-header"
import { CryptoKartGame } from "@/components/cryptokart/game"
import { Leaderboard } from "@/components/cryptokart/leaderboard"
import { RacerSelect } from "@/components/cryptokart/racer-select"

export default function CryptoKartPage() {
  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />
      <main className="container mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 pb-20">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-xl border border-primary/50 bg-gradient-to-r from-primary/20 via-background to-accent/20 p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--primary)_0%,_transparent_50%)] opacity-10" />
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              <span className="text-primary text-glow">CRYPTO</span>
              <span className="text-accent">KART</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Race against billionaires, politicians, and degens. Bet on races, unlock racers, and climb the
              leaderboard. The more you play, the bigger your rewards.
            </p>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <RacerSelect />
            <CryptoKartGame />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
      </main>
    </div>
  )
}

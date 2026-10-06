import { AlertTriangle } from "lucide-react"

// Every token, price and stat on this site is hardcoded or simulated. The notice
// lives in the root layout so no page can render without it, and it is sticky
// so it stays on screen while scrolling.
export function DemoBanner() {
  return (
    <div
      role="note"
      className="sticky bottom-0 z-40 border-t-2 border-chart-5 bg-background/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <p className="container mx-auto px-3 py-2 flex items-center justify-center gap-2 text-center font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-chart-5">
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <span>Demo data — not live market data, not financial advice</span>
      </p>
    </div>
  )
}

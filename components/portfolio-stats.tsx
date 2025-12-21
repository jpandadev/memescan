import { TrendingUp, DollarSign, Percent, Target } from "lucide-react"

export function PortfolioStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-card border-2 border-primary rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-mono text-muted-foreground">TOTAL VALUE</div>
          <DollarSign className="w-4 h-4 text-primary" />
        </div>
        <div className="text-3xl font-bold text-primary mb-2">$2,847,392</div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-chart-1" />
          <span className="text-chart-1 font-bold">+$127,491</span>
          <span className="text-chart-1 font-mono">(+4.68%)</span>
        </div>
      </div>

      <div className="bg-card border-2 border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-mono text-muted-foreground">DAY P&L</div>
          <TrendingUp className="w-4 h-4 text-chart-1" />
        </div>
        <div className="text-3xl font-bold text-chart-1 mb-2">+$45,892</div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-chart-1 font-mono font-bold">+1.64%</span>
          <span className="text-xs text-muted-foreground">TODAY</span>
        </div>
      </div>

      <div className="bg-card border-2 border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-mono text-muted-foreground">WIN RATE</div>
          <Percent className="w-4 h-4 text-primary" />
        </div>
        <div className="text-3xl font-bold mb-2">67.8%</div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground font-mono">234 / 345 TRADES</span>
        </div>
      </div>

      <div className="bg-card border-2 border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-mono text-muted-foreground">SHARPE RATIO</div>
          <Target className="w-4 h-4 text-primary" />
        </div>
        <div className="text-3xl font-bold mb-2">2.34</div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-chart-1 font-mono">EXCELLENT</span>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Rocket, Shield, Clock } from "lucide-react"
import { useTelegram } from "./telegram-provider"

interface NewToken {
  name: string
  symbol: string
  launchedAt: string
  liquidity: string
  safety: "low" | "medium" | "high"
  locked: boolean
}

const newLaunches: NewToken[] = [
  { name: "RocketPepe", symbol: "RPEPE", launchedAt: "2m ago", liquidity: "$45K", safety: "medium", locked: true },
  { name: "TONDoge", symbol: "TDOGE", launchedAt: "15m ago", liquidity: "$120K", safety: "high", locked: true },
  { name: "MoonCat", symbol: "MCAT", launchedAt: "32m ago", liquidity: "$8K", safety: "low", locked: false },
  { name: "DiamondHands", symbol: "DHAND", launchedAt: "1h ago", liquidity: "$230K", safety: "high", locked: true },
]

export function NewLaunches() {
  const { hapticFeedback, showAlert } = useTelegram()

  const getSafetyColor = (safety: NewToken["safety"]) => {
    switch (safety) {
      case "high":
        return "text-chart-1 border-chart-1"
      case "medium":
        return "text-chart-5 border-chart-5"
      case "low":
        return "text-destructive border-destructive"
    }
  }

  return (
    <Card className="border-2 border-chart-3/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Rocket className="w-5 h-5 text-chart-3" />
          <span>NEW LAUNCHES</span>
          <Badge className="bg-chart-3/20 text-chart-3 text-[10px] animate-pulse">ALERT</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {newLaunches.map((token) => (
            <div
              key={token.symbol}
              className="p-3 bg-muted/50 border border-border rounded-lg hover:border-chart-3/50 transition-colors cursor-pointer"
              onClick={() => {
                hapticFeedback("medium")
                showAlert(
                  `${token.name} ($${token.symbol})\nLiquidity: ${token.liquidity}\nSafety: ${token.safety.toUpperCase()}`,
                )
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{token.symbol}</span>
                  <span className="text-xs text-muted-foreground">{token.name}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {token.launchedAt}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-[9px] ${getSafetyColor(token.safety)}`}>
                    {token.safety === "high" ? (
                      <Shield className="w-2.5 h-2.5 mr-0.5" />
                    ) : (
                      <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
                    )}
                    {token.safety.toUpperCase()}
                  </Badge>
                  {token.locked && (
                    <Badge variant="outline" className="text-[9px] text-chart-1 border-chart-1">
                      LOCKED
                    </Badge>
                  )}
                </div>
                <div className="text-xs font-mono">
                  <span className="text-muted-foreground">Liq: </span>
                  <span className="text-primary font-bold">{token.liquidity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-2 bg-destructive/10 border border-destructive/30 rounded text-[10px] text-destructive flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>DYOR: New tokens are high risk. Always check contract, liquidity lock, and team before investing.</span>
        </div>
      </CardContent>
    </Card>
  )
}

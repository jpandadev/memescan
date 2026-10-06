"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Rocket, Shield, Clock, Music } from "lucide-react"
import { useTelegram } from "./telegram-provider"

// White Tiger ecosystem integration
const ANTHEM_BOT_URL = "https://t.me/MSUCOBot"

interface NewToken {
  name: string
  symbol: string
  launchedAt: string
  liquidity: string
  safety: "low" | "medium" | "high"
  locked: boolean
}

// Fictional example launches: not real projects, and the safety levels are
// made up to show the layout. Never pair them with a real token or address.
const newLaunches: NewToken[] = [
  { name: "Example Lily", symbol: "EX-LILY", launchedAt: "2m ago", liquidity: "$45K", safety: "medium", locked: true },
  { name: "Example Pond", symbol: "EX-POND", launchedAt: "15m ago", liquidity: "$120K", safety: "high", locked: true },
  { name: "Example Tadpole", symbol: "EX-TADPOLE", launchedAt: "32m ago", liquidity: "$8K", safety: "low", locked: false },
  { name: "Example Lotus", symbol: "EX-LOTUS", launchedAt: "1h ago", liquidity: "$230K", safety: "high", locked: true },
]

export function NewLaunches() {
  const { hapticFeedback, showAlert } = useTelegram()

  const handleCreateAnthem = (symbol: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    hapticFeedback("medium")
    window.open(`${ANTHEM_BOT_URL}?start=anthem_${symbol}_${encodeURIComponent(name)}`, "_blank")
  }

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
          <Badge className="bg-chart-5/20 text-chart-5 text-[10px]">EXAMPLE</Badge>
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
                  `${token.name} ($${token.symbol}) - fictional example\nLiquidity: ${token.liquidity}\nSafety: ${token.safety.toUpperCase()}`,
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
                <div className="flex items-center gap-2">
                  <div className="text-xs font-mono">
                    <span className="text-muted-foreground">Liq: </span>
                    <span className="text-primary font-bold">{token.liquidity}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-[10px] gap-1 border-chart-3/50 hover:bg-chart-3/20 hover:text-chart-3 hover:border-chart-3"
                    onClick={(e) => handleCreateAnthem(token.symbol, token.name, e)}
                  >
                    <Music className="w-3 h-3" />
                    Anthem
                  </Button>
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

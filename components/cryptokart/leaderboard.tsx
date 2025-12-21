"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Flame, TrendingUp } from "lucide-react"

const LEADERBOARD = [
  { rank: 1, name: "DiamondHands69", points: 125420, streak: 15, wins: 89 },
  { rank: 2, name: "DegenerateApe", points: 98750, streak: 12, wins: 72 },
  { rank: 3, name: "MoonBoy2024", points: 87300, streak: 8, wins: 65 },
  { rank: 4, name: "WhaleWatcher", points: 76500, streak: 5, wins: 58 },
  { rank: 5, name: "PepeMaxi", points: 65200, streak: 3, wins: 51 },
  { rank: 6, name: "SatoshiJr", points: 54100, streak: 7, wins: 45 },
  { rank: 7, name: "LeverageKing", points: 48900, streak: 2, wins: 42 },
  { rank: 8, name: "NotFinancialAdvice", points: 42300, streak: 1, wins: 38 },
  { rank: 9, name: "BuyHighSellLow", points: 38700, streak: 0, wins: 35 },
  { rank: 10, name: "RektButNotDead", points: 35200, streak: 4, wins: 32 },
]

export function Leaderboard() {
  return (
    <Card className="border-primary/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-mono flex items-center gap-2">
          <Trophy className="h-5 w-5 text-chart-5" />
          LEADERBOARD
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {LEADERBOARD.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              player.rank <= 3 ? "bg-primary/10 border border-primary/30" : "bg-card/50"
            }`}
          >
            {/* Rank */}
            <div className="w-8 text-center">
              {player.rank === 1 ? (
                <Trophy className="h-5 w-5 mx-auto text-chart-5" />
              ) : player.rank === 2 ? (
                <Medal className="h-5 w-5 mx-auto text-gray-400" />
              ) : player.rank === 3 ? (
                <Award className="h-5 w-5 mx-auto text-amber-600" />
              ) : (
                <span className="text-sm font-mono text-muted-foreground">{player.rank}</span>
              )}
            </div>

            {/* Player info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm truncate">{player.name}</span>
                {player.streak >= 5 && (
                  <Badge variant="outline" className="border-destructive text-destructive text-[10px] px-1">
                    <Flame className="h-3 w-3 mr-0.5" />
                    {player.streak}
                  </Badge>
                )}
              </div>
              <div className="text-[10px] text-muted-foreground">{player.wins} wins</div>
            </div>

            {/* Points */}
            <div className="text-right">
              <div className="font-mono font-bold text-primary text-sm">{player.points.toLocaleString()}</div>
              <div className="text-[10px] text-muted-foreground">PTS</div>
            </div>
          </div>
        ))}

        {/* Your position */}
        <div className="pt-2 mt-2 border-t border-border">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/20 border border-accent/30">
            <div className="w-8 text-center">
              <span className="text-sm font-mono text-accent">#42</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-accent">You</span>
                <Badge variant="outline" className="border-primary text-primary text-[10px] px-1">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +5
                </Badge>
              </div>
              <div className="text-[10px] text-muted-foreground">12 wins</div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-accent text-sm">1,000</div>
              <div className="text-[10px] text-muted-foreground">PTS</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

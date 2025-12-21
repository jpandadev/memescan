"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Flame, Gift, Trophy } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Link href="/cryptokart">
        <Card className="p-4 border-chart-5/50 bg-chart-5/10 hover:bg-chart-5/20 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-5/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-5 h-5 text-chart-5" />
            </div>
            <div>
              <div className="font-bold text-sm">CryptoKart</div>
              <div className="text-[10px] text-muted-foreground">Race & Win</div>
            </div>
          </div>
        </Card>
      </Link>

      <Link href="/rewards">
        <Card className="p-4 border-destructive/50 bg-destructive/10 hover:bg-destructive/20 transition-colors cursor-pointer group relative overflow-hidden">
          <Badge className="absolute -top-1 -right-1 bg-destructive text-[10px] animate-pulse">NEW</Badge>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <div className="font-bold text-sm">Daily Streak</div>
              <div className="text-[10px] text-muted-foreground">7 Days</div>
            </div>
          </div>
        </Card>
      </Link>

      <Link href="/rewards">
        <Card className="p-4 border-accent/50 bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gift className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="font-bold text-sm">Rewards</div>
              <div className="text-[10px] text-muted-foreground">3 Claimable</div>
            </div>
          </div>
        </Card>
      </Link>

      <Link href="/cryptokart">
        <Card className="p-4 border-primary/50 bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-sm">Leaderboard</div>
              <div className="text-[10px] text-muted-foreground">#42 Rank</div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}

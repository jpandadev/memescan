"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Lock, Flame, Crown, Diamond, Rocket, Star, Medal, Shield } from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
  progress?: number
  total?: number
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-scan",
    name: "First Scan",
    description: "Scan your first token",
    icon: <Eye className="w-6 h-6" />,
    unlocked: true,
    rarity: "common",
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "7 day login streak",
    icon: <Flame className="w-6 h-6" />,
    unlocked: true,
    rarity: "common",
  },
  {
    id: "first-win",
    name: "Winner Winner",
    description: "Win first CryptoKart race",
    icon: <Trophy className="w-6 h-6" />,
    unlocked: true,
    rarity: "common",
  },
  {
    id: "streak-30",
    name: "Monthly Legend",
    description: "30 day login streak",
    icon: <Crown className="w-6 h-6" />,
    unlocked: false,
    rarity: "epic",
    progress: 7,
    total: 30,
  },
  {
    id: "races-100",
    name: "Speed Demon",
    description: "Win 100 races",
    icon: <Rocket className="w-6 h-6" />,
    unlocked: false,
    rarity: "rare",
    progress: 12,
    total: 100,
  },
  {
    id: "referrals-10",
    name: "Network Effect",
    description: "Refer 10 friends",
    icon: <Star className="w-6 h-6" />,
    unlocked: false,
    rarity: "rare",
    progress: 2,
    total: 10,
  },
  {
    id: "diamond-hands",
    name: "Diamond Hands",
    description: "Hold streak for 100 days",
    icon: <Diamond className="w-6 h-6" />,
    unlocked: false,
    rarity: "legendary",
    progress: 7,
    total: 100,
  },
  {
    id: "whale",
    name: "Whale Status",
    description: "Accumulate 1M points",
    icon: <Shield className="w-6 h-6" />,
    unlocked: false,
    rarity: "legendary",
    progress: 15420,
    total: 1000000,
  },
]

import { Eye } from "lucide-react"

export function AchievementGrid() {
  const rarityColors = {
    common: "border-muted-foreground bg-muted/50",
    rare: "border-accent bg-accent/20",
    epic: "border-chart-5 bg-chart-5/20",
    legendary: "border-destructive bg-destructive/20",
  }

  const rarityGlow = {
    common: "",
    rare: "shadow-accent/30 shadow-lg",
    epic: "shadow-chart-5/30 shadow-lg",
    legendary: "shadow-destructive/30 shadow-xl neon-glow",
  }

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono flex items-center gap-2">
            <Medal className="h-5 w-5 text-chart-5" />
            ACHIEVEMENTS
          </CardTitle>
          <Badge variant="outline" className="border-chart-5 text-chart-5">
            {ACHIEVEMENTS.filter((a) => a.unlocked).length}/{ACHIEVEMENTS.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-3 rounded-lg border-2 ${rarityColors[achievement.rarity]} ${achievement.unlocked ? rarityGlow[achievement.rarity] : "opacity-50"}`}
            >
              {!achievement.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-lg z-10">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
              )}

              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  achievement.unlocked
                    ? achievement.rarity === "legendary"
                      ? "text-destructive"
                      : achievement.rarity === "epic"
                        ? "text-chart-5"
                        : achievement.rarity === "rare"
                          ? "text-accent"
                          : "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {achievement.icon}
              </div>

              <div className="text-center">
                <div className="text-xs font-bold truncate">{achievement.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{achievement.description}</div>
              </div>

              {achievement.progress !== undefined && !achievement.unlocked && (
                <div className="mt-2">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(achievement.progress / achievement.total!) * 100}%` }}
                    />
                  </div>
                  <div className="text-[9px] text-center text-muted-foreground mt-0.5">
                    {achievement.progress.toLocaleString()}/{achievement.total!.toLocaleString()}
                  </div>
                </div>
              )}

              <Badge
                variant="outline"
                className={`absolute -top-2 -right-2 text-[8px] px-1 ${
                  achievement.rarity === "legendary"
                    ? "border-destructive text-destructive"
                    : achievement.rarity === "epic"
                      ? "border-chart-5 text-chart-5"
                      : achievement.rarity === "rare"
                        ? "border-accent text-accent"
                        : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {achievement.rarity.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

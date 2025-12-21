"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Check, Zap, Eye, Share2, Gamepad2, MessageSquare } from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string
  points: number
  progress: number
  total: number
  completed: boolean
  claimed: boolean
  icon: React.ReactNode
  type: "daily" | "weekly" | "special"
}

export function DailyMissions() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "scan",
      title: "Token Scanner",
      description: "Scan 5 different tokens",
      points: 50,
      progress: 3,
      total: 5,
      completed: false,
      claimed: false,
      icon: <Eye className="w-4 h-4" />,
      type: "daily",
    },
    {
      id: "share",
      title: "Social Butterfly",
      description: "Share a token to Twitter",
      points: 30,
      progress: 1,
      total: 1,
      completed: true,
      claimed: false,
      icon: <Share2 className="w-4 h-4" />,
      type: "daily",
    },
    {
      id: "race",
      title: "Speed Demon",
      description: "Win 3 CryptoKart races",
      points: 100,
      progress: 1,
      total: 3,
      completed: false,
      claimed: false,
      icon: <Gamepad2 className="w-4 h-4" />,
      type: "daily",
    },
    {
      id: "invite",
      title: "Recruiter",
      description: "Invite a friend who joins",
      points: 200,
      progress: 0,
      total: 1,
      completed: false,
      claimed: false,
      icon: <MessageSquare className="w-4 h-4" />,
      type: "weekly",
    },
    {
      id: "streak",
      title: "Dedicated Degen",
      description: "Maintain 7 day streak",
      points: 500,
      progress: 7,
      total: 7,
      completed: true,
      claimed: true,
      icon: <Zap className="w-4 h-4" />,
      type: "special",
    },
  ])

  const claimMission = (id: string) => {
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, claimed: true } : m)))
  }

  const dailyMissions = missions.filter((m) => m.type === "daily")
  const weeklyMissions = missions.filter((m) => m.type === "weekly")
  const specialMissions = missions.filter((m) => m.type === "special")

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            DAILY MISSIONS
          </CardTitle>
          <Badge variant="outline" className="border-primary text-primary">
            {missions.filter((m) => m.completed && !m.claimed).length} CLAIMABLE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Daily */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-muted-foreground">DAILY TASKS</div>
          {dailyMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} onClaim={claimMission} />
          ))}
        </div>

        {/* Weekly */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-muted-foreground">WEEKLY CHALLENGES</div>
          {weeklyMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} onClaim={claimMission} />
          ))}
        </div>

        {/* Special */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-muted-foreground">SPECIAL ACHIEVEMENTS</div>
          {specialMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} onClaim={claimMission} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MissionCard({ mission, onClaim }: { mission: Mission; onClaim: (id: string) => void }) {
  const progressPercent = (mission.progress / mission.total) * 100

  return (
    <div
      className={`p-3 rounded-lg border ${
        mission.claimed
          ? "bg-muted/30 border-muted opacity-60"
          : mission.completed
            ? "bg-primary/10 border-primary"
            : "bg-card border-border"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            mission.claimed ? "bg-muted" : mission.completed ? "bg-primary/20 text-primary" : "bg-muted/50"
          }`}
        >
          {mission.claimed ? <Check className="w-5 h-5 text-muted-foreground" /> : mission.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{mission.title}</span>
            <Badge variant="outline" className="text-[10px] px-1.5">
              +{mission.points}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate">{mission.description}</p>

          {!mission.completed && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-mono">
                  {mission.progress}/{mission.total}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          )}
        </div>

        {mission.completed && !mission.claimed && (
          <Button size="sm" onClick={() => onClaim(mission.id)} className="h-8 text-xs">
            CLAIM
          </Button>
        )}
        {mission.claimed && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Check className="w-3 h-3" /> Claimed
          </div>
        )}
      </div>
    </div>
  )
}

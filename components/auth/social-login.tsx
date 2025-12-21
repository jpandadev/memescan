"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogIn, Gift, Sparkles, Check } from "lucide-react"
import { useTelegram } from "@/components/telegram-provider"

interface LoginProvider {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bonus: number
  connected: boolean
}

export function SocialLogin() {
  const { isInTelegram, user } = useTelegram()
  const [providers, setProviders] = useState<LoginProvider[]>([
    {
      id: "telegram",
      name: "Telegram",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      color: "bg-[#0088cc]",
      bonus: 100,
      connected: isInTelegram && !!user,
    },
    {
      id: "twitter",
      name: "X / Twitter",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "bg-foreground",
      bonus: 150,
      connected: false,
    },
    {
      id: "discord",
      name: "Discord",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      color: "bg-[#5865F2]",
      bonus: 150,
      connected: false,
    },
    {
      id: "google",
      name: "Google",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      ),
      color: "bg-white text-black",
      bonus: 100,
      connected: false,
    },
  ])

  const connectProvider = (id: string) => {
    // In production, this would trigger OAuth flow
    setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, connected: true } : p)))
  }

  const totalBonus = providers.filter((p) => p.connected).reduce((sum, p) => sum + p.bonus, 0)

  return (
    <Card className="border-accent/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono flex items-center gap-2">
            <LogIn className="h-5 w-5 text-accent" />
            CONNECT & EARN
          </CardTitle>
          {totalBonus > 0 && (
            <Badge className="bg-chart-5 text-background">
              <Gift className="h-3 w-3 mr-1" />+{totalBonus} EARNED
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">Connect your socials to earn bonus points and unlock features!</p>

        {providers.map((provider) => (
          <div
            key={provider.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              provider.connected ? "bg-primary/10 border-primary" : "bg-card border-border"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg ${provider.color} flex items-center justify-center text-white`}>
              {provider.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{provider.name}</span>
                {provider.connected && (
                  <Badge variant="outline" className="border-primary text-primary text-[10px]">
                    <Check className="h-3 w-3 mr-0.5" />
                    Connected
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {provider.connected ? "Bonus claimed!" : `+${provider.bonus} bonus points`}
              </p>
            </div>
            {!provider.connected && (
              <Button size="sm" onClick={() => connectProvider(provider.id)} className="h-8 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Connect
              </Button>
            )}
          </div>
        ))}

        {/* All connected bonus */}
        {providers.every((p) => p.connected) && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/20 via-chart-5/20 to-accent/20 border border-chart-5/50 text-center">
            <Sparkles className="h-8 w-8 mx-auto text-chart-5 mb-2" />
            <div className="font-bold text-chart-5">ALL ACCOUNTS CONNECTED!</div>
            <div className="text-xs text-muted-foreground">You've earned maximum social bonus</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

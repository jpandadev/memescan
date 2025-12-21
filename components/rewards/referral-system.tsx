"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Copy, Check, Gift } from "lucide-react"

export function ReferralSystem() {
  const [copied, setCopied] = useState(false)
  const referralCode = "MEME420X"
  const referralLink = `https://memescan.ton/join?ref=${referralCode}`
  const referrals = 3
  const earnings = 600

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(
      `Join me on MemeScan - the Bloomberg for Meme Coins! Use my code ${referralCode} for bonus points. `,
    )
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(referralLink)}`, "_blank")
  }

  const shareToTelegram = () => {
    const text = encodeURIComponent(`Join me on MemeScan! Use code ${referralCode} for bonus points`)
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`, "_blank")
  }

  return (
    <Card className="border-accent/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-mono flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          INVITE FRIENDS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/30 text-center">
            <div className="text-2xl font-bold text-accent">{referrals}</div>
            <div className="text-[10px] text-muted-foreground">REFERRALS</div>
          </div>
          <div className="p-3 rounded-lg bg-chart-5/10 border border-chart-5/30 text-center">
            <div className="text-2xl font-bold text-chart-5">+{earnings}</div>
            <div className="text-[10px] text-muted-foreground">EARNED</div>
          </div>
        </div>

        {/* Referral code */}
        <div className="p-3 rounded-lg border border-border bg-muted/50">
          <div className="text-xs text-muted-foreground mb-2">YOUR REFERRAL CODE</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 font-mono font-bold text-primary text-lg">{referralCode}</code>
            <Button size="sm" variant="outline" onClick={copyLink} className="h-8 bg-transparent">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="space-y-2">
          <Button
            onClick={shareToTwitter}
            variant="outline"
            className="w-full justify-start h-10 bg-transparent"
            size="sm"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X/Twitter
          </Button>
          <Button
            onClick={shareToTelegram}
            variant="outline"
            className="w-full justify-start h-10 bg-transparent"
            size="sm"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Share on Telegram
          </Button>
        </div>

        {/* Rewards tier */}
        <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">Referral Rewards</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Per referral</span>
              <span className="text-primary font-mono">+200 PTS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">5 referrals bonus</span>
              <span className="text-chart-5 font-mono">+500 PTS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">10 referrals bonus</span>
              <span className="text-destructive font-mono">+1000 PTS</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

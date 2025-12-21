import { TerminalHeader } from "@/components/terminal-header"
import { DailyStreak } from "@/components/rewards/daily-streak"
import { DailyMissions } from "@/components/rewards/daily-missions"
import { AchievementGrid } from "@/components/rewards/achievement-grid"
import { RewardShop } from "@/components/rewards/reward-shop"
import { ReferralSystem } from "@/components/rewards/referral-system"
import { SocialLogin } from "@/components/auth/social-login"

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />
      <main className="container mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 pb-20">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-xl border border-destructive/50 bg-gradient-to-r from-destructive/20 via-background to-chart-5/20 p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--destructive)_0%,_transparent_50%)] opacity-10" />
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              <span className="text-destructive">REWARDS</span>
              <span className="text-chart-5"> HUB</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Complete daily missions, maintain your streak, and climb the ranks. The more you engage, the bigger your
              rewards. Invite friends to multiply your earnings.
            </p>
          </div>
        </div>

        {/* Streak Banner */}
        <DailyStreak />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <DailyMissions />
            <AchievementGrid />
          </div>
          <div className="space-y-4">
            <SocialLogin />
            <RewardShop />
            <ReferralSystem />
          </div>
        </div>
      </main>
    </div>
  )
}

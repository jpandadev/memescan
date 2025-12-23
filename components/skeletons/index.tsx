"use client"

import { memo } from 'react'

// Base skeleton with shimmer animation
function SkeletonBase({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-muted/50 via-muted to-muted/50 bg-[length:200%_100%] ${className}`}
      style={{ animation: 'shimmer 2s infinite linear' }}
    />
  )
}

// Token Card Skeleton
export const TokenCardSkeleton = memo(function TokenCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-card">
      <SkeletonBase className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <SkeletonBase className="h-4 w-20 rounded" />
        <SkeletonBase className="h-3 w-32 rounded" />
      </div>
      <div className="text-right space-y-2">
        <SkeletonBase className="h-5 w-16 rounded ml-auto" />
        <SkeletonBase className="h-3 w-12 rounded ml-auto" />
      </div>
    </div>
  )
})

// Ticker Skeleton
export const TickerSkeleton = memo(function TickerSkeleton() {
  return (
    <div className="relative overflow-hidden bg-card border-y-2 border-primary/30 py-3">
      <div className="flex gap-8 px-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap">
            <SkeletonBase className="h-4 w-12 rounded" />
            <SkeletonBase className="h-4 w-16 rounded" />
            <SkeletonBase className="h-4 w-14 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
})

// Chart Skeleton
export const ChartSkeleton = memo(function ChartSkeleton() {
  return (
    <div className="p-6 rounded-lg border-2 border-border bg-card">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div className="space-y-2">
          <SkeletonBase className="h-6 w-24 rounded" />
          <SkeletonBase className="h-8 w-32 rounded" />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBase key={i} className="h-7 w-10 rounded" />
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-[300px] rounded overflow-hidden">
        <SkeletonBase className="absolute inset-0" />
        {/* Fake chart lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <path
            d="M0,200 Q100,180 200,160 T400,140 T600,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>
      </div>

      {/* Volume Area */}
      <div className="h-[80px] mt-4 rounded overflow-hidden">
        <SkeletonBase className="h-full w-full" />
      </div>
    </div>
  )
})

// Grid of Token Cards Skeleton
export const TokenGridSkeleton = memo(function TokenGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <TokenCardSkeleton key={i} />
      ))}
    </div>
  )
})

// News Feed Skeleton
export const NewsFeedSkeleton = memo(function NewsFeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 rounded-lg border border-border/50 bg-card">
          <div className="flex gap-4">
            <SkeletonBase className="h-20 w-20 rounded" />
            <div className="flex-1 space-y-2">
              <SkeletonBase className="h-4 w-3/4 rounded" />
              <SkeletonBase className="h-3 w-full rounded" />
              <SkeletonBase className="h-3 w-1/2 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

// Full Page Skeleton
export const PageSkeleton = memo(function PageSkeleton() {
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <SkeletonBase className="h-8 w-48 rounded" />
        <SkeletonBase className="h-10 w-32 rounded" />
      </div>

      {/* Ticker */}
      <TickerSkeleton />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
          <TokenGridSkeleton count={4} />
        </div>
      </div>
    </div>
  )
})

// Casino Game Skeleton
export const GameSkeleton = memo(function GameSkeleton() {
  return (
    <div className="p-6 rounded-lg border-2 border-primary/30 bg-card/50 backdrop-blur">
      {/* Title */}
      <SkeletonBase className="h-8 w-40 rounded mx-auto mb-6" />

      {/* Multiplier Display */}
      <div className="p-6 rounded-lg border border-border/50 bg-black/30 mb-6">
        <SkeletonBase className="h-16 w-32 rounded mx-auto" />
      </div>

      {/* Game Area */}
      <SkeletonBase className="h-48 w-full rounded-lg mb-6" />

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <SkeletonBase className="h-10 w-10 rounded" />
        <SkeletonBase className="h-12 w-24 rounded" />
        <SkeletonBase className="h-10 w-10 rounded" />
      </div>

      {/* Action Button */}
      <SkeletonBase className="h-14 w-full rounded-lg" />
    </div>
  )
})

// Export all skeletons
export default {
  TokenCard: TokenCardSkeleton,
  Ticker: TickerSkeleton,
  Chart: ChartSkeleton,
  TokenGrid: TokenGridSkeleton,
  NewsFeed: NewsFeedSkeleton,
  Page: PageSkeleton,
  Game: GameSkeleton,
}

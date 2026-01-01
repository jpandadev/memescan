"use client"

import { Music, Shield, TrendingUp, ExternalLink } from "lucide-react"

interface EcosystemLink {
  name: string
  description: string
  url: string
  icon: React.ReactNode
  badge?: string
}

const ecosystemLinks: EcosystemLink[] = [
  {
    name: "White Tiger",
    description: "AI Meme Anthems",
    url: "https://t.me/MSUCOBot",
    icon: <Music className="w-4 h-4" />,
    badge: "NEW",
  },
  {
    name: "Rug Score",
    description: "Token Safety",
    url: "https://notaryton.com",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    name: "MemeScan",
    description: "Token Discovery",
    url: "https://memescan-astro.vercel.app",
    icon: <TrendingUp className="w-4 h-4" />,
  },
]

export function EcosystemFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Ecosystem Label */}
          <div className="text-center md:text-left">
            <div className="text-xs font-mono text-muted-foreground">
              PART OF THE
            </div>
            <div className="text-sm font-bold text-primary">
              JPanda Network
            </div>
          </div>

          {/* Ecosystem Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {ecosystemLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  {link.icon}
                </span>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold">{link.name}</span>
                    {link.badge && (
                      <span className="px-1 py-0.5 text-[8px] font-bold bg-chart-3 text-chart-3-foreground rounded">
                        {link.badge}
                      </span>
                    )}
                    <ExternalLink className="w-2.5 h-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {link.description}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-[10px] text-muted-foreground font-mono">
            © 2025 JPanda Network
          </div>
        </div>
      </div>
    </footer>
  )
}

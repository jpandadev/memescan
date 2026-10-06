# MemeScan - design preview with sample data

> Part of the **MemeSeal Ecosystem**

MemeScan is a front-end **design preview** of a meme coin dashboard for TON,
built as a Next.js app. It is not a working scanner.

Every token, price, chart, order book, headline, portfolio, leaderboard and
stat on the site is hardcoded or randomly generated sample data. There is no
live price feed, no token scanning, no rug or scam detection, and no wallet
connection. Nothing on the site is financial advice. A notice saying so is
pinned to the bottom of every page by the root layout (`components/demo-banner.tsx`).

Preview: [blockburnnn.vercel.app](https://blockburnnn.vercel.app)

## What is in the preview

- **Scanner** (`/`) - the dashboard layout: a sample price ticker, and
  fictional example tokens with example risk badges
- **Trending** (`/crypto`) - a mock trading view; the chart and order book
  are simulated
- **Watchlist** (`/portfolio`) - a sample portfolio
- **CryptoKart** (`/cryptokart`) - a points-only racing mini-game that runs in
  the browser; no money or tokens involved
- **Rewards** (`/rewards`) - mock missions, streaks and referral screens;
  nothing is stored or paid out

## Sample data rules

- Anything that carries a risk, safety, rug or scam label uses **fictional**
  tokens ("Example Frog", `EX-FROG`). Never put such a label next to a real
  token name, ticker or address unless it comes from a real, documented check.
- Do not label sample figures as live or real-time.

## Tech Stack

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Platform**: Telegram Mini App (Telegram WebApp script)

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Environment Variables

None are needed to run the preview. `lib/api.ts` (used only by an
interest-rate widget that is not on any page) reads `API_NINJAS_KEY`
server-side; without it those helpers return empty results. See
`.env.example`.

## Links

- Twitter: [@MemeSealTON](https://x.com/MemeSealTON)

## License

MIT - MemeSeal Team 2025

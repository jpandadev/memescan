"use server"

// Server-side only - never expose API keys to client. Read from the environment
// and nowhere else; without it the API Ninjas helpers return their empty
// fallback instead of making a request that can only fail.
const API_NINJAS_KEY = process.env.API_NINJAS_KEY || ""

// Validate we have the key in production
if (!API_NINJAS_KEY && process.env.NODE_ENV === "production") {
  console.warn("[MemeScan] API_NINJAS_KEY not set - API Ninjas data will be empty")
}

export async function fetchInterestRates() {
  if (!API_NINJAS_KEY) return []
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/interestrate", {
      headers: {
        "X-Api-Key": API_NINJAS_KEY,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) throw new Error("Failed to fetch interest rates")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("[MemeScan] Interest rate fetch error:", error)
    return []
  }
}

export async function fetchForexRates() {
  try {
    // Using exchangeratesapi.io free tier with USD base
    const response = await fetch("https://api.exchangeratesapi.io/v1/latest?base=USD&symbols=JPY,EUR,GBP,CNY,KRW", {
      headers: {
        apikey: "YOUR_EXCHANGERATES_API_KEY", // User needs to sign up at exchangeratesapi.io
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      // Fallback to mock data if API fails
      return {
        base: "USD",
        rates: {
          JPY: 157.45,
          EUR: 0.92,
          GBP: 0.79,
          CNY: 7.24,
          KRW: 1389.5,
        },
        timestamp: Date.now(),
      }
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("[MemeScan] Forex fetch error:", error)
    // Return mock data on error
    return {
      base: "USD",
      rates: {
        JPY: 157.45,
        EUR: 0.92,
        GBP: 0.79,
        CNY: 7.24,
        KRW: 1389.5,
      },
      timestamp: Date.now(),
    }
  }
}

export async function fetchCommodityPrices(commodity = "crude_oil") {
  if (!API_NINJAS_KEY) return null
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/commodityprice?name=${commodity}`, {
      headers: {
        "X-Api-Key": API_NINJAS_KEY,
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) throw new Error("Failed to fetch commodity prices")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("[MemeScan] Commodity fetch error:", error)
    return null
  }
}

export async function fetchCryptoPrice(symbol = "BTCUSDT") {
  if (!API_NINJAS_KEY) return null
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/cryptoprice?symbol=${symbol}`, {
      headers: {
        "X-Api-Key": API_NINJAS_KEY,
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    })

    if (!response.ok) throw new Error("Failed to fetch crypto price")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("[MemeScan] Crypto fetch error:", error)
    return null
  }
}

export async function fetchStockPrice(ticker: string) {
  if (!API_NINJAS_KEY) return null
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/stockprice?ticker=${ticker}`, {
      headers: {
        "X-Api-Key": API_NINJAS_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) throw new Error("Failed to fetch stock price")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("[MemeScan] Stock fetch error:", error)
    return null
  }
}

export async function fetchMultipleCryptos() {
  try {
    const [btc, eth] = await Promise.all([fetchCryptoPrice("BTCUSDT"), fetchCryptoPrice("ETHUSDT")])

    return {
      BTC: btc,
      ETH: eth,
    }
  } catch (error) {
    console.error("[MemeScan] Multiple crypto fetch error:", error)
    return null
  }
}

export async function fetchElectricityPrices() {
  try {
    // Fetch day-ahead prices for multiple zones
    const zones = ["JP", "US-CA", "DE", "KR"]
    const prices = await Promise.all(
      zones.map(async (zone) => {
        try {
          const response = await fetch(`https://api.electricitymaps.com/v3/power-breakdown/latest?zone=${zone}`, {
            headers: {
              "auth-token": "YOUR_ELECTRICITY_MAPS_KEY", // User needs to get from electricitymaps.com
            },
            next: { revalidate: 600 }, // Cache for 10 minutes
          })
          if (!response.ok) throw new Error(`Failed for zone ${zone}`)
          return await response.json()
        } catch {
          return null
        }
      }),
    )

    return prices
  } catch (error) {
    console.error("[MemeScan] Electricity prices fetch error:", error)
    // Return mock data
    return [
      { country: "Japan", cost: 120, source: "JEPX Est." },
      { country: "USA", cost: 85, source: "EIA Est." },
      { country: "Germany", cost: 140, source: "EPEX Est." },
      { country: "China", cost: 95, source: "Est." },
      { country: "S.Korea", cost: 110, source: "KPX Est." },
    ]
  }
}

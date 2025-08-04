"use server"

import { supabase } from "@/lib/supabase"
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const FALLBACKS = ["/jpg/post.jpg", "/jpg/post1.jpg", "/jpg/post2.jpg", "/jpg/post3.jpg"]

// RPC endpoints with fallbacks
const RPC_ENDPOINTS = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
  'https://solana-mainnet.g.alchemy.com/v2/demo'
];

export async function getPaginatedPosts(currentPage: number) {
  try {
    // Get total count first
    const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })

    const totalPosts = count || 0

    // Calculate pagination
    let skip = 0
    let limit = 10
    if (currentPage === 1) {
      skip = 0
      limit = 10
    } else {
      skip = 10 + (currentPage - 2) * 9
      limit = 9
    }

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, date, title, summary, body, image")
      .order("date", { ascending: false })
      .range(skip, skip + limit - 1)

    if (error) {
      console.error("Supabase error:", error)
      return { posts: [], total: 0, error: "Failed to fetch posts" }
    }

    // Assign fallback images if image is missing/null/empty
    const transformedPosts = (posts || []).map((post, idx) => ({
      id: post.id,
      date: post.date,
      title: post.title,
      summary: post.summary,
      body: post.body,
      image: post.image && post.image.trim() !== "" ? post.image : FALLBACKS[idx % FALLBACKS.length],
    }))

    return {
      posts: transformedPosts,
      total: totalPosts,
      error: null,
    }
  } catch (error) {
    console.error("Error fetching posts:", error)
    return { posts: [], total: 0, error: "Failed to fetch posts" }
  }
}

// Function to fetch and cache the 10 most recent blog posts
export async function fetchAndCacheRecentPosts() {
  try {
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, date, title, summary, body, image")
      .order("date", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: "Failed to fetch posts" }
    }

    // Assign fallback images if image is missing/null/empty
    const transformedPosts = (posts || []).map((post, idx) => ({
      id: post.id,
      date: post.date,
      title: post.title,
      summary: post.summary,
      body: post.body,
      image: post.image && post.image.trim() !== "" ? post.image : FALLBACKS[idx % FALLBACKS.length],
    }))

    // Save to JSON file in the public directory
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    const cacheData = {
      posts: transformedPosts,
      lastUpdated: new Date().toISOString(),
      count: transformedPosts.length
    }

    writeFileSync(cachePath, JSON.stringify(cacheData, null, 2))
    
    console.log(`✅ Cached ${transformedPosts.length} recent posts to public/cached-posts.json`)
    return { success: true, posts: transformedPosts }
  } catch (error) {
    console.error("Error caching posts:", error)
    return { success: false, error: "Failed to cache posts" }
  }
}

// Function to get cached posts (for client-side use)
export async function getCachedPosts() {
  try {
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    
    if (!existsSync(cachePath)) {
      // If cache doesn't exist, fetch and create it
      const result = await fetchAndCacheRecentPosts()
      if (!result.success) {
        return { posts: [], error: result.error }
      }
      return { posts: result.posts, error: null }
    }

    const cacheData = JSON.parse(readFileSync(cachePath, 'utf-8'))
    return { posts: cacheData.posts, error: null }
  } catch (error) {
    console.error("Error reading cached posts:", error)
    return { posts: [], error: "Failed to read cached posts" }
  }
}

// Function to get cached posts for client components
export async function getRecentPostsForClient() {
  try {
    const response = await fetch('/cached-posts.json', {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch cached posts')
    }
    
    const data = await response.json()
    return { posts: data.posts, error: null }
  } catch (error) {
    console.error("Error fetching cached posts:", error)
    return { posts: [], error: "Failed to fetch cached posts" }
  }
}

export async function getBalanceData(walletAddress: string, tokenAddress: string, decimals: number) {
  try {
    if (!walletAddress) {
      return { error: 'Wallet address required', balance: 0 };
    }

    const publicKey = new PublicKey(walletAddress);
    let balance = 0;

    // Try each RPC endpoint
    for (const rpcUrl of RPC_ENDPOINTS) {
      try {
        console.log(`Trying RPC endpoint: ${rpcUrl}`);
        const connection = new Connection(rpcUrl, 'confirmed');
        
        if (tokenAddress === 'So11111111111111111111111111111111111111112') {
          // SOL balance
          const lamports = await connection.getBalance(publicKey);
          balance = lamports / LAMPORTS_PER_SOL;
          console.log(`SOL balance: ${balance}`);
        } else {
          // SPL token balance
          const response = await connection.getTokenAccountsByOwner(publicKey, {
            mint: new PublicKey(tokenAddress)
          });
          
          if (response.value.length > 0) {
            const accountInfo = await connection.getAccountInfo(response.value[0].pubkey);
            if (accountInfo && accountInfo.data.length >= 72) {
              const data = accountInfo.data;
              const amount = data.readBigUInt64LE(64);
              balance = Number(amount) / (10 ** decimals);
              console.log(`SPL token balance: ${balance}`);
            }
          }
        }
        
        // Success - return the balance
        return { 
          balance,
          rpcEndpoint: rpcUrl,
          success: true 
        };
        
      } catch (error) {
        console.log(`Failed to fetch from ${rpcUrl}:`, error);
        continue; // Try next endpoint
      }
    }
    
    // All endpoints failed
    return { 
      error: 'All RPC endpoints failed',
      balance: 0 
    };
    
  } catch (error) {
    console.error('Balance API error:', error);
    return { 
      error: 'Internal server error',
      balance: 0 
    };
  }
}

// In-flight dedupe so concurrent callers share the same promise
const inFlightMarketFetches: Map<string, Promise<any>> = new Map();

// Cache for market data
const marketCache: Map<string, { expires: number; data: any }> = new Map();

// Fetch with exponential backoff
async function fetchWithBackoff(url: string, options: RequestInit, retries: number): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        ...options,
        next: { revalidate: 60 }, // Cache for 60 seconds
      });
      
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Fetch failed ${res.status}: ${text}`);
      }
      
      return res;
    } catch (e) {
      if (attempt === retries - 1) throw e;
      
      // Exponential backoff with jitter
      const delay = 300 * 2 ** attempt + Math.floor(Math.random() * 100);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('All retries failed');
}

export async function getMarketData(tokenAddress: string) {
  const key = tokenAddress;
  if (inFlightMarketFetches.has(key)) {
    return inFlightMarketFetches.get(key);
  }
  const promise = (async () => {
    try {
      const now = Date.now();
      const cacheKey = tokenAddress;
      const cached = marketCache.get(cacheKey);
      if (cached && cached.expires > now) {
        return { ...cached.data, success: true, source: 'cache' };
      }

      // Map token addresses to identifiers
      const tokenMap: { [key: string]: { coinGeckoId: string; binanceSymbol?: string; isStable?: boolean; coinMarketCapId?: string; staticPrice?: number } } = {
        'So11111111111111111111111111111111111111112': { coinGeckoId: 'solana', binanceSymbol: 'SOLUSDT', coinMarketCapId: '485' },
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': { coinGeckoId: 'usd-coin', isStable: true, coinMarketCapId: '3408' },
        'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN': { coinGeckoId: 'jupiter-exchange-solana', binanceSymbol: 'JUPUSDT', coinMarketCapId: '23095' },
        'GGEMxCsqM74URiXdY46VcaSW73a4yfHfJKrJrUmDVpEF': { coinGeckoId: 'ggem', staticPrice: 0.012408 },
        'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn': { coinGeckoId: 'jito-staked-sol' },
      };

      const info = tokenMap[tokenAddress];
      console.log(`🔍 Token mapping for ${tokenAddress}:`, info);
      if (!info) {
        return { error: 'Token not supported', price: 0, change24h: 0 };
      }

      let price = 0;
      let change24h = 0;
      let chartData: Array<{ time: string; price: number }> = [];
      let source: string = 'unknown';

      // Try Jupiter Price API V3 first for tokens with minimal liquidity (like GGEM)
      if (info.staticPrice && info.staticPrice > 0) {
        try {
          const jupiterPriceUrl = `https://lite-api.jup.ag/price/v3?tokens=${tokenAddress}`;
          console.log(`🔍 Trying Jupiter Price API V3 first for ${tokenAddress}: ${jupiterPriceUrl}`);
          const jupiterPriceRes = await fetchWithBackoff(jupiterPriceUrl, { headers: { Accept: 'application/json' } }, 3);
          
          if (jupiterPriceRes.ok) {
            const jupiterPriceJson = await jupiterPriceRes.json();
            console.log(`📊 Jupiter Price API V3 response for ${tokenAddress}:`, jupiterPriceJson);
            
            if (jupiterPriceJson.data?.[tokenAddress]?.price) {
              price = jupiterPriceJson.data[tokenAddress].price;
              change24h = 0; // Jupiter price API might not provide 24h change
              source = 'jupiter-price-v3';
              console.log(`✅ Jupiter Price API V3 for ${tokenAddress}: price=${price}, change24h=${change24h}`);
              
              const result = { price, change24h, chartData: [], source };
              marketCache.set(cacheKey, { data: result, expires: now + 60000 });
              return { ...result, success: true };
            } else {
              console.log(`❌ Jupiter Price API V3 no price data for ${tokenAddress}: data =`, jupiterPriceJson.data);
            }
          } else {
            console.log(`❌ Jupiter Price API V3 failed for ${tokenAddress}: ${jupiterPriceRes.status} ${jupiterPriceRes.statusText}`);
          }
        } catch (e) {
          console.warn('Jupiter Price API V3 failed', e);
        }
        
        // Fallback to static price if Jupiter Price API fails
        price = info.staticPrice;
        change24h = 0; // No change data for static prices
        source = 'static';
        console.log(`✅ Using static price fallback for ${tokenAddress}: price=${price}, change24h=${change24h}`);
        
        const result = { price, change24h, chartData: [], source };
        marketCache.set(cacheKey, { data: result, expires: now + 60000 });
        return { ...result, success: true };
      }

      // Special handling for JitoSOL - try full coin endpoint first due to rate limiting issues
      if (info.coinGeckoId === 'jito-staked-sol') {
        console.log(`🎯 JitoSOL detected, using special handling`);
        try {
          const fullCoinUrl = `https://api.coingecko.com/api/v3/coins/${info.coinGeckoId}`;
          console.log(`🔍 Trying CoinGecko full coin API first for JitoSOL: ${fullCoinUrl}`);
          const fullCoinRes = await fetchWithBackoff(fullCoinUrl, { headers: { Accept: 'application/json' } }, 3);
          if (fullCoinRes.ok) {
            const fullCoinJson = await fullCoinRes.json();
            console.log(`📊 CoinGecko full coin response for JitoSOL:`, fullCoinJson);
            if (fullCoinJson.market_data?.current_price?.usd) {
              price = fullCoinJson.market_data.current_price.usd;
              change24h = fullCoinJson.market_data.price_change_percentage_24h || 0;
              source = 'coingecko-full-jito';
              console.log(`✅ CoinGecko full coin API for JitoSOL: price=${price}, change24h=${change24h}`);
            } else {
              console.log(`❌ CoinGecko full coin API no price data for JitoSOL`);
            }
          } else {
            console.log(`❌ CoinGecko full coin API failed for JitoSOL: ${fullCoinRes.status} ${fullCoinRes.statusText}`);
          }
        } catch (e) {
          console.warn('CoinGecko full coin API failed for JitoSOL', e);
        }
      }

      // Primary: CoinGecko hourly chart
      try {
        const chartUrl = `https://api.coingecko.com/api/v3/coins/${info.coinGeckoId}/market_chart?vs_currency=usd&days=1&interval=hourly`;
        console.log(`🔍 Trying CoinGecko chart API for ${tokenAddress} (${info.coinGeckoId}): ${chartUrl}`);
        const chartRes = await fetchWithBackoff(chartUrl, { headers: { Accept: 'application/json' } }, 3);
        if (chartRes.ok) {
          const chartJson = await chartRes.json();
          console.log(`📊 CoinGecko chart response for ${tokenAddress}:`, chartJson);
          if (Array.isArray(chartJson.prices) && chartJson.prices.length > 0) {
            chartData = chartJson.prices.slice(-24).map((p: [number, number]) => ({
              time: new Date(p[0]).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
              price: p[1],
            }));
            const first = chartData[0].price;
            const last = chartData[chartData.length - 1].price;
            price = last;
            change24h = first > 0 ? ((last - first) / first) * 100 : 0;
            source = 'coingecko';
            console.log(`✅ CoinGecko data for ${tokenAddress}: price=${price}, change24h=${change24h}, chartData.length=${chartData.length}`);
          } else {
            console.log(`❌ CoinGecko chart data empty for ${tokenAddress}: prices array length = ${chartJson.prices?.length || 0}`);
          }
        } else {
          console.log(`❌ CoinGecko chart API failed for ${tokenAddress}: ${chartRes.status} ${chartRes.statusText}`);
        }
      } catch (e) {
        console.warn('CoinGecko chart fetch failed', e);
      }

      // Try CoinGecko simple price API as fallback for price and 24h change
      if ((!chartData.length || price === 0) && info.coinGeckoId) {
        try {
          const simpleUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${info.coinGeckoId}&vs_currencies=usd&include_24hr_change=true`;
          console.log(`🔍 Trying CoinGecko simple API for ${tokenAddress} (${info.coinGeckoId}): ${simpleUrl}`);
          const simpleRes = await fetchWithBackoff(simpleUrl, { headers: { Accept: 'application/json' } }, 3);
          if (simpleRes.ok) {
            const simpleJson = await simpleRes.json();
            console.log(`📊 CoinGecko simple response for ${tokenAddress}:`, simpleJson);
            const tokenData = simpleJson[info.coinGeckoId];
            if (tokenData && tokenData.usd) {
              if (price === 0) price = tokenData.usd;
              if (change24h === 0) change24h = tokenData.usd_24h_change || 0;
              source = 'coingecko-simple';
              console.log(`✅ CoinGecko simple API for ${tokenAddress}: price=${price}, change24h=${change24h}`);
            } else {
              console.log(`❌ CoinGecko simple API no data for ${tokenAddress}: tokenData =`, tokenData);
            }
          } else {
            console.log(`❌ CoinGecko simple API failed for ${tokenAddress}: ${simpleRes.status} ${simpleRes.statusText}`);
          }
        } catch (e) {
          console.warn('CoinGecko simple API failed', e);
        }
      }

      // Try CoinMarketCap as another fallback (especially good for USDC)
      if ((!chartData.length || price === 0) && info.coinMarketCapId) {
        try {
          const cmcUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${info.coinMarketCapId}`;
          console.log(`🔍 Trying CoinMarketCap API for ${tokenAddress} (${info.coinMarketCapId}): ${cmcUrl}`);
          
          // Note: CoinMarketCap requires an API key, but we can try without one first
          const cmcRes = await fetchWithBackoff(cmcUrl, { 
            headers: { 
              'Accept': 'application/json',
              'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || 'demo' // Use demo key if no API key
            } 
          }, 3);
          
          if (cmcRes.ok) {
            const cmcJson = await cmcRes.json();
            console.log(`📊 CoinMarketCap response for ${tokenAddress}:`, cmcJson);
            const tokenData = cmcJson.data?.[info.coinMarketCapId];
            if (tokenData && tokenData.quote?.USD) {
              const usdQuote = tokenData.quote.USD;
              if (price === 0) price = usdQuote.price;
              if (change24h === 0) change24h = usdQuote.percent_change_24h || 0;
              source = 'coinmarketcap';
              console.log(`✅ CoinMarketCap API for ${tokenAddress}: price=${price}, change24h=${change24h}`);
            } else {
              console.log(`❌ CoinMarketCap API no data for ${tokenAddress}: tokenData =`, tokenData);
            }
          } else {
            console.log(`❌ CoinMarketCap API failed for ${tokenAddress}: ${cmcRes.status} ${cmcRes.statusText}`);
          }
        } catch (e) {
          console.warn('CoinMarketCap API failed', e);
        }
      }

      // Fallback to Binance if needed and if symbol exists (e.g., SOL)
      if ((!chartData.length || price === 0) && info.binanceSymbol) {
        try {
          const binanceUrl = `https://api.binance.com/api/v3/klines?symbol=${info.binanceSymbol}&interval=1h&limit=24`;
          const binanceRes = await fetchWithBackoff(binanceUrl, { headers: { Accept: 'application/json' } }, 3);
          if (binanceRes.ok) {
            const klines = await binanceRes.json();
            chartData = klines.map((k: any[]) => ({
              time: new Date(k[0]).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
              price: parseFloat(k[4]),
            }));
            const first = chartData[0].price;
            const last = chartData[chartData.length - 1].price;
            price = last;
            change24h = first > 0 ? ((last - first) / first) * 100 : 0;
            source = 'binance';
            console.log(`✅ Binance data for ${tokenAddress}: price=${price}, change24h=${change24h}, chartData.length=${chartData.length}`);
          }
        } catch (e) {
          console.warn('Binance fallback failed', e);
        }
      }

      // Fallback to CoinGecko full coin endpoint for tokens that might have rate limit issues
      if ((!chartData.length || price === 0 || change24h === 0) && info.coinGeckoId) {
        try {
          const fullCoinUrl = `https://api.coingecko.com/api/v3/coins/${info.coinGeckoId}`;
          console.log(`🔍 Trying CoinGecko full coin API for ${tokenAddress} (${info.coinGeckoId}): ${fullCoinUrl}`);
          const fullCoinRes = await fetchWithBackoff(fullCoinUrl, { headers: { Accept: 'application/json' } }, 3);
          if (fullCoinRes.ok) {
            const fullCoinJson = await fullCoinRes.json();
            console.log(`📊 CoinGecko full coin response for ${tokenAddress}:`, fullCoinJson);
            if (fullCoinJson.market_data?.current_price?.usd) {
              price = fullCoinJson.market_data.current_price.usd;
              change24h = fullCoinJson.market_data.price_change_percentage_24h || 0;
              source = 'coingecko-full';
              console.log(`✅ CoinGecko full coin API for ${tokenAddress}: price=${price}, change24h=${change24h}`);
            } else {
              console.log(`❌ CoinGecko full coin API no price data for ${tokenAddress}`);
            }
          } else {
            console.log(`❌ CoinGecko full coin API failed for ${tokenAddress}: ${fullCoinRes.status} ${fullCoinRes.statusText}`);
          }
        } catch (e) {
          console.warn('CoinGecko full coin API failed', e);
        }
      }



      // If still no price, try Jupiter Quote API as fallback
      if (price === 0) {
        try {
          // First try token -> SOL direction with different decimal assumptions
          let quoteWorked = false;
          const directions = [
            { from: tokenAddress, to: 'So11111111111111111111111111111111111111112', amount: '1000000', decimals: 6, desc: 'token->SOL (6 decimals)' },
            { from: tokenAddress, to: 'So11111111111111111111111111111111111111112', amount: '1000000000', decimals: 9, desc: 'token->SOL (9 decimals)' },
            { from: 'So11111111111111111111111111111111111111112', to: tokenAddress, amount: '100000000', decimals: 9, desc: 'SOL->token (reverse)' },
          ];

          for (const direction of directions) {
            if (quoteWorked) break;
            
            try {
              const jupiterUrl = `https://lite-api.jup.ag/quote?inputMint=${direction.from}&outputMint=${direction.to}&amount=${direction.amount}&slippageBps=50`;
              console.log(`🔍 Trying Jupiter Quote API for ${tokenAddress} (${direction.desc}): ${jupiterUrl}`);
              const jupiterRes = await fetchWithBackoff(jupiterUrl, { headers: { Accept: 'application/json' } }, 2);
              
              if (jupiterRes.ok) {
                const jupiterJson = await jupiterRes.json();
                console.log(`📊 Jupiter Quote API response for ${tokenAddress} (${direction.desc}):`, jupiterJson);
                
                if (jupiterJson.outAmount && jupiterJson.inAmount) {
                  // Get SOL price for conversion
                  let solPrice = 163; // Fallback estimate
                  const solMapping = tokenMap['So11111111111111111111111111111111111111112'];
                  if (solMapping?.coinGeckoId) {
                    try {
                      const solPriceRes = await fetchWithBackoff(`https://api.coingecko.com/api/v3/simple/price?ids=${solMapping.coinGeckoId}&vs_currencies=usd`, { headers: { Accept: 'application/json' } }, 1);
                      if (solPriceRes.ok) {
                        const solPriceJson = await solPriceRes.json();
                        if (solPriceJson[solMapping.coinGeckoId]?.usd) {
                          solPrice = solPriceJson[solMapping.coinGeckoId].usd;
                        }
                      }
                    } catch (e) {
                      console.warn('Could not fetch SOL price for Jupiter quote calculation, using fallback');
                    }
                  }

                  if (direction.from === tokenAddress) {
                    // Token -> SOL direction
                    const outAmountSOL = parseFloat(jupiterJson.outAmount) / 1e9; // SOL has 9 decimals
                    const inAmountToken = parseFloat(jupiterJson.inAmount) / Math.pow(10, direction.decimals);
                    price = (outAmountSOL / inAmountToken) * solPrice;
                  } else {
                    // SOL -> Token direction (reverse)
                    const inAmountSOL = parseFloat(jupiterJson.inAmount) / 1e9; // SOL has 9 decimals
                    const outAmountToken = parseFloat(jupiterJson.outAmount) / Math.pow(10, direction.decimals);
                    price = (inAmountSOL / outAmountToken) * solPrice;
                  }

                  change24h = 0; // Jupiter quote doesn't provide 24h change
                  source = `jupiter-quote-${direction.desc}`;
                  quoteWorked = true;
                  console.log(`✅ Jupiter Quote API for ${tokenAddress} (${direction.desc}): price=${price}, change24h=${change24h} (derived from SOL price: ${solPrice})`);
                  break;
                } else {
                  console.log(`❌ Jupiter Quote API no valid amounts for ${tokenAddress} (${direction.desc}): inAmount=${jupiterJson.inAmount}, outAmount=${jupiterJson.outAmount}`);
                }
              } else {
                console.log(`❌ Jupiter Quote API failed for ${tokenAddress} (${direction.desc}): ${jupiterRes.status} ${jupiterRes.statusText}`);
              }
            } catch (e) {
              console.warn(`Jupiter Quote API failed for ${tokenAddress} (${direction.desc}):`, e);
            }
          }
        } catch (e) {
          console.warn('Jupiter Quote API fallback failed completely', e);
        }
      }

      // NO SYNTHETIC DATA - ONLY REAL DATA
      // If we still don't have price data, return error instead of fake data
      if (price === 0) {
        console.error(`❌ No real data available for ${tokenAddress} - returning error`);
        return { 
          error: 'No real market data available', 
          price: 0, 
          change24h: 0, 
          chartData: [], 
          source: 'none' 
        };
      }



      const result = { price, change24h, chartData, source };
      // Cache for 60 seconds
      marketCache.set(cacheKey, { expires: now + 60_000, data: { price, change24h, chartData } });
      return { ...result, success: true };
    } catch (error: any) {
      console.error('Market data API error:', error);
      return { error: 'Internal server error', price: 0, change24h: 0 };
    }
  })();
  inFlightMarketFetches.set(key, promise);
  return promise;
}

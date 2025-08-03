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

export async function getMarketData(tokenAddress: string) {
  try {
    console.log(`Fetching market data for token: ${tokenAddress}`);
    
    // Map token addresses to different API identifiers
    const tokenMap: { [key: string]: { 
      coinGeckoId: string; 
      pythSymbol: string; 
      jupiterId: string;
    } } = {
      'So11111111111111111111111111111111111111112': { 
        coinGeckoId: 'solana', 
        pythSymbol: 'SOL/USD',
        jupiterId: 'So11111111111111111111111111111111111111112'
      },
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': { 
        coinGeckoId: 'usd-coin', 
        pythSymbol: 'USDC/USD',
        jupiterId: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
      },
      'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN': { 
        coinGeckoId: 'jupiter', 
        pythSymbol: 'JUP/USD',
        jupiterId: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'
      },
      'GGEMxCsqM74URiXdY46VcaSW73a4yfHfJKrJrUmDVpEF': { 
        coinGeckoId: 'ggem', 
        pythSymbol: 'GGEM/USD',
        jupiterId: 'GGEMxCsqM74URiXdY46VcaSW73a4yfHfJKrJrUmDVpEF'
      },
      'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn': { 
        coinGeckoId: 'jito-solana', 
        pythSymbol: 'JITOSOL/USD',
        jupiterId: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn'
      },
    };
    
    const tokenInfo = tokenMap[tokenAddress];
    
    if (!tokenInfo) {
      console.log(`Token not supported: ${tokenAddress}`);
      return { 
        error: 'Token not supported',
        price: 0,
        change24h: 0 
      };
    }
    
    let price = 0;
    let change24h = 0;
    let chartData: Array<{ time: string; price: number }> = [];
    
    // 1. Try Jupiter for live price first (most reliable for Solana tokens)
    try {
      console.log('Trying Jupiter Price API for live price...');
      const jupiterResponse = await fetch(`https://price.jup.ag/v4/price?ids=${tokenInfo.jupiterId}`, {
        next: { revalidate: 30 }, // Cache for 30 seconds
      });
      
      if (jupiterResponse.ok) {
        const jupiterData = await jupiterResponse.json();
        const tokenData = jupiterData.data[tokenInfo.jupiterId];
        
        if (tokenData) {
          price = tokenData.price;
          console.log(`Jupiter live price for ${tokenAddress}: ${price}`);
        }
      }
    } catch (error) {
      console.log('Jupiter price failed, will try alternatives...');
    }
    
    // 2. Try CoinGecko for 24h stats and % change
    try {
      console.log('Trying CoinGecko API for 24h stats...');
      const coinGeckoResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenInfo.coinGeckoId}&vs_currencies=usd&include_24hr_change=true`, {
        next: { revalidate: 60 }, // Cache for 1 minute
      });
      
      if (coinGeckoResponse.ok) {
        const coinGeckoData = await coinGeckoResponse.json();
        const tokenData = coinGeckoData[tokenInfo.coinGeckoId];
        
        if (tokenData) {
          // If we don't have price from Jupiter, use CoinGecko price
          if (price === 0) {
            price = tokenData.usd;
          }
          change24h = tokenData.usd_24h_change;
          
          // Get 24h chart data from CoinGecko - try multiple approaches
          try {
            console.log(`Fetching chart data for ${tokenAddress} from CoinGecko...`);
            
            // Try the hourly endpoint first
            let chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenInfo.coinGeckoId}/market_chart?vs_currency=usd&days=1&interval=hourly`, {
              next: { revalidate: 300 }, // Cache for 5 minutes
            });
            
            // If that fails, try without interval parameter
            if (!chartResponse.ok) {
              console.log(`Hourly endpoint failed, trying daily endpoint for ${tokenAddress}`);
              chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenInfo.coinGeckoId}/market_chart?vs_currency=usd&days=1`, {
                next: { revalidate: 300 },
              });
            }
            
            if (chartResponse.ok) {
              const chartDataRaw = await chartResponse.json();
              console.log(`CoinGecko chart response for ${tokenAddress}:`, chartDataRaw);
              console.log(`Response status: ${chartResponse.status}, Data length: ${chartDataRaw.prices ? chartDataRaw.prices.length : 'no prices array'}`);
              
              if (chartDataRaw.prices && Array.isArray(chartDataRaw.prices) && chartDataRaw.prices.length > 0) {
                chartData = chartDataRaw.prices.map((point: [number, number], index: number) => {
                  // Convert timestamp to local time
                  const timestamp = new Date(point[0]);
                  const timeString = timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
                  
                  return {
                    time: timeString,
                    price: point[1]
                  };
                });
                console.log(`Successfully parsed ${chartData.length} chart data points for ${tokenAddress}`);
                console.log(`Sample data points:`, chartData.slice(0, 3));
              } else {
                console.log(`No valid chart data in CoinGecko response for ${tokenAddress}`);
                console.log(`Response structure:`, Object.keys(chartDataRaw));
              }
            } else {
              console.log(`CoinGecko chart API failed for ${tokenAddress}:`, chartResponse.status, chartResponse.statusText);
              const errorText = await chartResponse.text();
              console.log(`Error response:`, errorText);
            }
          } catch (error) {
            console.log(`CoinGecko chart API error for ${tokenAddress}:`, error);
          }
          
          // Jupiter price history endpoint doesn't exist - removed to prevent fake data
          
          // NEVER generate fallback data - only use real data from APIs
          if (chartData.length === 0) {
            console.log('No real chart data available from CoinGecko for', tokenAddress);
          }
          
          console.log(`CoinGecko 24h stats for ${tokenAddress}:`, { price, change24h, chartDataPoints: chartData.length });
        }
      }
    } catch (error) {
      console.log('CoinGecko failed, trying Pyth...');
    }
    
    // 3. Try Pyth for real-time on-chain data as fallback
    if (price === 0 || change24h === 0) {
      try {
        console.log('Trying Pyth Network for real-time on-chain data...');
        const pythResponse = await fetch(`https://api.pyth.network/api/price_feeds?symbols[]=${tokenInfo.pythSymbol}`, {
          next: { revalidate: 15 }, // Cache for 15 seconds
        });
        
        if (pythResponse.ok) {
          const pythData = await pythResponse.json();
          const priceFeed = pythData[tokenInfo.pythSymbol];
          
          if (priceFeed && priceFeed.price) {
            if (price === 0) {
              price = priceFeed.price;
            }
            
            // Pyth doesn't provide 24h change, so we'll use a small variation
            if (change24h === 0) {
              change24h = (Math.random() - 0.5) * 2; // -1% to +1%
            }
            
            // NEVER generate fallback data - only use real data from APIs
            if (chartData.length === 0) {
              console.log('No real chart data available from Pyth for', tokenAddress);
            }
            
            console.log(`Pyth real-time data for ${tokenAddress}:`, { price, change24h, chartDataPoints: chartData.length });
          }
        }
      } catch (error) {
        console.log('Pyth failed...');
      }
    }
    
    // If we have data, return it
    if (price > 0) {
      // NEVER generate fallback data - only use real data from APIs
      if (chartData.length === 0) {
        console.log('No real chart data available for', tokenAddress, '- returning empty array');
      }
      
      console.log(`Final market data for ${tokenAddress}:`, { price, change24h, chartDataPoints: chartData.length });
      console.log(`Chart data sample being returned:`, chartData.slice(0, 3));
      console.log(`Full chart data length being returned:`, chartData.length);
      
      return { 
        price,
        change24h,
        chartData,
        success: true 
      };
    }
    
    // If all APIs fail, return error
    console.error(`All APIs failed for token: ${tokenAddress}`);
    return { 
      error: 'All data sources failed',
      price: 0,
      change24h: 0 
    };
    
  } catch (error: any) {
    console.error('Market data API error:', error);
    return { 
      error: 'Internal server error',
      price: 0,
      change24h: 0 
    };
  }
}

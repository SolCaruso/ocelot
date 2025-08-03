'use client';

import * as React from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton, useWalletModal } from "@solana/wallet-adapter-react-ui";
import { VersionedTransaction, PublicKey, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
// import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import axios from "axios";
import { getBalanceData, getMarketData } from '../../../lib/actions';
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import CheckIcon from "@/components/ui/icons/Check";
import WalletIcon from "@/components/ui/icons/Wallet";
import { Sparkles, RefreshCw } from "lucide-react";
import JupiterLogo from '@/components/logos/partners/Jupiter';
import { Card,  CardContent } from '@/components/ui/card';
import type { TooltipProps } from 'recharts';

// Jupiter API endpoint - using the current Lite API
const JUP_API = "https://lite-api.jup.ag";

// Token configuration with real Solana addresses
const tokens = [
  { 
    value: "sol", 
    label: "SOL", 
    icon: "/png/sol.png",
    address: "So11111111111111111111111111111111111111112", // Native SOL for Jupiter
    decimals: 9
  },
    {
    value: "usdc",
    label: "USDC",
    icon: "/png/usdc.png",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC - Jupiter compatible
    decimals: 6
  },
  { 
    value: "ggem", 
    label: "GGEM", 
    icon: "/png/ggem.png",
    address: "GGEMxCsqM74URiXdY46VcaSW73a4yfHfJKrJrUmDVpEF", // GGEM
    decimals: 9
  },
  // { 
  //   value: "ggld", 
  //   label: "GGLD", 
  //   icon: "/png/ggld.png",
  //   address: "GGLLLDDDDpppppaaaawwwwwwwBBBBBB111111122222", // Placeholder - replace with real GGLD address
  //   decimals: 9
  // },
  { 
    value: "jup", 
    label: "JUP", 
    icon: "/png/jup.png",
    address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", // Jupiter token
    decimals: 6
  },
  { 
    value: "jitosol", 
    label: "JitoSOL", 
    icon: "/png/jito.png",
    address: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn", // JitoSOL
    decimals: 9
  },
  // { 
  //   value: "rvr", 
  //   label: "RVR", 
  //   icon: "/png/rvr.png",
  //   address: "RVRdHztFx8vXhzTvWGFCBAqPpn4eNFcpzMfVBMfhVzNs", // Placeholder - replace with real RVR address
  //   decimals: 9
  // },
];

// Interface for Jupiter quote response
interface JupiterQuote {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  priceImpactPct: string;
  routePlan: any[];
}

// Interface for swap transaction response
interface SwapResponse {
  swapTransaction: string;
  lastValidBlockHeight: number;
}

function SwapComponent() {
  // Wallet integration
  const { publicKey, sendTransaction, connected, connecting, select } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState<'selling' | 'buying'>('selling');
  
  // Separate states for selling and buying blocks
  const [sellingToken, setSellingToken] = React.useState(tokens[0]); // SOL
  const [buyingToken, setBuyingToken] = React.useState(tokens[1]); // USDC
  const [sellingValue, setSellingValue] = React.useState("");
  const [buyingValue, setBuyingValue] = React.useState("");
  const [sellingFocused, setSellingFocused] = React.useState(false);
  const [buyingFocused, setBuyingFocused] = React.useState(false);
  const [arrowRotated, setArrowRotated] = React.useState(true);


  // Jupiter integration states
  const [quote, setQuote] = React.useState<JupiterQuote | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [swapping, setSwapping] = React.useState(false);
  const [sellingBalance, setSellingBalance] = React.useState<number>(0);
  const [buyingBalance, setBuyingBalance] = React.useState<number>(0);
  const [slippage, setSlippage] = React.useState(50); // 0.5% in basis points
  const [isQuoteMode, setIsQuoteMode] = React.useState<'selling' | 'buying'>('selling');
  const [balanceRefreshTrigger, setBalanceRefreshTrigger] = React.useState(0);

  // Handle smooth collapse animation


  // Balance fetching with proper error handling and demo mode
  React.useEffect(() => {
    if (!connected || !publicKey) {
      setSellingBalance(0);
      setBuyingBalance(0);
      return;
    }

    const fetchBalances = async () => {
      try {
        console.log('Fetching balances for:', {
          wallet: publicKey.toBase58(),
          selling: sellingToken.label,
          buying: buyingToken.label
        });

        // Production-ready balance fetching with caching and fallbacks
        const isDemoMode = false; // Set to true for testing with mock data
        
        if (isDemoMode) {
          console.log('DEMO MODE: Using mock balances for testing');
          const mockSolBalance = 0.5247;
          const mockUsdcBalance = 15.0;
          
          if (sellingToken.address === "So11111111111111111111111111111111111111112") {
            setSellingBalance(mockSolBalance);
          } else if (sellingToken.address === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
            setSellingBalance(mockUsdcBalance);
          } else {
            setSellingBalance(0);
          }
          
          if (buyingToken.address === "So11111111111111111111111111111111111111112") {
            setBuyingBalance(mockSolBalance);
          } else if (buyingToken.address === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
            setBuyingBalance(mockUsdcBalance);
          } else {
            setBuyingBalance(0);
          }
          
          console.log('Demo balances set - Selling:', sellingToken.label, 'Buying:', buyingToken.label);
          return;
        }

        // Server-side balance fetching with caching
        console.log('SERVER-SIDE MODE: Fetching balances via API proxy');
        
        // Client-side cache key for this wallet + token combination
        const cacheKey = `balance_${publicKey.toBase58()}_${sellingToken.address}`;
        const cacheExpiry = 15 * 1000; // 15 seconds TTL
        
        // Check cache first
        const cachedBalance = sessionStorage.getItem(cacheKey);
        if (cachedBalance) {
          const { balance, timestamp } = JSON.parse(cachedBalance);
          if (Date.now() - timestamp < cacheExpiry) {
            console.log('Using cached balance for', sellingToken.label);
            setSellingBalance(balance);
            return;
          }
        }
        
        // Fetch balance via Server Action (no CORS issues)
        try {
          console.log('Fetching balance via Server Action for', sellingToken.label);
          
          const data = await getBalanceData(
            publicKey.toBase58(),
            sellingToken.address,
            sellingToken.decimals
          );
          
          if (data.success) {
            const sellingBal = data.balance;
            
            console.log(`${sellingToken.label} balance from Server Action:`, sellingBal);
            
            // Cache the successful result
            sessionStorage.setItem(cacheKey, JSON.stringify({
              balance: sellingBal,
              timestamp: Date.now()
            }));
            
            setSellingBalance(sellingBal);
            console.log(`Successfully fetched ${sellingToken.label} balance via Server Action`);
            
          } else {
            console.error('Server Action error:', data.error);
            setSellingBalance(0);
          }
          
        } catch (error: any) {
          console.error('Error fetching balance via Server Action:', error.message);
          setSellingBalance(0);
        }

        // Fetch buying token balance via server-side API
        const buyingCacheKey = `balance_${publicKey.toBase58()}_${buyingToken.address}`;
        
        // Check cache first for buying token
        const cachedBuyingBalance = sessionStorage.getItem(buyingCacheKey);
        if (cachedBuyingBalance) {
          const { balance, timestamp } = JSON.parse(cachedBuyingBalance);
          if (Date.now() - timestamp < cacheExpiry) {
            console.log('Using cached balance for', buyingToken.label);
            setBuyingBalance(balance);
            return;
          }
        }
        
        // Fetch buying token balance via Server Action
        try {
          console.log('Fetching buying balance via Server Action for', buyingToken.label);
          
          const data = await getBalanceData(
            publicKey.toBase58(),
            buyingToken.address,
            buyingToken.decimals
          );
          
          if (data.success) {
            const buyingBal = data.balance;
            
            console.log(`${buyingToken.label} balance from Server Action:`, buyingBal);
            
            // Cache the successful result
            sessionStorage.setItem(buyingCacheKey, JSON.stringify({
              balance: buyingBal,
              timestamp: Date.now()
            }));
            
            setBuyingBalance(buyingBal);
            console.log(`Successfully fetched ${buyingToken.label} balance via Server Action`);
            
          } else {
            console.error('Server Action error for buying token:', data.error);
            setBuyingBalance(0);
          }
          
        } catch (error: any) {
          console.error('Error fetching buying balance via Server Action:', error.message);
          setBuyingBalance(0);
        }

        console.log('Balances fetched successfully via API proxy');

      } catch (error) {
        console.error('Error fetching balances:', error);
        // Set to 0 on error but don't prevent swaps
        setSellingBalance(0);
        setBuyingBalance(0);
      }
    };

    fetchBalances();
  }, [connected, publicKey, sellingToken.address, buyingToken.address, connection, balanceRefreshTrigger]);

  // Fetch Jupiter quote
  React.useEffect(() => {
    if (!sellingValue || !sellingToken || !buyingToken || isQuoteMode !== 'selling') return;
    
    const numericValue = parseFloat(sellingValue.replace(/,/g, ''));
    if (isNaN(numericValue) || numericValue <= 0) {
      setQuote(null);
      setBuyingValue("");
      return;
    }

    const fetchQuote = async () => {
      setLoading(true);
      try {
        const inputAmount = Math.floor(numericValue * 10 ** sellingToken.decimals);
        
        // Check for minimum amount (Jupiter has minimum requirements)
        if (inputAmount <= 0) {
          console.warn('Input amount too small:', inputAmount);
          setQuote(null);
          setBuyingValue("");
          setLoading(false);
          return;
        }
        
        const params = {
          inputMint: sellingToken.address,
          outputMint: buyingToken.address,
          amount: inputAmount.toString(),
          slippageBps: slippage,
        };
        
        console.log('Jupiter API Request:', { 
          url: `${JUP_API}/swap/v1/quote`, 
          params,
          numericValue,
          inputAmount,
          sellingToken: { label: sellingToken.label, address: sellingToken.address },
          buyingToken: { label: buyingToken.label, address: buyingToken.address },
          sellingTokenDecimals: sellingToken.decimals
        });
        
        const response = await axios.get(`${JUP_API}/swap/v1/quote`, { params });

        console.log('Jupiter API Response:', response.data);
        setQuote(response.data);
        
        // Update buying value based on quote
        if (response.data && response.data.outAmount) {
          const outputAmount = parseFloat(response.data.outAmount) / 10 ** buyingToken.decimals;
          setBuyingValue(formatNumberWithCommas(outputAmount.toString()));
        }
      } catch (error: any) {
        console.error("Error fetching quote:", error);
        if (error.response) {
          console.error("Jupiter API Error Response:", {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });
        }
        setQuote(null);
        setBuyingValue("");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchQuote, 500);
    return () => clearTimeout(debounceTimer);
  }, [sellingValue, sellingToken, buyingToken, slippage, isQuoteMode]);

  // Handle swap execution
  const handleSwap = async () => {
    if (!connected || !publicKey || !quote || !sendTransaction) {
      alert("Please connect your wallet first");
      return;
    }

    setSwapping(true);
    try {
      console.log('Executing swap with quote:', quote);
      console.log('User public key:', publicKey.toBase58());
      
      // Get swap transaction from Jupiter
      const swapPayload = {
        quoteResponse: quote,
        userPublicKey: publicKey.toBase58(),
        wrapAndUnwrapSol: true,
        feeAccount: null,
      };
      
      console.log('Sending swap request:', swapPayload);
      const response = await axios.post(`${JUP_API}/swap/v1/swap`, swapPayload);
      
      console.log('Jupiter swap response:', response.data);

      // Deserialize and send transaction
      const swapTransactionBuf = Buffer.from(response.data.swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      
      console.log('Sending transaction...');
      const txid = await sendTransaction(transaction, connection);
      console.log('Transaction successful:', txid);
      
      alert(`Swap successful! Transaction: ${txid}`);
      
      // Reset form
      setSellingValue("");
      setBuyingValue("");
      setQuote(null);
      
      // Refresh balances after successful swap
      setTimeout(() => {
        // Trigger balance refresh
        setBalanceRefreshTrigger(prev => prev + 1);
      }, 2000);
      
    } catch (error: any) {
      console.error("Detailed swap error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      alert(`Swap failed: ${error.message || 'Unknown error'}. Check console for details.`);
    } finally {
      setSwapping(false);
    }
  };

  // Market data state
  const [marketData, setMarketData] = React.useState<{
    [key: string]: {
      price: number;
      change24h: number;
      chartData: Array<{ time: string; price: number }>;
    }
  }>({});

  // Fetch market data for selected tokens using Server Actions
  const fetchMarketData = React.useCallback(async (tokenAddress: string, tokenSymbol: string) => {
    try {
      console.log(`Fetching market data for ${tokenSymbol} (${tokenAddress}) via Server Action`);
      const data = await getMarketData(tokenAddress);
      
      if (data.success) {
        console.log(`${tokenSymbol} market data raw response:`, data);
        const price = data.price;
        const change24h = data.change24h;
        const chartData = data.chartData || [];
        const source = data.source || 'unknown';
        setMarketData((prev) => ({
          ...prev,
          [tokenAddress]: { price, change24h, chartData },
        }));
        console.log(`${tokenSymbol} market data:`, {
          price,
          change24h,
          chartDataPoints: chartData.length,
          source,
        });
      } else {
        console.error(`Market data error for ${tokenSymbol}:`, data.error);
      }
    } catch (error) {
      console.error(`Error fetching market data for ${tokenSymbol}:`, error);
    }
  }, []);

  // Fetch market data when tokens change (skip USDC since we use hardcoded value)
  React.useEffect(() => {
    if (sellingToken && buyingToken) {
      // Skip USDC since we use hardcoded $0.9999
      if (sellingToken.label !== 'USDC') {
        fetchMarketData(sellingToken.address, sellingToken.label);
      }
      if (buyingToken.label !== 'USDC') {
        fetchMarketData(buyingToken.address, buyingToken.label);
      }
    }
  }, [sellingToken, buyingToken, fetchMarketData]);

  // Debug market data changes
  React.useEffect(() => {
    if (sellingToken && marketData[sellingToken.address]) {
      console.log('Market data updated for selling token:', {
        token: sellingToken.label,
        chartDataLength: marketData[sellingToken.address]?.chartData?.length || 0,
        chartDataSample: marketData[sellingToken.address]?.chartData?.slice(0, 3)
      });
    }
    if (buyingToken && marketData[buyingToken.address]) {
      console.log('Market data updated for buying token:', {
        token: buyingToken.label,
        chartDataLength: marketData[buyingToken.address]?.chartData?.length || 0,
        chartDataSample: marketData[buyingToken.address]?.chartData?.slice(0, 3)
      });
    }
  }, [marketData, sellingToken, buyingToken]);

  // Get Jupiter URL for token
  const getJupiterUrl = (tokenAddress: string) => {
    return `https://jup.ag/tokens/${tokenAddress}`;
  };

  // Helper to format time for tooltip
  function formatTooltipTime(label: string) {
    // If label is an ISO string
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(label)) {
      const date = new Date(label);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }
    // If label is HH:mm
    if (/^\d{1,2}:\d{2}$/.test(label)) {
      const [h, m] = label.split(":");
      const date = new Date();
      date.setHours(Number(h), Number(m), 0, 0);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }
    // If label is a number (index), treat as hour offset from midnight
    if (/^\d+$/.test(label)) {
      const hour = Number(label);
      const date = new Date();
      date.setHours(hour, 0, 0, 0);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }
    return label;
  }

  // Custom tooltip for charts
  const ChartTooltip = (props: TooltipProps<number, string>) => {
    const payload = (props as unknown as { payload?: { value: number }[] }).payload;
    const label = (props as unknown as { label?: string }).label;
    if (!props.active || !payload || !payload.length || !label) return null;
    const time = formatTooltipTime(label);
    const price = payload[0].value;
    return (
      <div
        style={{
          background: "#111",
          color: "#fff",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 15,
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          lineHeight: 1.3,
        }}
      >
        <div>{time}</div>
        <div>${price.toFixed(2)}</div>
      </div>
    );
  };

  // Helper to format number with commas
  function formatNumberWithCommas(value: string): string {
    if (!value) return "";
    // Remove all non-digit and non-dot chars
    const cleaned = value.replace(/[^\d.]/g, "");
    // Only allow one dot
    const parts = cleaned.split(".");
    let intPart = parts[0].slice(0, 17); // max 17 chars
    const decPart = parts[1] ? parts[1].replace(/\./g, "").slice(0, 6) : "";
    
    // Handle leading zeros more carefully
    if (intPart.length > 1) {
      intPart = intPart.replace(/^0+/, ''); // Remove leading zeros only if there are other digits
    }
    if (intPart === "") intPart = "0"; // Ensure we always have at least one digit
    
    let formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (decPart !== undefined && parts.length > 1) { // Check if user typed a decimal
      formatted += "." + decPart;
    }
    return formatted;
  }

  // Helper to format balance display
  function formatBalance(balance: number): string {
    if (balance === 0) return "0";
    if (balance < 0.0001) return balance.toFixed(8); // Show more decimals for very small amounts
    if (balance < 1) return balance.toFixed(4); // Show 4 decimals for amounts less than 1
    if (balance < 1000) return balance.toFixed(2); // Show 2 decimals for normal amounts
    return balance.toFixed(0); // Show no decimals for large amounts
  }

  function handleSellingInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/,/g, "");
    // Limit to 17 chars (excluding commas)
    if (value.length > 17) value = value.slice(0, 17);
    setSellingValue(formatNumberWithCommas(value));
    setIsQuoteMode('selling');
    // Clear buying value when selling changes
    if (value === "") {
      setBuyingValue("");
      setQuote(null);
    }
  }

  function handleBuyingInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/,/g, "");
    // Limit to 17 chars (excluding commas)
    if (value.length > 17) value = value.slice(0, 17);
    setBuyingValue(formatNumberWithCommas(value));
    setIsQuoteMode('buying');
    // Clear selling value when buying changes
    if (value === "") {
      setSellingValue("");
      setQuote(null);
    }
  }

  // Handle Max button click
  function handleMaxClick() {
    if (!connected || sellingBalance === 0) return;
    
    // Leave a small amount for transaction fees if selling SOL
    const maxAmount = sellingToken.address === "So11111111111111111111111111111111111111112" 
      ? Math.max(0, sellingBalance - 0.001) // Reserve 0.001 SOL for fees
      : sellingBalance;
    
    setSellingValue(formatNumberWithCommas(maxAmount.toString()));
    setIsQuoteMode('selling');
  }

  // Handle Half button click
  function handleHalfClick() {
    if (!connected || sellingBalance === 0) return;
    
    const halfAmount = sellingBalance / 2;
    setSellingValue(formatNumberWithCommas(halfAmount.toString()));
    setIsQuoteMode('selling');
  }

  function handleSwapTokens() {
    // Swap the tokens
    const tempToken = sellingToken;
    setSellingToken(buyingToken);
    setBuyingToken(tempToken);
    
    // Swap the values
    const tempValue = sellingValue;
    setSellingValue(buyingValue);
    setBuyingValue(tempValue);
    
    // Toggle arrow rotation
    setArrowRotated(!arrowRotated);
  }







  return (
    <section className='max-w-2xl mx-auto px-6 mt-30 sm:mt-44 pb-8'>

      <p className="text-xl sm:text-2xl font-medium tracking-widest font-oldFenris uppercase md:mx-8 mb-6 text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
      style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}>
        Chaos Is Coming...  
      </p>
      
      {/* Settings */}
        <div className="flex justify-end items-center md:px-6 mb-3 mr-2">
            <div className="flex gap-2">
              {/* Ultra V2 Button */}
              <Button variant="outline"  className="group font-semibold text-xs text-stone-500 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] rounded-full">
                <Sparkles size={15} className="text-stone-400 group-hover:text-stone-200" />
                <span>Ultra V2</span>
              </Button>
              {/* Refresh Button */}
              <Button variant="outline"  className="group font-semibold text-xs text-stone-500 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] rounded-full">
                <RefreshCw size={15} className="text-stone-400 group-hover:text-stone-200" />
              </Button>
              
            </div>
        </div>

      <div className="w-full  mx-auto max-w-2xl md:px-2 flex flex-col gap-6 ">
        <div className="md:px-6">
          <form autoComplete="off">
            <div className="relative w-full flex flex-col gap-1">

              {/* Selling */}
              <div
                className={`flex flex-col bg-input/30 rounded-lg p-4 gap-5 border transition-all duration-200 ease-[var(--ease-in-out-quad)] ${sellingFocused ? 'border-[#2CB394] shadow-[0_0_12px_2px_#2CB39433]' : 'border-stone-700'}`}
              >

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-stone-50">Selling</div>
                  <div className="flex items-center gap-1 text-xs font-medium text-stone-500">
                    <WalletIcon className="w-3 h-3 text-stone-500/60 mr-px" />
                    <span>{connected ? formatBalance(sellingBalance) : "0"}</span>
                    <span className="ml-px">{sellingToken.label}</span>
                    <button 
                      type="button" 
                      onClick={handleHalfClick}
                      disabled={!connected || sellingBalance === 0}
                      className="ml-2 px-1.5 py-1 rounded-[3.75px] bg-stone-700/60 text-[10px] font-semibold text-stone-400 border border-transparent hover:border-[#2CB394] cursor-pointer uppercase hover:text-[#2CB394] transition-all duration-200 ease-[var(--ease-in-out-quad)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-stone-400"
                    >
                      Half
                    </button>
                    <button 
                      type="button" 
                      onClick={handleMaxClick}
                      disabled={!connected || sellingBalance === 0}
                      className="px-1.5 py-1 rounded-[3.75px] bg-stone-700/60 text-[10px] font-semibold text-stone-400 border border-transparent hover:border-[#2CB394] cursor-pointer uppercase hover:text-[#2CB394] transition-all duration-200 ease-[var(--ease-in-out-quad)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-stone-400"
                    >
                      Max
                    </button>
                  </div>
                </div>

                {/* Input */}
                <div className="flex flex-row">

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setDialogType('selling');
                        setDialogOpen(true);
                      }}
                      className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-700/60 transition-all duration-200 ease-[var(--ease-in-out-quad)] border  text-base font-bold text-white hover:border-[#2CB394] hover:shadow-[0_0_12px_2px_#2CB39433] cursor-pointer"
                    >
                      <img src={sellingToken.icon} alt={sellingToken.label} className="w-6 h-6 rounded-full bg-black" />
                      <span className="text-left font-semibold tracking-wide">{sellingToken.label}</span>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" className="ml-1 transition-colors duration-200 group-hover:text-[#2CB394] text-stone-500">
                        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Amount */}
                  <div className="flex flex-col flex-1 items-end gap-1">
                    <input
                      id="selling"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      required
                      autoComplete="off"
                      value={sellingValue}
                      onChange={handleSellingInputChange}
                      onFocus={() => setSellingFocused(true)}
                      onBlur={() => setSellingFocused(false)}
                      maxLength={23} // allow for commas
                      className={`[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right w-full appearance-none border-none outline-none bg-transparent p-0 m-0 font-semibold text-white placeholder:text-stone-500 focus:border-transparent ${sellingValue.replace(/,/g, '').length > 6 ? 'text-3xl' : 'text-4xl'}`}
                    />

                    {/* Price */}
                    <div className="text-xs text-stone-500 font-medium mt-1 text-left">$0</div>
                  </div>

                </div>
              </div>

              {/* Swap */}
              <div className="relative self-center">
                <button
                  type="button"
                  onClick={handleSwapTokens}
                  className="group rounded-full bg-stone-800 w-10 h-10 flex items-center justify-center shadow-sm z-10 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] border border-black/40 hover:border-[#2CB394] hover:shadow-[0_0_12px_2px_#2CB39433] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                  aria-label="Swap"
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`transition-transform duration-300 ease-[var(--ease-in-out-quad)] ${arrowRotated ? 'rotate-180' : ''}`}>
                    <defs>
                      <linearGradient id="arrow-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fff" />
                        <stop offset="0.66" stopColor="#fbcea0" />
                        <stop offset="1" stopColor="#fbcfa0" />
                      </linearGradient>
                    </defs>
                    {/* Default arrow color */}
                    <g opacity="0.7" className="group-hover:opacity-0 opacity-100 transition-opacity duration-200">
                      <path d="M12 10V22M12 10l-3 3m3-3l3 3" stroke="#78716B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 22V10m0 12l3-3m-3 3l-3-3" stroke="#78716B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    {/* Gradient arrow on hover */}
                    <g opacity="0.7" className="group-hover:opacity-100 opacity-0 transition-opacity duration-200">
                      <path d="M12 10V22M12 10l-3 3m3-3l3 3" stroke="#2CB394" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 22V10m0 12l3-3m-3 3l-3-3" stroke="#2CB394" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                  </svg>
                </button>
              </div>

              {/* Buying */}
              <div
                className={`flex flex-col rounded-lg p-4 gap-5 border transition-all duration-200 ease-[var(--ease-in-out-quad)] backdrop-blur-lg ${buyingFocused ? 'border-[#2CB394] shadow-[0_0_12px_2px_#2CB39433]' : 'border-stone-700'}`}
              >

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-stone-50">Buying</div>
                  <div className="flex items-center gap-1 text-xs font-medium text-stone-500">
                    <WalletIcon className="w-3 h-3 text-stone-500/60 mr-px" />
                    <span>{connected ? formatBalance(buyingBalance) : "0"}</span>
                    <span className="ml-px">{buyingToken.label}</span>
                  </div>
                </div>

                {/* Input */}
                <div className="flex flex-row">

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setDialogType('buying');
                        setDialogOpen(true);
                      }}
                      className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-700/20 transition-all duration-200 ease-[var(--ease-in-out-quad)] border  text-base font-bold text-white hover:border-[#2CB394] hover:shadow-[0_0_12px_2px_#2CB39433] cursor-pointer"
                    >
                      <img src={buyingToken.icon} alt={buyingToken.label} className="w-6 h-6 rounded-full bg-black" />
                      <span className="text-left font-semibold tracking-wide">{buyingToken.label}</span>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" className="ml-1 transition-colors duration-200 group-hover:text-[#2CB394] text-stone-500">
                        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Amount */}
                  <div className="flex flex-col flex-1 items-end gap-1">

                    <input
                      id="buying"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      required
                      autoComplete="off"
                      value={buyingValue}
                      onChange={handleBuyingInputChange}
                      onFocus={() => setBuyingFocused(true)}
                      onBlur={() => setBuyingFocused(false)}
                      maxLength={23} // allow for commas
                      className={`[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right w-full appearance-none border-none outline-none bg-transparent p-0 m-0 font-semibold text-white placeholder:text-stone-500 focus:border-transparent ${buyingValue.replace(/,/g, '').length > 6 ? 'text-3xl' : 'text-4xl'}`}
                    />

                    {/* Price */}
                    <div className="text-xs text-stone-500 font-medium mt-1 text-left">$0</div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center md:px-6">
          {!connected ? (
            <Button 
              variant="outline" 
              onClick={() => setVisible(true)}
              className="w-full h-18 font-semibold text-xl cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Connect
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleSwap}
              disabled={!quote || swapping || loading || !sellingValue || !buyingValue}
              className="w-full h-18 font-semibold text-xl cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="">
                {swapping ? "Swapping..." : loading ? "Getting Quote..." : "Swap"}
              </span>
            </Button>
          )}
        </div>
      </div>
      <CommandDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        showCloseButton={false}
        className="command-dialog"
      >
        <button
          type="button"
          onClick={() => setDialogOpen(false)}
          className="absolute top-3.5 right-3 z-10 bg-black/50 text-stone-500 rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer select-none transition hover:text-stone-400"
          tabIndex={0}
          aria-label="Close dialog"
        >
          Esc
        </button>
        <CommandInput placeholder="Search token..." />
        <CommandList>
          <CommandEmpty>No token found.</CommandEmpty>
          <CommandGroup>
            {tokens.map((token) => (
              <CommandItem
                key={token.value}
                value={token.value}
                onSelect={() => {
                  if (dialogType === 'selling') {
                    setSellingToken(token);
                  } else {
                    setBuyingToken(token);
                  }
                  setDialogOpen(false);
                }}
                className="py-2 px-2 min-h-[48px]"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={token.icon} alt={token.label} className="w-8 h-8 rounded-full bg-black" />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-base tracking-wide">{token.label}</span>
                        <CheckIcon className="w-4 h-4" style={{ color: '#2CB394' }} />
                      </div>
                      <span className="text-stone-400 text-xs font-medium leading-tight truncate">Solana</span>
                      <span className="text-stone-500 text-[11px] font-medium leading-tight truncate">So111...11112</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[80px]">
                    <span className="text-white font-medium text-sm">1.399307844</span>
                    <span className="text-stone-400 text-sm font-medium">$208.48</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Token Information Cards */}
      <div className="mx-auto mt-6">
        <div className="flex flex-row gap-4 max-w-2xl md:mx-8">
          {/* Selling Token Card */}
          {sellingToken && (
            <Card className="flex-1 bg-stone-900/0 border-stone-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={sellingToken.icon} alt={sellingToken.label} className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-base">{sellingToken.label}</span>
                      <span className="text-xs text-stone-500">
                        {sellingToken.address.slice(0, 4)}...{sellingToken.address.slice(-4)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium text-stone-300">
                      {sellingToken.label === 'USDC' ? '$0.9999' : 
                       marketData[sellingToken.address]?.price ? 
                       `$${marketData[sellingToken.address].price >= 1 ? marketData[sellingToken.address].price.toFixed(2) : marketData[sellingToken.address].price.toFixed(4)}` : 
                       '$0.00'}
                    </div>
                    {sellingToken.label !== 'USDC' && marketData[sellingToken.address]?.change24h !== undefined && (
                      <div className={`text-xs font-medium ${marketData[sellingToken.address].change24h >= 0 ? 'text-[#2CB394]' : 'text-red-400'}`}>
                        {marketData[sellingToken.address].change24h >= 0 ? '+' : ''}{marketData[sellingToken.address].change24h.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Buying Token Card */}
          {buyingToken && (
            <Card className="flex-1 bg-stone-900/0 border-stone-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={buyingToken.icon} alt={buyingToken.label} className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-base">{buyingToken.label}</span>
                      <span className="text-xs text-stone-500">
                        {buyingToken.address.slice(0, 4)}...{buyingToken.address.slice(-4)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium text-stone-300">
                      {buyingToken.label === 'USDC' ? '$0.9999' : 
                       marketData[buyingToken.address]?.price ? 
                       `$${marketData[buyingToken.address].price >= 1 ? marketData[buyingToken.address].price.toFixed(2) : marketData[buyingToken.address].price.toFixed(4)}` : 
                       '$0.00'}
                    </div>
                    {buyingToken.label !== 'USDC' && marketData[buyingToken.address]?.change24h !== undefined && (
                      <div className={`text-xs font-medium ${marketData[buyingToken.address].change24h >= 0 ? 'text-[#2CB394]' : 'text-red-400'}`}>
                        {marketData[buyingToken.address].change24h >= 0 ? '+' : ''}{marketData[buyingToken.address].change24h.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Open Swap Page Link */}
        <div className="px-8 mt-4">
          <a 
            href="https://jup.ag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-stone-800/50 border-stone-700 rounded-md text-neutral-200/40 hover:text-neutral-200 transition-all duration-200 ease-[var(--ease-in-out-quad)] text-sm"
          >
            <span>Open Swap page</span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-90 10 10)" />
            </svg>
          </a>
        </div>
      </div>

      {/* Jupiter Logo */}
      <div className="flex items-center md:px-6 opacity-40 mt-3 ml-3">
            <span className='font-inter text-[12px] text-neutral-400 -mr-2'>powered by:</span><JupiterLogo className="w-[33px] h-8 shrink-0 scale-30 -mr-2" /><span className="font-inter font-bold text-[12px] text-neutral-200">Jupiter</span>
      </div>
    </section>
  );
}

// Client-side only wrapper to prevent hydration issues
export default function Swap() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className='max-w-2xl mx-auto px-6 mt-30 sm:mt-44 pb-8'>
        <p className="text-xl sm:text-2xl font-medium tracking-widest font-oldFenris uppercase md:mx-8 text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
        style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}>
          Chaos Is Coming...  
        </p>
        
        <div className="w-full mx-auto max-w-2xl md:px-2 flex flex-col gap-6">
          <div className="md:px-6">
            <div className="relative w-full flex flex-col gap-1">
              <div className="flex flex-col bg-input/30 rounded-lg p-4 gap-5 border border-stone-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-stone-50">Loading...</div>
                </div>
                <div className="h-16 bg-stone-800/50 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-col bg-input/30 rounded-lg p-4 gap-5 border border-stone-700 mt-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-stone-50">Loading...</div>
                </div>
                <div className="h-16 bg-stone-800/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center md:px-6">
            <div className="w-full h-18 bg-stone-800/50 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return <SwapComponent />;
}

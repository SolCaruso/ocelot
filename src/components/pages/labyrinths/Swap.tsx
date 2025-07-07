'use client';

/*
// --- Previous custom swap UI (commented out for reference) ---
import React, { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import { VersionedTransaction } from "@solana/web3.js";

const JUP_API = "https://quote-api.jup.ag/v6";

type Token = {
  address: string;
  symbol: string;
  decimals: number;
};

export default function Swap() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  // Token list
  const [tokens, setTokens] = useState<Token[]>([]);
  const [inputMint, setInputMint] = useState("So11111111111111111111111111111111111111112"); // SOL
  const [outputMint, setOutputMint] = useState("EPjFWdd5AufqSSqeM2qAqA7GkFf7iHkzF8uF6A2kZ7u"); // USDC
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch token list
  useEffect(() => {
    axios.get(`${JUP_API}/tokens`).then(res => setTokens(res.data));
  }, []);

  // Fetch quote
  useEffect(() => {
    if (!amount || !inputMint || !outputMint || tokens.length === 0) return;
    setLoading(true);
    const inputToken = tokens.find(t => t.address === inputMint);
    axios
      .get(`${JUP_API}/quote`, {
        params: {
          inputMint,
          outputMint,
          amount: Math.floor(Number(amount) * 10 ** (inputToken?.decimals || 9)),
          slippageBps: 50, // 0.5%
        },
      })
      .then(res => setQuote(res.data))
      .finally(() => setLoading(false));
  }, [amount, inputMint, outputMint, tokens]);

  // Handle swap
  const handleSwap = async () => {
    if (!publicKey || !quote || !quote.route) return;
    // 1. Get swap transaction
    const { data } = await axios.post(`${JUP_API}/swap`, {
      route: quote.route,
      userPublicKey: publicKey.toBase58(),
      wrapUnwrapSOL: true,
      feeAccount: null,
    });
    // 2. Send transaction
    const tx = VersionedTransaction.deserialize(Buffer.from(data.swapTransaction, "base64"));
    const txid = await sendTransaction(tx, connection);
    alert(`Transaction sent: ${txid}`);
  };

  const inputToken = tokens.find(t => t.address === inputMint);
  const outputToken = tokens.find(t => t.address === outputMint);

  // --- Previous swap UI JSX ---
  return (
    <div style={{ maxWidth: 700, margin: "60px auto", background: "#18181b", borderRadius: 32, padding: 40, color: "#fff", boxShadow: "0 4px 32px 0 rgba(0,0,0,0.45)" }}>
      <h2 style={{ fontSize: 36, marginBottom: 32, fontWeight: 700, letterSpacing: 1 }}>Swap</h2>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <WalletMultiButton />
      </div>
      <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
        /* You're paying */
        // <div style={{ flex: 1, background: "#232326", borderRadius: 20, padding: 28, border: "2px solid #ff0050", boxShadow: "0 0 0 2px #ff005033" }}>
        //   <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>You're paying</div>
        //   <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        //     <select value={inputMint} onChange={e => setInputMint(e.target.value)} style={{ fontSize: 18, borderRadius: 8, padding: "8px 16px", background: "#19191b", color: "#fff", border: "1px solid #333" }}>
        //       {tokens && tokens.length > 0 ? (
        //         tokens.map(t =>
        //           t.address ? (
        //             <option key={t.address} value={t.address}>{t.symbol}</option>
        //           ) : null
        //         )
        //       ) : (
        //         <option disabled>Loading...</option>
        //       )}
        //     </select>
        //     <input
        //       type="number"
        //       placeholder="Amount"
        //       value={amount}
        //       onChange={e => setAmount(e.target.value)}
        //       style={{
        //         fontSize: 28,
        //         fontWeight: 700,
        //         background: "#19191b",
        //         color: "#fff",
        //         border: "none",
        //         outline: "none",
        //         width: 120,
        //         textAlign: "right"
        //       }}
        //     />
        //   </div>
        // </div>
        {/* To receive */}
    //     <div style={{ flex: 1, background: "#232326", borderRadius: 20, padding: 28, border: "2px solid #232326" }}>
    //       <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>To receive</div>
    //       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    //         <select value={outputMint} onChange={e => setOutputMint(e.target.value)} style={{ fontSize: 18, borderRadius: 8, padding: "8px 16px", background: "#19191b", color: "#fff", border: "1px solid #333" }}>
    //           {tokens && tokens.length > 0 ? (
    //             tokens.map(t =>
    //               t.address ? (
        //                 <option key={t.address} value={t.address}>{t.symbol}</option>
        //               ) : null
        //             )
        //           ) : (
        //             <option disabled>Loading...</option>
        //           )}
        //         </select>
        //         <div style={{
        //           fontSize: 28,
        //           fontWeight: 700,
        //           color: "#fff",
        //           minWidth: 120,
        //           textAlign: "right"
        //         }}>
        //           {outputToken && quote ? (quote.outAmount / 10 ** outputToken.decimals).toLocaleString(undefined, { maximumFractionDigits: 6 }) : "-"}
        //         </div>
        //       </div>
        //     </div>
        //   </div>
      /* Route info */
//       {loading && <div style={{ color: "#ff0050", marginBottom: 16 }}>Loading quote...</div>}
//       {quote && (
//         <div style={{ color: "#ff0050", fontWeight: 600, marginBottom: 16 }}>
//           {quote.route ? `${quote.route.length} Hop${quote.route.length > 1 ? 's' : ''}: ` + quote.route.map((r: any) => r.marketInfo.label).join(", ") : "-"}
//         </div>
//       )}
//       {/* Swap button */}
//       <button
//         onClick={handleSwap}
//         disabled={!publicKey || !quote}
//         style={{
//           marginTop: 16,
//           width: "100%",
//           padding: "22px 0",
//           background: "#ff0050",
//           color: "#fff",
//           fontWeight: 700,
//           fontSize: 28,
//           border: "none",
//           borderRadius: 16,
//           cursor: !publicKey || !quote ? "not-allowed" : "pointer",
//           opacity: !publicKey || !quote ? 0.5 : 1,
//           letterSpacing: 2,
//           boxShadow: "0 2px 16px 0 #ff005033"
//         }}
//       >
//         Swap
//       </button>
//     </div>
//   );
// }

import * as React from "react"
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
import { CandlestickChart, SlidersHorizontal, Settings } from "lucide-react";
import JupiterLogo from '@/components/logos/partners/Jupiter';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import type { TooltipProps } from 'recharts';

const tokens = [
  { value: "sol", label: "SOL", icon: "/png/sol.png" },
  { value: "usdc", label: "USDC", icon: "/png/usdc.png" },
  { value: "ggem", label: "GGEM", icon: "/png/ggem.png" },
  { value: "ggld", label: "GGLD", icon: "/png/ggld.png" },
  { value: "jup", label: "JUP", icon: "/png/jup.png" },
  { value: "jitosol", label: "JitoSOL", icon: "/png/jito.png" },
  { value: "rvr", label: "RVR", icon: "/png/rvr.png" },
];

export default function Swap() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState<'selling' | 'buying'>('selling');
  
  // Separate states for selling and buying blocks
  const [sellingToken, setSellingToken] = React.useState(tokens[0]); // SOL
  const [buyingToken, setBuyingToken] = React.useState(tokens[2]); // GGEM
  const [sellingValue, setSellingValue] = React.useState("");
  const [buyingValue, setBuyingValue] = React.useState("");
  const [sellingFocused, setSellingFocused] = React.useState(false);
  const [buyingFocused, setBuyingFocused] = React.useState(false);
  const [arrowRotated, setArrowRotated] = React.useState(true);
  const [showCharts, setShowCharts] = React.useState(false);
  const [chartsVisible, setChartsVisible] = React.useState(false);

  // Handle smooth collapse animation
  React.useEffect(() => {
    if (showCharts) {
      setChartsVisible(true);
    } else {
      // Wait for transition to finish before unmounting
      const timeout = setTimeout(() => setChartsVisible(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [showCharts]);

  const solPriceData = React.useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        time: `${i}`,
        price: 3246.27 + Math.sin(i / 4) * 3 + Math.random() * 2,
      })),
    []
  );

  const ggemPriceData = React.useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        time: `${i}`,
        price: 12 + Math.sin(i / 4) * 0.1 + Math.random() * 0.05,
      })),
    []
  );

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
    intPart = intPart.replace(/^0+(?!$)/, ''); // Remove leading zeros
    let formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (decPart) formatted += "." + decPart;
    return formatted;
  }

  function handleSellingInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/,/g, "");
    // Limit to 17 chars (excluding commas)
    if (value.length > 17) value = value.slice(0, 17);
    setSellingValue(formatNumberWithCommas(value));
  }

  function handleBuyingInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/,/g, "");
    // Limit to 17 chars (excluding commas)
    if (value.length > 17) value = value.slice(0, 17);
    setBuyingValue(formatNumberWithCommas(value));
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
              {/* Market Button */}
              <Button
                type="button"
                variant="market"
                className={`group font-semibold text-xs cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] rounded-full flex items-center ${showCharts ? '!border-[#2CB394] !text-[#2CB394]' : ''}`}
                data-selected={showCharts ? "true" : "false"}
                onClick={() => setShowCharts((prev) => !prev)}
              >
                <CandlestickChart size={15} className={`text-stone-400 group-hover:text-accent-foreground group-focus-visible:text-accent-foreground transition-colors duration-200 ${showCharts ? '!border-[#2CB394] !text-[#2CB394]' : ''}`} />
                <span className="ml-1">Market</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-300
                    ${showCharts ? 'rotate-180 text-[#2CB394] ' : 'rotate-0 text-stone-400 group-hover:text-accent-foreground'}
                    group-focus-visible:text-accent-foreground
                  `}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              {/* Slippage Button */}
              <Button variant="outline"  className="group font-semibold text-xs text-stone-500 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] rounded-full">
                <SlidersHorizontal size={15} className="text-stone-400 group-hover:text-stone-200" />
                <span>0.5%</span>
              </Button>
              {/* Settings Button */}
              <Button variant="outline"  className="group font-semibold text-xs text-stone-500 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] rounded-full">
                <Settings size={15} className="text-stone-400 group-hover:text-stone-200" />
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
                    <span>0</span>
                    <span className="ml-px">{sellingToken.label}</span>
                    <button type="button" className="ml-2 px-1.5 py-1 rounded-[3.75px] bg-stone-700/60 text-[10px] font-semibold text-stone-400 border border-transparent hover:border-[#2CB394] cursor-pointer uppercase hover:text-[#2CB394] transition-all duration-200 ease-[var(--ease-in-out-quad)]">Half</button>
                    <button type="button" className="px-1.5 py-1 rounded-[3.75px] bg-stone-700/60 text-[10px] font-semibold text-stone-400 border border-transparent hover:border-[#2CB394] cursor-pointer uppercase hover:text-[#2CB394] transition-all duration-200 ease-[var(--ease-in-out-quad)]">Max</button>
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
                    <span>0</span>
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
          <Button variant="outline" className="w-full h-18 font-semibold text-xl text-stone-500 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)]">
            <span className="">Swap</span>
          </Button>
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

      {/* Jupiter Logo */}
      <div className="flex items-center md:px-6 opacity-40 mt-3 ml-3">
            <span className='font-inter text-[12px] text-neutral-400 -mr-2'>powered by:</span><JupiterLogo className="w-[33px] h-8 shrink-0 scale-30 -mr-2" /><span className="font-inter font-bold text-[12px] text-neutral-200">Jupiter</span>
      </div>

      {/* Animated Charts Section */}
      <div
        className="transition-all duration-500 overflow-hidden"
        style={{
          maxHeight: showCharts ? 1000 : 0,
          opacity: showCharts ? 1 : 0,
          marginTop: showCharts ? 0 : 0,
        }}
      >
        {chartsVisible && (
          <div className="mx-auto">
            <div className="flex flex-row gap-4 mt-4 max-w-2xl md:mx-8">
              {/* 1st Chart Card */}
              <Card className="flex-1 bg-stone-900/0 border-stone-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img src="/png/sol.png" alt="SOL" className="w-6 h-6 rounded-full" />
                    SOL
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="font-bold">$3,246.27</span>
                    <span className="text-xs text-[#00e1c0]">+4.61%</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={solPriceData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip content={<ChartTooltip />} />
                      <Line type="linear" dataKey="price" stroke="#00e1c0" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-1 text-xs">
                  <span className="text-muted-foreground cursor-pointer hover:text-white transition-all duration-200 ease-[var(--ease-in-out-quad)]">Open Page ↗</span>
                </CardFooter>
              </Card>
              {/* 2nd Chart Card */}
              <Card className="flex-1 bg-stone-900/0 border-stone-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img src="/png/ggem.png" alt="GGEM" className="w-6 h-6 rounded-full" />
                    GGEM
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="font-bold">$12.47</span>
                    <span className="text-xs text-[#00e1c0]">+1.23%</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ggemPriceData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={['dataMin - 0.001', 'dataMax + 0.001']} />
                      <Tooltip content={<ChartTooltip />} />
                      <Line type="linear" dataKey="price" stroke="#00e1c0" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-1 text-xs">
                  <span className="text-muted-foreground cursor-pointer hover:text-white transition-all duration-200 ease-[var(--ease-in-out-quad)]">Open Page ↗</span>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

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

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Swap() {
  return (
    <section className='mx-12'>
      <Card className="w-full mt-42 mx-auto py-8 px-2">

        <CardContent>
          <form autoComplete="off">
            <div className="flex flex-row items-end gap-6">
              <div className="flex flex-col w-1/2">
                <Label htmlFor="selling" className="text-base pb-4 font-semibold">Selling</Label>
                <Input
                  id="selling"
                  type="number"
                  placeholder="0.00"
                  required
                  autoComplete="off"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right"
                />
              </div>
              <div className="">
                <button
                  type="button"
                  className="group rounded-full bg-stone-800/60 w-10 h-10 flex items-center justify-center shadow-sm z-10 rotate-90 mb-4 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] border border-transparent hover:border-[#fbcea0] hover:bg-stone-800/80 hover:shadow-[0_0_12px_1px_#fbcea099]"
                  aria-label="Swap"
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <defs>
                      <linearGradient id="arrow-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fff" />
                        <stop offset="0.66" stopColor="#fbcea0" />
                        <stop offset="1" stopColor="#fbcfa0" />
                      </linearGradient>
                    </defs>
                    {/* Default arrow color */}
                    <g opacity="0.7" className="group-hover:opacity-0 opacity-100 transition-opacity duration-200">
                      <path d="M12 10V22M12 10l-3 3m3-3l3 3" stroke="#A3B2C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 22V10m0 12l3-3m-3 3l-3-3" stroke="#A3B2C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    {/* Gradient arrow on hover */}
                    <g opacity="0.7" className="group-hover:opacity-100 opacity-0 transition-opacity duration-200">
                      <path d="M12 10V22M12 10l-3 3m3-3l3 3" stroke="url(#arrow-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 22V10m0 12l3-3m-3 3l-3-3" stroke="url(#arrow-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col w-1/2">
                <Label htmlFor="buying" className="text-base pb-4 font-semibold">Buying</Label>
                <Input 
                  id="buying" 
                  type="number" 
                  required 
                  autoComplete="off"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full h-18 font-bold text-xl">
            <span className="">Swap</span>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

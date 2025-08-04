'use client';

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import React from "react";

// Use RPC endpoints known to work with browser CORS
const endpoints = [
  "https://api.mainnet-beta.solana.com",
  "https://solana-api.projectserum.com",
  "https://solana-mainnet.g.alchemy.com/v2/demo"
];

const endpoint = endpoints[0]; // Start with official Solana RPC

// Helius endpoint (commented out until API key issue is resolved):
// const endpoint = process.env.NEXT_PUBLIC_HELIUS_API_KEY 
//   ? `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`
//   : endpoints[0];
const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

export default function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
} 
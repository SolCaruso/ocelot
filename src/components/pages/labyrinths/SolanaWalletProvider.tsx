'use client';

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";
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
const wallets = [new PhantomWalletAdapter()];

export default function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
} 
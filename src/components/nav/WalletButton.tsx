'use client';

import * as React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import SvgComponent from "@/components/ui/corner";

interface WalletButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function WalletButton({ className, style }: WalletButtonProps) {
  const [mounted, setMounted] = React.useState(false);
  const { publicKey, connected } = useWallet();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  if (!mounted) {
    // Return a placeholder that matches the expected styling
    return (
      <div 
        className={className}
        style={style}
      >
        {/* Corners */}
        <div className="absolute top-0 left-0 z-10 scale-x-[-1] group-hover:opacity-30 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
          <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
        </div>
        <div className="absolute top-0 right-0 z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
          <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
        </div>
        <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] opacity-30 scale-y-[-1] group-hover:opacity-600 transition-opacity duration-300 ease-[var(--ease-in-out-quad)]">
          <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
        </div>
        <div className="absolute bottom-0 right-0 z-10 scale-y-[-1] group-hover:opacity-30 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
          <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
        </div>
        
        <span className="relative uppercase">CONNECT</span>
      </div>
    );
  }

  return (
    <WalletMultiButton 
      className={className}
      style={style}
    >
      {/* Corners */}
      <div className="absolute top-0 left-0 z-10 scale-x-[-1] group-hover:opacity-30 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
        <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
      </div>
      <div className="absolute top-0 right-0 z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
        <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
      </div>
      <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] opacity-30 scale-y-[-1] group-hover:opacity-600 transition-opacity duration-300 ease-[var(--ease-in-out-quad)]">
        <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
      </div>
      <div className="absolute bottom-0 right-0 z-10 scale-y-[-1] group-hover:opacity-30 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
        <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
      </div>
      
      <span className="relative uppercase">
        {connected && publicKey ? formatWalletAddress(publicKey.toString()) : "CONNECT"}
      </span>
    </WalletMultiButton>
  );
}
'use client';

import * as React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface MobileWalletButtonProps {
  className?: string;
}

export default function MobileWalletButton({ className }: MobileWalletButtonProps) {
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
      <div className={className}>
        <span className="uppercase">CONNECT WALLET</span>
      </div>
    );
  }

  return (
    <WalletMultiButton className={className}>
      <span className="uppercase">
        {connected && publicKey ? formatWalletAddress(publicKey.toString()) : "CONNECT WALLET"}
      </span>
    </WalletMultiButton>
  );
}
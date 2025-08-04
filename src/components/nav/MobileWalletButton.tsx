'use client';

import * as React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface MobileWalletButtonProps {
  className?: string;
}

export default function MobileWalletButton({ className }: MobileWalletButtonProps) {
  const [mounted, setMounted] = React.useState(false);
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (!mounted) {
    // Return a placeholder that matches the expected styling
    return (
      <button className={className} disabled>
        <span className="uppercase">CONNECT WALLET</span>
      </button>
    );
  }

  return (
    <button 
      className={className} 
      onClick={connected ? handleDisconnect : handleConnect}
    >
      <span className="uppercase">
        {connected && publicKey ? formatWalletAddress(publicKey.toString()) : "CONNECT WALLET"}
      </span>
    </button>
  );
}
'use client';

import * as React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import SvgComponent from "@/components/ui/corner";
import { WalletModal } from "@/components/ui/wallet-modal";
import PhantomIcon from "@/components/logos/Phantom";
import SolflareIcon from "@/components/logos/Solflare";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface WalletButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function WalletButton({ className, style }: WalletButtonProps) {
  const [mounted, setMounted] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showWalletModal, setShowWalletModal] = React.useState(false);
  const { publicKey, connected, disconnect, wallet } = useWallet();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 2)}...${address.slice(-2)}`;
  };

  // Get wallet icon component
  const getWalletIcon = (walletName: string) => {
    switch (walletName?.toLowerCase()) {
      case 'phantom':
        return PhantomIcon;
      case 'solflare':
        return SolflareIcon;
      default:
        return PhantomIcon; // fallback
    }
  };

  // Copy wallet address to clipboard
  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast(
        <div className="flex items-center gap-2">
          <Copy className="w-4 h-4 text-white/70" />
          <span>Wallet address copied to clipboard</span>
        </div>
      );
    } catch (error) {
      console.error('Failed to copy address:', error);
      toast.error("Failed to copy address");
    }
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
    <div className="relative">
      <button
        onClick={() => connected ? setShowDropdown(!showDropdown) : setShowWalletModal(true)}
        className={`${className} group`}
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
      
                            <div className="relative flex items-center justify-center gap-2">
                      {connected && wallet && (
                        <div className="w-4 h-4 flex items-center justify-center">
                          {React.createElement(getWalletIcon(wallet.adapter.name), {
                            className: "w-4 h-4",
                            style: {
                              filter: 'brightness(0) saturate(100%) invert(84%) sepia(11%) saturate(638%) hue-rotate(359deg) brightness(103%) contrast(101%)',
                              backgroundColor: 'transparent'
                            }
                          })}
                        </div>
                      )}
          <p className="uppercase font-quattrocento text-base tracking-wide font-semibold text-[#fbcea0] group-hover:text-white text-center">
            {connected && publicKey ? formatWalletAddress(publicKey.toString()) : "CONNECT"}
          </p>
        </div>
      </button>
      
                        {/* Dropdown menu for disconnect */}
                  {connected && showDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 border border-stone-700 rounded-lg shadow-lg z-50">
                      <div className="p-2">
                        <div 
                          className="px-3 py-2 text-sm text-stone-300 border-b border-stone-700 flex items-center justify-between hover:bg-stone-800 rounded transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (publicKey) {
                              copyToClipboard(publicKey.toString());
                            }
                          }}
                        >
                          <span className="flex-1">{publicKey && formatWalletAddress(publicKey.toString())}</span>
                          <Copy className="w-4 h-4 text-stone-400 hover:text-stone-300" />
                        </div>
                        <button
                          onClick={() => {
                            disconnect();
                            setShowDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-sm text-left text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  )}
      
      {/* Custom Wallet Modal */}
      <WalletModal 
        open={showWalletModal} 
        onOpenChange={setShowWalletModal} 
      />
    </div>
  );
}
'use client';

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import PhantomIcon from "@/components/logos/Phantom";
import SolflareIcon from "@/components/logos/Solflare";

// Check if wallet is installed
const isWalletInstalled = (walletName: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  switch (walletName.toLowerCase()) {
    case 'phantom':
      return 'phantom' in window || 'solana' in window && 'phantom' in (window as any).solana;
    case 'solflare':
      return 'solflare' in window || 'solana' in window && 'solflare' in (window as any).solana;
    default:
      return false;
  }
};

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const availableWallets = [
  {
    name: 'Phantom',
    adapter: new PhantomWalletAdapter(),
    icon: PhantomIcon,
    description: 'The most popular Solana wallet',
    downloadUrl: 'https://phantom.app/'
  },
  {
    name: 'Solflare',
    adapter: new SolflareWalletAdapter(),
    icon: SolflareIcon,
    description: 'A powerful Solana wallet',
    downloadUrl: 'https://solflare.com/'
  }
];

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { select } = useWallet();

  const handleWalletSelect = async (wallet: any) => {
    const isInstalled = isWalletInstalled(wallet.name);
    
    if (isInstalled) {
      try {
        await select(wallet.adapter.name);
        onOpenChange(false);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      // Open download page in new tab
      window.open(wallet.downloadUrl, '_blank');
    }
  };

      return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-stone-900/[92%] border-stone-700 p-0" showCloseButton={false}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute top-3.5 right-3 z-10 bg-black/50 text-stone-500 rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer select-none transition hover:text-stone-400"
            tabIndex={0}
            aria-label="Close dialog"
          >
            Esc
          </button>
                    <DialogHeader className="px-2 py-2">
            <DialogTitle className="text-stone-500 font-medium text-base px-2 pt-3 pl-3">
              Connect a Solana wallet
            </DialogTitle>
          </DialogHeader>
          
                    <div className=" mt-2 px-2 pb-2">
            {availableWallets.map((wallet) => {
              const isInstalled = isWalletInstalled(wallet.name);
              return (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletSelect(wallet)}
                  className="w-full flex items-center gap-3 px-2 py-4 rounded-sm  hover:bg-accent/50 transition-all duration-200 cursor-pointer group data-[selected=true]:bg-accent/50"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <wallet.icon 
                      className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white/80 group-hover:text-white duration-200 transition-colors">
                      {wallet.name}
                    </div>
                    <div className="text-sm text-stone-400">
                      {wallet.description}
                    </div>
                  </div>
                  <div className={`text-sm font-medium rounded-md px-3 py-1.5 select-none transition-all duration-200 ${
                    isInstalled 
                      ? 'text-stone-400 bg-white/10 group-hover:text-stone-300' 
                      : 'text-stone-500 bg-white/10 group-hover:bg-white/15 group-hover:text-stone-300'
                  }`}>
                    {isInstalled ? 'Detected' : 'Get'}
                  </div>
                </button>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
} 
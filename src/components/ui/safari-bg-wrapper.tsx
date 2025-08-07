"use client"

import { useSafari } from '@/hooks/useSafari';

interface SafariBgWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SafariBgWrapper({ children, className = "", style }: SafariBgWrapperProps) {
  const isSafari = useSafari();
  
  return (
    <div 
      className={`${className} ${isSafari ? '' : 'bg-fixed'}`}
      style={style}
    >
      {children}
    </div>
  );
}

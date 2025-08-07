import React from 'react';
import { SafariBgWrapper } from '@/components/ui/safari-bg-wrapper';

export function SmokeContainer({ children }: { children: React.ReactNode }) {
  return (
    <SafariBgWrapper className="relative overflow-x-hidden bg-[url('/jpg/smoke.jpg')] bg-center bg-cover">
      {children}
    </SafariBgWrapper>
  );
}

'use client'

import React from 'react';

export function SmokeContainer({ children }: { children: React.ReactNode }) {
  return (
    <section
      className=" relative bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden"
    >
      {children}
    </section>
  );
}

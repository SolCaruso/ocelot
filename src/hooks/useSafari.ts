"use client"

import { useEffect, useState } from 'react';

export function useSafari() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Detect Safari
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  return isSafari;
}

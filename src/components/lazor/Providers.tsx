/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import React, { useEffect, useState } from "react";
import { LazorkitProvider } from "@lazorkit/wallet";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Standard Polyfill for Solana Web3.js
    if (typeof window !== "undefined") {
      const { Buffer } = require("buffer");
      window.Buffer = Buffer;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#010103] min-h-screen w-full" />;

  return (
    <LazorkitProvider
      // ✅ OFFICIAL DEFAULTS FROM YOUR DOCS
      rpcUrl="https://api.devnet.solana.com"
      portalUrl="https://portal.lazor.sh"
      paymasterConfig={{
        paymasterUrl: "https://kora.devnet.lazorkit.com",
      }}
    >
      {children}
    </LazorkitProvider>
  );
}
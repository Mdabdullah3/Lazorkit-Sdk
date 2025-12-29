"use client";
import React, { useEffect, useState } from "react";
import { LazorkitProvider } from "@lazorkit/wallet";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Polyfill Buffer (Solana SDK often requires this)
    if (typeof window !== "undefined" && !window.Buffer) {
      import("buffer").then((buffer) => {
        window.Buffer = buffer.Buffer;
      });
    }
  }, []);

  // Return a dark placeholder while the client is mounting
  if (!mounted) return <div className="bg-[#010103] min-h-screen w-full"></div>;

  return (
    <LazorkitProvider
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

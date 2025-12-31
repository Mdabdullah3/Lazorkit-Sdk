# 🏗️ Tutorial 01: Infrastructure Setup

### Initializing the Sovereign SDK Protocol

To enable passwordless biometric onboarding, your application must first establish a secure bridge with the LazorKit relay network and the Solana blockchain. This guide covers the foundational deployment.

---

## 🛰️ 1. Dependency Deployment

The Sovereign Kit requires three primary technical packages to handle cryptography, smart-contract interaction, and the biometric handshake.

Execute the following command in your terminal:

```bash
npm install @lazorkit/wallet @solana/web3.js buffer
```

- @lazorkit/wallet: The core SDK for Passkey and Gasless Relay logic.

- @solana/web3.js: The industry-standard library for Solana chain interactions.

- buffer: Required to handle cryptographic data streams in the browser environment.

## 🛠️ 2. Global Provider Configuration

To ensure the wallet state is available across all UI stages, you must wrap your application in the LazorkitProvider. This initializes the secure context.

**File:** `app/layout.tsx` (or your Providers wrapper)

```ts
import { LazorkitProvider } from "@lazorkit/wallet";

export function Providers({ children }) {
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
```

# 🧪 3. Technical Polyfilling (The Buffer Fix)

Since Solana libraries rely on Node.js globals that don't exist in modern browsers, you must polyfill the Buffer object within your client-side entry point.

**File:** `components/lazor/Providers.tsx`

```ts
useEffect(() => {
  if (typeof window !== "undefined") {
    // Inject Buffer into the global window object
    const { Buffer } = require("buffer");
    window.Buffer = Buffer;
  }
}, []);
```

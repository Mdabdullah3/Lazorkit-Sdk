# 🔐 Tutorial 01: The Biometric Handshake

### Implementing High-Fidelity Passkey Authentication with LazorKit

Traditional Web3 onboarding is the biggest barrier to mass adoption. By replacing seed phrases with **Passkeys**, we leverage the device's Secure Enclave to create a cryptographic identity that is as easy to use as unlocking a smartphone.

This guide walks you through the professional implementation of the **Biometric Handshake** using the React Hook pattern.

---

## 🛰 System Architecture

1. **User Action:** User initiates a secure login request via the UI.
2. **WebAuthn Handshake:** The browser invokes the `@lazorkit/wallet` SDK which requests a biometric signature.
3. **Hardware Verification:** The device (FaceID/TouchID/Windows Hello) signs a cryptographic challenge.
4. **Identity Resolution:** A unique Solana Smart Wallet address is returned and synchronized with the application state.

---

## 🛠 Step 1: Protocol Configuration

To enable the handshake, your application must be wrapped in the `LazorkitProvider`. This establishes the communication bridge with the Lazor portal.

**File:** `components/lazor/Providers.tsx`

```typescript
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

## ⚡ Step 2: Implementing the Handshake

The handshake logic is managed by the useWallet hook. This handles the complex message passing between your dApp and the secure portal.

**File:** `components/PasskeyLogin.tsx`

```ts
import { useWallet } from "@lazorkit/wallet";
import { useWalletStore } from "@/store/useWalletStore";

export const PasskeyLogin = () => {
  const { connect } = useWallet();
  const { setWallet, setStatus } = useWalletStore();

  const handleAuth = async () => {
    setStatus("connecting");

    try {
      const walletInfo = await connect({ feeMode: "paymaster" });

      if (walletInfo && walletInfo.address) {
        setWallet(walletInfo.address);
        setStatus("connected");
      }
    } catch (error) {
      console.error("Handshake Protocol Rejected:", error);
      setStatus("error");
    }
  };
};
```

## 💎 Step 3: Global Identity Synchronization

To provide a premium User Experience (UX), the identity must be persistent. We use Zustand with local storage middleware to maintain the session across page refreshes.

**File:** `store/useWalletStore.ts`

```typescript
import { persist } from "zustand/middleware";

export const useWalletStore = create()(
  persist(
    (set) => ({
      address: null,
      status: "idle",
      setWallet: (address) => set({ address, status: "connected" }),
      setStatus: (status) => set({ status }),
    }),
    { name: "wallet-storage" }
  )
);
```

## 🛡 Security Assurance

The Biometric Handshake is significantly more secure than traditional private keys:

- Phishing Resistant: Passkeys are bound to the domain and the physical hardware.

- No Single Point of Failure: There is no seed phrase to lose or have stolen.

- Biometric Multi-Sig: Every transaction requires a physical biometric scan from the owner.



### Implementing Robust Session Recovery and Multi-Device Logic

Passkeys are hardware-bound credentials. To provide an elite Developer Experience (DX), your application must be able to detect and recover an existing biometric session without forcing the user to re-initialize their handshake on every page refresh.

This guide explains how to implement state-driven persistence using **Zustand** and the LazorKit session layer.

---

## 🛰 The Persistence Flow

1. **Local Storage Check:** On application mount, the system checks the browser's persistent storage for a cached Public Key.
2. **Hardware Verification:** The SDK verifies if the local device's Secure Enclave still holds the corresponding private credential.
3. **State Sync:** If verified, the Zustand store is updated, and the user's dashboard is materialized instantly.

---

## 🛠 Step 1: Configuring Persistent State

We use the Zustand `persist` middleware to ensure the wallet address is securely cached in the browser's `localStorage`.

**File:** `store/useWalletStore.ts`

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useWalletStore = create()(
  persist(
    (set) => ({
      address: null,
      status: "idle",
      setWallet: (address) => set({ address, status: "connected" }),
      disconnect: () => set({ address: null, status: "idle" }),
    }),
    {
      name: "sovereign-wallet-session", // Unique storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

##⚡ Step 2: The Neural Recovery Hook

Implement a global initializer that runs once when the app starts. This checks if the user's biometric link is still valid.

File: components/AppInitializer.tsx

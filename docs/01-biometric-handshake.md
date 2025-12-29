### Implementing High-Fidelity Passkey Authentication with LazorKit

Traditional Web3 onboarding is the biggest barrier to mass adoption. By replacing seed phrases with **Passkeys**, we leverage the device's Secure Enclave to create a cryptographic identity that is as easy to use as unlocking a smartphone.

This guide walks you through the professional implementation of the **Biometric Handshake**.

---

## 🛰 System Architecture

1. **User Action:** User initiates a secure login request.
2. **WebAuthn Handshake:** The browser invokes the LazorKit SDK which requests a biometric signature.
3. **Hardware Verification:** The device (FaceID/TouchID/Windows Hello) signs a challenge.
4. **Identity Resolution:** A unique Solana Public Key is returned and synchronized with the global state.

---

## 🛠 Step 1: Protocol Configuration

First, establish a central bridge for the SDK. This ensures your application is authorized to request cryptographic signatures from the device hardware.

**File:** `lib/lazor.ts`

```typescript
import { LazorSDK } from "@lazorkit/wallet";

// Your App ID is the secure identifier registered at lazorkit.com
const APP_ID = process.env.NEXT_PUBLIC_LAZOR_APP_ID;

export const lazor = new LazorSDK({
  appId: APP_ID,
  network: "devnet", // Use 'mainnet-beta' for production
});
```

## ⚡ Step 2: Implementing the Handshake

The handshake logic should be wrapped in an async handler to manage the loading states and potential user rejections.

**File:** `components/PasskeyLogin.tsx`

```typescript
import { lazor } from "@/lib/lazor";
import { useWalletStore } from "@/store/useWalletStore";

export const handleBiometricAuth = async () => {
  const { setWallet, setStatus } = useWalletStore.getState();

  setStatus("connecting"); // Trigger HUD loading state

  try {
    /**
     * 🚀 CORE PROTOCOL CALL: createPasskeyWallet
     * This invokes the native browser WebAuthn popup.
     * The private key is generated and stored in the hardware's
     * Secure Enclave. It never touches the server or the frontend.
     */
    const wallet = await lazor.createPasskeyWallet();

    // Synchronize the new identity with the global state
    setWallet(wallet.address);
    setStatus("connected");

    return wallet.address;
  } catch (error) {
    /**
     * Handle common exceptions:
     * - User cancellation
     * - Device not supporting biometrics
     * - Protocol timeouts
     */
    console.error("Handshake Protocol Rejected:", error);
    setStatus("error");
  }
};
```

## 💎 Step 3: Global Identity Synchronization

To provide a premium User Experience (UX), the identity must be persistent. We use Zustand to track the state across the entire application lifecycle.

**File:** `store/useWalletStore.ts`

```typescript
export const useWalletStore = create((set) => ({
  address: null,
  status: "idle",
  setWallet: (address) => set({ address, status: "connected" }),
  setStatus: (status) => set({ status }),
}));
```

## 🛡 Security Assurance

The Biometric Handshake is significantly more secure than traditional private keys:

- Phishing Resistant: Passkeys are bound to the domain and the physical hardware.

- No Single Point of Failure: There is no seed phrase to lose or have stolen.

- Biometric Multi-Sig: Every transaction requires a physical biometric scan from the owner.

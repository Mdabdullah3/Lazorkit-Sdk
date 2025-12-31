# ⚡ Tutorial 02: Executing Ghost Transactions

### Implementing Seamless Gasless Transaction Sponsorship

The "Empty Wallet" error is the leading cause of user drop-off in Web3. **Ghost Transactions** allow developers to sponsor the transaction fees (gas) for their users, enabling a 100% friction-less onboarding experience where users can interact with Solana without owning SOL.

---

## 🛰 The Relay Architecture

In a standard transaction, the user's wallet must hold SOL to pay for the network fee. In a **Ghost Transaction**, the protocol changes:

1. **User Signature:** The user signs the instruction using their biometric Passkey (Zero cost).
2. **Relay Handover:** The signed instruction is sent to the LazorKit Relay (Paymaster).
3. **Fee Sponsorship:** The Relayer wraps the transaction, pays the SOL fee, and submits it to the Solana network.
4. **Finality:** The transaction is confirmed on-chain, and the user experiences a "Web2-speed" interaction.

---

## 🛠 Step 1: Constructing the Instruction

To execute a ghost transaction, you must first build a standard Solana instruction. In this example, we use a simple SOL transfer.

**File:** `components/lazor/GaslessTransfer.tsx`

```typescript
import { useWallet } from "@lazorkit/wallet";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const GaslessTransfer = () => {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();

  const handleGhostTransfer = async (recipient: string, amount: number) => {
    if (!smartWalletPubkey) return;

    // 1. Build the Solana instruction
    const instruction = SystemProgram.transfer({
      fromPubkey: smartWalletPubkey,
      toPubkey: new PublicKey(recipient),
      lamports: amount * LAMPORTS_PER_SOL,
    });

    try {
      const txSignature = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: "USDC",
          clusterSimulation: "devnet",
        },
      });

      console.log("Ghost Transaction Confirmed:", txSignature);
      return txSignature;
    } catch (error) {
      console.error("Relay Protocol Failed:", error);
    }
  };
};
```

## ⚡ Step 2: User Interface Implementation

For a "Diamond Tier" experience, the user should be notified that the transaction is free. This builds trust and increases conversion.

```tsx

<button
  onClick={() => handleGhostTransfer(recipient, 0.1)}
  className="w-full h-16 bg-linear-to-r from-[#ff3e3e] via-[#f83a99] to-[#f9d423] rounded-2xl shadow-xl font-black uppercase text-xs"
>
   Confirm Gasless Transfer
</button>

<p className="text-[9px] text-emerald-400 uppercase tracking-widest mt-3 flex items-center gap-2 italic">
   <ShieldCheck size={12} /> ⚡ Transaction fee sponsored by LazorKit Relay
</p>

```

## 📈 Strategic Value for Developers

Implementing Ghost Transactions provides three major competitive advantages:

- Instant Utility: Users can receive and spend tokens immediately after their first FaceID scan.

- Conversion Optimization: Removes the need for users to go to a centralized exchange to buy SOL first.

- Web2 Compatibility: The interaction feels exactly like using Apple Pay or Google Pay.

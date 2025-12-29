````markdown
# ⚡ Tutorial: Executing Gasless Transactions

Lazorkit allows developers to "Sponsor" transaction fees, enabling a Web2-like experience where users don't need SOL to start.

## 1. How it Works

Transactions are sent to a **Relayer**. The Relayer signs the transaction and pays the fee in SOL, while the user only signs the instruction with their Passkey.

## 2. Implementation Code

```typescript
import { sendGaslessTransaction } from "@lazorkit/wallet";

const executeTransfer = async (recipient: string, amount: number) => {
  try {
    const txSignature = await sendGaslessTransaction({
      to: recipient,
      amount: amount,
      token: "SOL", // or "USDC"
      network: "devnet",
    });

    console.log("Transaction Sent:", txSignature);
  } catch (error) {
    console.error("Relay failed", error);
  }
};
```
````

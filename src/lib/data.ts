// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DOC_DATA: any = {
  setup: {
    title: "Infrastructure Deployment",
    subtitle: "Architecture Setup",
    description:
      "Configure the global provider to bridge your Next.js application with the Solana cluster and LazorKit relay nodes.",
    steps: [
      {
        head: "01. Dependency Installation",
        body: "Deploy the specific technical packages required for biometric handshakes and smart contract interactions.",
        code: "npm install @lazorkit/wallet @solana/web3.js @coral-xyz/anchor",
      },
      {
        head: "02. Global Provider Integration",
        body: "Wrap your application root in the LazorkitProvider. This initializes the secure context for the entire platform.",
        code: "// app/layout.tsx\nimport { LazorkitProvider } from '@lazorkit/wallet';\n\n<LazorkitProvider \n  rpcUrl='https://api.devnet.solana.com'\n  paymasterConfig={{ paymasterUrl: '...' }}\n>\n  {children}\n</LazorkitProvider>",
      },
    ],
  },
  passkey: {
    title: "Biometric Handshake",
    subtitle: "Identity Verification",
    description:
      "Invoke the hardware-level WebAuthn protocol to create a seedless Solana identity via FaceID or Fingerprint.",
    steps: [
      {
        head: "01. Hook Extraction",
        body: "Access the official useWallet hook to manage connection states and biometric authorization requests.",
        code: "import { useWallet } from '@lazorkit/wallet';\n\nconst { connect, isConnecting } = useWallet();",
      },
      {
        head: "02. Connection Protocol",
        body: "Execute the connect method with feeMode set to 'paymaster' to enable instant gasless capabilities.",
        code: "const handleAuth = async () => {\n  const wallet = await connect({ \n    feeMode: 'paymaster' \n  });\n  console.log('Identity Resolved:', wallet.address);\n};",
      },
    ],
  },
  gasless: {
    title: "Ghost Transactions",
    subtitle: "Sovereign Fee Relays",
    description:
      "Execute on-chain instructions with 0 SOL balance using the built-in Paymaster sponsorship protocol.",
    steps: [
      {
        head: "01. Instruction Construction",
        body: "Build a standard Solana instruction using web3.js. The user signs this, but doesn't pay the gas.",
        code: "const ix = SystemProgram.transfer({\n  fromPubkey: userPubkey,\n  toPubkey: recipient,\n  lamports: 1000000\n});",
      },
      {
        head: "02. Relay Execution",
        body: "Submit the instruction to the signAndSendTransaction method. The SDK handles fee-payer assignment automatically.",
        code: "const signature = await signAndSendTransaction({\n  instructions: [ix],\n  transactionOptions: { feeToken: 'USDC' }\n});",
      },
    ],
  },
  persistence: {
    title: "Neural Persistence",
    subtitle: "Session Management",
    description:
      "Maintain a permanent link between the user's hardware and your application across device restarts.",
    steps: [
      {
        head: "01. State Persistence",
        body: "Leverage Zustand middleware to cache the biometric identity in local storage, preventing redundant logins.",
        code: "// store/useWalletStore.ts\nexport const useWalletStore = create()(\n  persist((set) => ({ ... }), { \n    name: 'sovereign-storage' \n  })\n);",
      },
      {
        head: "02. Auto-Connect Protocol",
        body: "The connect method intelligently attempts to restore existing sessions without re-triggering popups if possible.",
        code: "useEffect(() => {\n  if (storedAddress) connect();\n}, []);",
      },
    ],
  },
};

import { Connection } from "@solana/web3.js";


const NETWORK = "devnet";
const RPC_URL = "https://api.devnet.solana.com";

export const connection = new Connection(RPC_URL);


export const lazorConfig = {
  appId: process.env.NEXT_PUBLIC_LAZOR_APP_ID || "demo-app-id",
  network: NETWORK,
};
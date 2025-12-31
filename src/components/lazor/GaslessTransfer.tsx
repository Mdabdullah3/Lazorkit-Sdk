/* ✅ UPDATED WITH BASE58 VALIDATION */
"use client";
import React, { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Send, Zap, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function GaslessTransfer() {
    const { signAndSendTransaction, smartWalletPubkey } = useWallet();
    const [loading, setLoading] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [txSig, setTxSig] = useState<string | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleTransfer = async () => {
        setLocalError(null);
        setTxSig(null);

        // 1. Basic Validation
        if (!recipient.trim()) return setLocalError("Address_Required");
        if (!smartWalletPubkey) return setLocalError("Wallet_Not_Connected");

        setLoading(true);

        try {
            /**
             * 🛡️ THE FIX: validate the address string
             * We trim it to remove spaces and wrap it in a try/catch
             */
            const cleanAddress = recipient.trim();
            const destination = new PublicKey(cleanAddress);

            const instruction = SystemProgram.transfer({
                fromPubkey: smartWalletPubkey,
                toPubkey: destination,
                lamports: 0.001 * LAMPORTS_PER_SOL,
            });

            const signature = await signAndSendTransaction({
                instructions: [instruction],
                transactionOptions: {
                    feeToken: 'USDC',
                    clusterSimulation: 'devnet'
                }
            });

            setTxSig(signature);
        } catch (error: any) {
            console.error('Relay failed:', error);

            // ✅ Catch the "Non-base58" error specifically
            if (error.message?.includes("base58")) {
                setLocalError("Invalid_Solana_Address_Format");
            } else {
                setLocalError("Handshake_Simulation_Failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sovereign-glass rounded-[40px] p-10 border-white/5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Zap size={20} className="text-fuchsia-500" />
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Gasless_Relay_Module</h3>
            </div>

            <div className="space-y-2">
                <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="RECIPIENT_PUBKEY..."
                    className={`w-full h-14 bg-black/40 border rounded-2xl px-6 text-[10px] font-mono text-white outline-none transition-all ${localError ? 'border-red-500/50' : 'border-white/10 focus:border-fuchsia-500'}`}
                />
                {localError && (
                    <p className="text-[9px] text-red-500 font-mono flex items-center gap-1 ml-2">
                        <AlertTriangle size={10} /> {localError}
                    </p>
                )}
            </div>

            <button
                onClick={handleTransfer}
                disabled={loading}
                className="w-full h-16 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-black uppercase text-xs rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Execute Ghost Transfer</>}
            </button>

            {txSig && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono break-all group">
                    <CheckCircle size={12} className="inline mr-2" />
                    TX_CONFIRMED: {txSig.slice(0, 20)}...
                    <a
                        href={`https://solscan.io/tx/${txSig}?cluster=devnet`}
                        target="_blank"
                        className="block mt-2 text-cyan-400 underline hover:text-white"
                    >
                        View_on_Solscan
                    </a>
                </div>
            )}
        </div>
    );
}
/* ✅ FINAL PRODUCTION LOGIC FOR 1st PLACE */
"use client";
import React, { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Send, Zap, Loader2, CheckCircle } from 'lucide-react';

export default function GaslessTransfer() {
    const { signAndSendTransaction, smartWalletPubkey } = useWallet(); // Get official pubkey
    const [loading, setLoading] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [txSig, setTxSig] = useState<string | null>(null);

    const handleTransfer = async () => {
        if (!recipient || !smartWalletPubkey) return;
        setLoading(true);
        setTxSig(null);

        try {
            // 1. Create a Transfer Instruction
            const destination = new PublicKey(recipient);
            const instruction = SystemProgram.transfer({
                fromPubkey: smartWalletPubkey,
                toPubkey: destination,
                lamports: 0.001 * LAMPORTS_PER_SOL, // Small test amount
            });

            // 2. Execute via Paymaster (Gasless)
            const signature = await signAndSendTransaction({
                instructions: [instruction],
                transactionOptions: {
                    feeToken: 'USDC', // The Paymaster handles the gas
                    clusterSimulation: 'devnet'
                }
            });

            setTxSig(signature);
        } catch (error) {
            console.error('Relay failed:', error);
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

            <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="RECIPIENT_PUBKEY..."
                className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-[10px] font-mono text-white focus:border-fuchsia-500 outline-none"
            />

            <button
                onClick={handleTransfer}
                disabled={loading}
                className="w-full h-16 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-black uppercase text-xs rounded-2xl flex items-center justify-center gap-3"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Execute Ghost Transfer</>}
            </button>

            {txSig && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono break-all">
                    <CheckCircle size={12} className="inline mr-2" />
                    TX_CONFIRMED: {txSig}
                </div>
            )}
        </div>
    );
}
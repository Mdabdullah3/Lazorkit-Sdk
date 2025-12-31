/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Send, Zap, Loader2, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

export default function GaslessTransfer() {
    const { signAndSendTransaction, smartWalletPubkey } = useWallet();
    const [loading, setLoading] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [txSig, setTxSig] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTransfer = async () => {
        if (!recipient.trim()) return setError("Destination_Required");
        setError(null);
        setLoading(true);

        try {
            const destination = new PublicKey(recipient.trim());
            const instruction = SystemProgram.transfer({
                fromPubkey: smartWalletPubkey!,
                toPubkey: destination,
                lamports: 0.005 * LAMPORTS_PER_SOL,
            });

            const signature = await signAndSendTransaction({
                instructions: [instruction],
                transactionOptions: { feeToken: 'USDC' }
            });
            setTxSig(signature);
        } catch (err: any) {
            setError(err.message?.includes("base58") ? "Invalid_Address_Format" : "Relay_Protocol_Failure");
        } finally { setLoading(false); }
    };

    return (
        <div className="sovereign-glass rounded-[50px] p-10 flex flex-col gap-8 border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ff3e3e]/10 flex items-center justify-center text-[#ff3e3e] border border-[#ff3e3e]/20 shadow-[0_0_20px_rgba(255,62,62,0.2)]">
                    <Zap size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-black italic text-white uppercase tracking-tight">Ghost Relay</h3>
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Gasless_Transmission_v1</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2 italic">Recipient_Endpoint</label>
                    <input
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="PASTE_SOLANA_ADDRESS..."
                        className={`w-full h-16 bg-black border rounded-[25px] px-8 text-xs font-mono text-white outline-none transition-all ${error ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-[#f83a99]/50'}`}
                    />
                    {error && <p className="text-[9px] text-red-500 font-black uppercase tracking-widest ml-4 flex items-center gap-2 animate-pulse"><AlertTriangle size={12} /> {error}</p>}
                </div>

                <button
                    onClick={handleTransfer}
                    disabled={loading}
                    className="w-full h-20 bg-linear-to-r from-[#ff3e3e] via-[#f83a99] to-[#f9d423] text-black font-black uppercase text-sm tracking-[0.3em] rounded-[30px] shadow-[0_20px_40px_rgba(255,62,62,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /> Confirm_Transaction</>}
                </button>
            </div>

            {txSig && (
                <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle size={14} /> Handshake_Confirmed
                    </div>
                    <a href={`https://solscan.io/tx/${txSig}?cluster=devnet`} target="_blank" className="flex items-center gap-2 text-[11px] font-mono underline decoration-emerald-500/30 hover:text-white transition-all">
                        VIEW_ON_EXPLORER <ExternalLink size={12} />
                    </a>
                </div>
            )}
        </div>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Loader2, ChevronRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useWalletStore } from '@/store/useWalletStore';
import { useWallet } from '@lazorkit/wallet';

export default function PasskeyLogin() {
    const { setWallet, setStatus, status } = useWalletStore();
    const [localError, setLocalError] = useState<string | null>(null);
    const { connect } = useWallet();

    const handleAuth = async () => {
        setLocalError(null);
        setStatus('connecting');

        try {
            // 📡 Trigger the native Biometric popup
            const walletInfo = await connect({ feeMode: 'paymaster' });         
            const address = (walletInfo as any)?.address;
            if (address) {
                setWallet(address);
                setStatus('connected');
                console.log("Sovereign Identity Verified:", address);
            } else {
                throw new Error("Address_Not_Found");
            }

        } catch (err: any) {
            console.error("Handshake Failed:", err);

            // Handle common biometric rejection errors
            if (err.name === 'NotAllowedError' || err.message?.includes("cancel")) {
                setLocalError("Handshake_Cancelled");
            } else {
                setLocalError("Handshake_Protocol_Error");
            }

            setStatus('error');
        }
    };

    return (
        // ... (Keep the rest of your beautiful UI code exactly the same)
        <div className="flex flex-col items-center gap-6 w-full">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAuth}
                disabled={status === 'connecting'}
                className="relative w-full group outline-none"
            >
                {/* Prism Edge Trace (Fuchsia/White/Cyan) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff3e3e] via-white to-[#f9d423] rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className="relative px-8 py-6 bg-[#050508] border border-white/20 rounded-full flex items-center justify-between shadow-2xl overflow-hidden">

                    {/* Visual Refraction Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                            {status === 'connecting' ? (
                                <Loader2 className="animate-spin text-[#f83a99]" />
                            ) : (
                                <Fingerprint size={24} className="text-white group-hover:text-[#f83a99] transition-colors" />
                            )}
                        </div>
                        <div className="text-left">
                            <span className="block text-[8px] font-black text-[#ff8c42] uppercase tracking-[0.4em] mb-0.5">
                                {status === 'connecting' ? 'Verifying_Hardware...' : 'Identity_Verification'}
                            </span>
                            <span className="text-sm font-[900] text-white uppercase tracking-widest italic">
                                {status === 'connecting' ? 'Check your device' : 'Initialize Wallet'}
                            </span>
                        </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-[#ff3e3e] group-hover:text-white transition-all relative z-10 shadow-lg">
                        {status === 'connected' ? <CheckCircle2 size={20} /> : <ChevronRight size={20} strokeWidth={3} />}
                    </div>
                </div>
            </motion.button>

            {/* Error Feedback HUD */}
            <AnimatePresence>
                {localError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-rose-500 font-mono text-[9px] uppercase tracking-[0.3em] bg-rose-500/5 px-4 py-2 rounded-lg border border-rose-500/20"
                    >
                        <ShieldAlert size={12} />
                        {localError}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
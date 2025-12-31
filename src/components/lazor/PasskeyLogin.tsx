/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Loader2, ChevronRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useWalletStore } from '@/store/useWalletStore';
import { useWallet } from '@lazorkit/wallet';

export default function PasskeyLogin() {
    const { setWallet, setStatus, status } = useWalletStore();
    const { connect, isConnecting } = useWallet();
    const [error, setError] = useState<string | null>(null);
    // HANDLE AUTHENTICATION FLOW WITH PASSKEY (WEBAUTHN) PROTOCOL
    const handleAuth = async () => {
        setError(null);
        setStatus('connecting');
        try {
            const walletInfo = await connect({ feeMode: 'paymaster' });
            const address = (walletInfo as any)?.address || (walletInfo as any)?.smartWallet;
            if (address) {
                setWallet(address);
                setStatus('connected');
            }
        } catch (err: any) {
            console.error("Handshake Protocol Rejected:", err);
            setError(err.message?.includes("cancel") ? "Handshake_Cancelled" : "Handshake_Error");
            setStatus('error');
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAuth}
                disabled={isConnecting}
                className="relative w-full group"
            >
                <div className="absolute -inset-[1.5px] bg-linear-to-r from-[#00f2ff] via-white to-[#ff3e3e] rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
                <div className="relative px-8 py-6 bg-[#050508] border border-white/10 rounded-full flex items-center justify-between shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/3 border border-white/10 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {isConnecting ? (
                                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <Loader2 className="animate-spin text-[#f83a99]" size={22} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <Fingerprint className="text-white group-hover:text-cyan-400 transition-colors" size={24} strokeWidth={1.5} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="text-left">
                            <span className="block text-[8px] font-black text-white/30 uppercase tracking-[0.4em] mb-0.5 italic">
                                {isConnecting ? 'Verifying_Hardware' : 'Secure_Handshake'}
                            </span>
                            <span className="text-sm font-black text-white uppercase tracking-widest italic">
                                {isConnecting ? 'Check Device' : 'Initialize Wallet'}
                            </span>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-[#ff3e3e] group-hover:text-white transition-all shadow-lg relative z-10">
                        {status === 'connected' ? <CheckCircle2 size={18} strokeWidth={3} /> : <ChevronRight size={20} strokeWidth={3} />}
                    </div>
                </div>
            </motion.button>
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-[#ff3e3e] font-mono text-[9px] uppercase tracking-[0.3em] italic"
                    >
                        <ShieldAlert size={12} />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
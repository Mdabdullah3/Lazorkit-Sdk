/* eslint-disable @typescript-eslint/no-explicit-any */
/* ✅ High-Fidelity Component for the Sovereign Starter Kit */
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Loader2, ShieldCheck, AlertCircle, ChevronRight, Lock } from 'lucide-react';
import { useWalletStore } from '@/store/useWalletStore';

// Note: Ensure @lazorkit/wallet is installed before uncommenting SDK lines
// import { createPasskeyWallet } from "@lazorkit/wallet";

export default function PasskeyLogin() {
    const { setWallet, setStatus, status } = useWalletStore();
    const [localError, setLocalError] = useState<string | null>(null);

    const handlePasskeyAuth = async () => {
        setLocalError(null);
        setStatus('connecting');

        try {
            /** 
             * 📡 SDK INTEGRATION POINT
             * In a production environment, this triggers the native 
             * FaceID/Fingerprint prompt on the user's device.
             */

            // const wallet = await createPasskeyWallet();
            // setWallet(wallet.address);

            // --- SIMULATION FOR UI PREVIEW ---
            setTimeout(() => {
                setWallet("7v9Px...XandOS_Sovereign_Demo");
                setStatus('connected');
            }, 2000);

        } catch (err: any) {
            console.error("Biometric Handshake Failed:", err);
            setLocalError("Handshake Rejected by User");
            setStatus('error');
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">

            {/* 1. THE REFRACTIVE KEY (Button) */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePasskeyAuth}
                disabled={status === 'connecting'}
                className="relative group outline-none"
            >
                {/* Animated Outer Prism Ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-white to-fuchsia-600 rounded-[28px] opacity-20 blur-sm group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative px-10 py-6 bg-[#050508] border border-white/10 rounded-[25px] flex items-center gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">

                    {/* Visual Refraction Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {/* Icon Module */}
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative shadow-inner group-hover:border-cyan-500/50 transition-all">
                        <AnimatePresence mode="wait">
                            {status === 'connecting' ? (
                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Loader2 className="animate-spin text-cyan-400" size={28} />
                                </motion.div>
                            ) : (
                                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Fingerprint className="text-white group-hover:text-cyan-400 transition-colors" size={32} strokeWidth={1.5} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Text Identity */}
                    <div className="text-left">
                        <span className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-1 italic">
                            {status === 'connecting' ? 'Authorizing...' : 'Initialize with Passkey'}
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-[900] text-white uppercase tracking-tighter italic">
                                Initialize with Passkey
                            </span>
                            <ChevronRight size={18} className="text-cyan-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </motion.button>

            {/* 2. ERROR STATE HUD */}
            <AnimatePresence>
                {localError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest italic"
                    >
                        <AlertCircle size={14} />
                        {localError}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. TECHNICAL FOOTER (Instructional) */}
            <div className="flex items-center gap-6 pt-4 opacity-40">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span className="text-[9px] font-mono uppercase tracking-widest">Biometric_Auth</span>
                </div>
                <div className="w-px h-3 bg-white/20" />
                <div className="flex items-center gap-2">
                    <Lock size={12} className="text-cyan-400" />
                    <span className="text-[9px] font-mono uppercase tracking-widest">End-to-End_Secure</span>
                </div>
            </div>

        </div>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Loader2, ChevronRight, ShieldAlert } from 'lucide-react';
import { useWalletStore } from '@/store/useWalletStore';

// ✅ IMPORT THE OFFICIAL HOOK
import { useWallet } from '@lazorkit/wallet';

export default function PasskeyLogin() {
    const { setWallet, setStatus, status } = useWalletStore();
    const [localError, setLocalError] = useState<string | null>(null);

    // ✅ EXTRACT THE OFFICIAL METHODS
    const { connect, isConnecting } = useWallet();

    const handleAuth = async () => {
        setLocalError(null);
        setStatus('connecting');

        try {
            /** 
             * 🛰️ OFFICIAL HANDSHAKE
             * This triggers the portal.lazor.sh popup.
             * If the user doesn't have an account, the portal will 
             * automatically guide them to "Create Account".
             */
            const walletInfo = await connect({ feeMode: 'paymaster' });

            // ✅ Mapping the official response (wallet.smartWallet) to your store
            if (walletInfo && (walletInfo as any).smartWallet) {
                setWallet((walletInfo as any).smartWallet);
                setStatus('connected');
                console.log("Sovereign Identity Created:", (walletInfo as any).smartWallet);
            }

        } catch (err: any) {
            console.error("Biometric Handshake Failed:", err);
            setLocalError("Handshake_Rejected");
            setStatus('error');
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAuth}
                disabled={isConnecting}
                className="relative w-full group outline-none"
            >
                {/* ... (Your beautiful UI code stays the same) ... */}
                <div className="relative px-8 py-6 bg-[#050508] border border-white/20 rounded-full flex items-center justify-between shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            {isConnecting ? <Loader2 className="animate-spin text-[#f83a99]" /> : <Fingerprint size={24} className="text-white" />}
                        </div>
                        <div className="text-left">
                            <span className="block text-[8px] font-black text-[#ff8c42] uppercase tracking-[0.4em] mb-0.5">Authorization_Protocol</span>
                            <span className="text-sm font-[900] text-white uppercase tracking-widest italic">
                                {isConnecting ? 'Check Popup Window' : 'Initialize Wallet'}
                            </span>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-[#ff3e3e] group-hover:text-white transition-all relative z-10 shadow-lg">
                        <ChevronRight size={20} strokeWidth={3} />
                    </div>
                </div>
            </motion.button>
        </div>
    );
}
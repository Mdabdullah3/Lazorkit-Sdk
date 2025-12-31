/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Fingerprint, Share2, Code2, Key } from 'lucide-react';
import PasskeyLogin from './PasskeyLogin';

export default function SovereignLanding() {
    return (
        <div className="relative w-full min-h-screen flex flex-col bg-[#010103] selection:bg-rose-500/30 font-sans">

            {/* --- 1. ATMOSPHERE --- */}
            <div className="solar-flow fixed inset-0 z-0 opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010103_95%)] z-0" />

            {/* --- 2. ELITE NAVIGATION --- */}
            <nav className="relative z-50 w-full max-w-[1600px] mx-auto px-10 py-10 flex justify-between items-center">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff3e3e] via-white to-[#f9d423] flex items-center justify-center shadow-[0_0_30px_rgba(255,62,62,0.4)] transition-transform group-hover:rotate-[5deg]">
                        <Shield size={24} className="text-black" fill="black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-[900] tracking-tighter uppercase text-white leading-none">
                            Lazor<span className="text-white/40 italic">Kit</span>
                        </span>
                        <span className="text-[8px] font-black text-[#ff3e3e] uppercase tracking-[0.5em] mt-1">Sovereign_OS</span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">
                        <span className="hover:text-white transition-colors cursor-pointer">Documentation</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Gossip_API</span>
                    </div>
                    <a href="#" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#f9d423] hover:bg-white/10 transition-all shadow-xl">
                        <Code2 size={20} />
                    </a>
                </div>
            </nav>

            {/* --- 3. MAIN COMMAND HUB --- */}
            <div className="relative z-10 flex-1 flex  lg:flex-row items-center justify-center flex-col-reverse px-6 md:px-20 gap-10 lg:gap-24 max-w-[1600px] mx-auto w-full">

                {/* LEFT: THE STORY */}
                <div className="flex-1 space-y-10 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-center lg:justify-start gap-3 text-[#f9d423] font-black text-[11px] tracking-[0.4em] uppercase">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#f9d423] animate-pulse" />
                            System_Initialize_OK
                        </div>
                        <h1 className="text-6xl md:text-8xl font-[900] italic leading-[0.8] tracking-[-0.05em] text-white uppercase">
                            Invisible <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3e3e] via-white to-[#f83a99] drop-shadow-[0_0_30px_rgba(255,62,62,0.2)]">Wallets.</span>
                        </h1>
                        <p className="text-white/40 max-w-lg text-lg font-medium leading-relaxed tracking-tight uppercase italic mx-auto lg:mx-0">
                            Industrial-grade Solana SDK for passwordless onboarding. Bridging biometrics with gasless performance.
                        </p>
                    </motion.div>

                    {/* HUD METRICS */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-12 pt-8 border-t border-white/5"
                    >
                        <QuickStat label="Latency" value="12ms" color="text-[#ff3e3e]" />
                        <QuickStat label="Network" value="Sync" color="text-white" />
                        <QuickStat label="Fees" value="$0.00" color="text-[#f9d423]" />
                    </motion.div>
                </div>

                {/* RIGHT: THE INTERFACE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full max-w-[500px]"
                >
                    {/* Visual Aura */}
                    <div className="absolute inset-0 bg-[#ff3e3e]/10 blur-[120px] rounded-full animate-pulse" />

                    <div className="sovereign-glass rounded-[60px] p-12 md:p-16 relative overflow-hidden border-white/5 shadow-[0_40px_100px_rgba(0,0,0,1)] flex flex-col items-center gap-12">

                        {/* Decorative HUD Ring */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        <div className="relative">
                            <div className="w-20 h-20 rounded-[28px] bg-black/60 border border-white/10 flex items-center justify-center relative shadow-inner">
                                <Key size={32} className="text-[#f83a99] drop-shadow-[0_0_15px_#f83a99]" />
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-12px] rounded-full border border-dashed border-[#ff3e3e]/20"
                            />
                        </div>

                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-[900] italic text-white uppercase tracking-tighter">Handshake Portal</h2>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">Verify Identity to Initialize</p>
                        </div>

                        <PasskeyLogin />

                        <div className="flex gap-8 opacity-20">
                            <Fingerprint size={18} />
                            <Zap size={18} />
                            <Lock size={18} />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- 4. MINIMALIST FOOTER --- */}
            <footer className="relative z-50 px-10 py-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 bg-[#010103]/50 backdrop-blur-xl mt-auto">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">
                    <span>© 2025 LazorKit Sovereign</span>
                    <div className="w-1 h-1 rounded-full bg-[#f83a99]" />
                    <span>Devnet_Cluster_Active</span>
                </div>

                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest leading-none">Built_By</span>
                        <span className="text-[11px] font-black italic text-transparent bg-clip-text bg-linear-to-r from-[#ff3e3e] via-white to-[#f9d423] uppercase">
                            MdAbdullah
                        </span>
                    </div>
                    <Share2 size={16} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
                </div>
            </footer>
        </div>
    );
}

function QuickStat({ label, value, color }: any) {
    return (
        <div className="flex flex-col gap-1 items-center lg:items-start group cursor-crosshair">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{label}</span>
            <span className={`text-3xl font-black italic tracking-tighter uppercase ${color} transition-all group-hover:scale-110`}>
                {value}
            </span>
        </div>
    );
}
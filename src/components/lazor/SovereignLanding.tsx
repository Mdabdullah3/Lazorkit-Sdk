/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Shield, Zap, Lock, Fingerprint,
    Activity, Share2, Cpu,
    Key, Code2, Globe
} from 'lucide-react';
import PasskeyLogin from './PasskeyLogin';

export default function SovereignLanding() {
    return (
        <div className="relative w-full  flex flex-col bg-[#020102]">

            {/* --- 1. THE SOLAR NEURAL ATMOSPHERE --- */}
            <div className="solar-flow opacity-70 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020102_90%)] z-0" />

            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

            {/* --- 2. TOP HUD NAVIGATION --- */}
            <nav className="relative z-50 w-full px-10 py-8 flex justify-between items-center">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#ff3e3e] to-[#f83a99] flex items-center justify-center shadow-[0_0_40px_rgba(255,62,62,0.5)] transition-transform group-hover:rotate-10">
                        <Shield size={24} className="text-black" fill="black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter uppercase text-white leading-none">
                            Lazor<span className="text-[#f83a99]">Kit</span>
                        </span>
                        <span className="text-[8px] font-mono text-[#f9d423] uppercase tracking-[0.4em]">Sovereign_SDK_v1.0</span>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    <div className="hidden xl:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                        <span className="hover:text-[#ff3e3e] transition-colors cursor-pointer border-b border-transparent hover:border-[#ff3e3e] pb-1">Integration_Docs</span>
                        <span className="hover:text-[#ff3e3e] transition-colors cursor-pointer border-b border-transparent hover:border-[#ff3e3e] pb-1">Gasless_API</span>
                        <span className="hover:text-[#ff3e3e] transition-colors cursor-pointer border-b border-transparent hover:border-[#ff3e3e] pb-1">Smart_Contracts</span>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <a href="https://github.com/lazor-kit" target="_blank" className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl hover:bg-white/10 transition-all group">
                        <Code2 size={16} className="text-[#f9d423]" />
                        <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Source_Repository</span>
                    </a>
                </div>
            </nav>

            {/* --- 3. MAIN COMMAND INTERFACE --- */}
            <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 px-10 lg:px-24 items-center gap-16">

                {/* LEFT: SDK BRIEFING */}
                <div className="lg:col-span-7 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-[#ff8c42] font-black text-[11px] tracking-[0.5em] uppercase italic bg-[#ff8c42]/5 w-fit px-4 py-1.5 rounded-lg border border-[#ff8c42]/20">
                            <Activity size={14} className="animate-pulse" /> Initialize_Secure_Handshake
                        </div>
                        <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-[-0.06em] text-white uppercase">
                            Invisible <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff3e3e] via-white to-[#f9d423] drop-shadow-[0_0_30px_rgba(255,62,62,0.3)]">Wallets.</span>
                        </h1>
                        <p className="text-white/40 max-w-xl text-xl font-medium leading-relaxed uppercase tracking-tight italic">
                            The definitive Solana starter kit for passwordless onboarding. Bridging the gap between
                            <span className="text-white"> hardware-level encryption</span> and
                            <span className="text-[#f83a99]"> effortless user experiences.</span>
                        </p>
                    </motion.div>

                    {/* SDK Performance Metrics */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/5 pt-12"
                    >
                        <TechnicalMetric label="Onboarding" value="2 Sec" icon={Zap} />
                        <TechnicalMetric label="Gas Fees" value="$0.00" icon={Shield} />
                        <TechnicalMetric label="Security" value="Passkey" icon={Lock} />
                        <TechnicalMetric label="Type" value="Smart" icon={Cpu} />
                    </motion.div>
                </div>

                {/* RIGHT: AUTHENTICATION MODULE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-5 relative flex justify-center lg:justify-end"
                >
                    {/* The Solar Orb Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff3e3e]/15 blur-[120px] rounded-full animate-pulse" />

                    <div className="frosted-glass rounded-[60px] p-1 md:p-1.5 w-full max-w-[480px] shadow-[0_50px_150px_rgba(0,0,0,1)] relative overflow-hidden group">
                        {/* Internal Refractive Frame */}
                        <div className="bg-[#050508]/90 rounded-[58px] p-12 md:p-16 flex flex-col items-center text-center space-y-12 relative">

                            {/* Subtle Scanline Decor */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,62,62,0.01)_50%)] bg-size-[100%_4px]" />

                            <div className="relative">
                                <div className="w-24 h-24 rounded-[32px] bg-white/2 border border-white/10 flex items-center justify-center relative shadow-inner group-hover:border-[#f83a99]/50 transition-all duration-700">
                                    <Key size={44} className="text-[#f83a99] drop-shadow-[0_0_20px_#f83a99]" strokeWidth={1.5} />
                                </div>
                                <motion.div
                                    animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-15px] rounded-full border border-dashed border-[#ff3e3e]/30"
                                />
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Auth_Terminal</h2>
                                <p className="text-[10px] text-[#f9d423] font-black uppercase tracking-[0.4em] font-mono animate-pulse">Waiting for Biometric Input...</p>
                            </div>

                            {/* YOUR PasskeyLogin Component with matching theme */}
                            <PasskeyLogin />

                            <div className="flex gap-8 opacity-30">
                                <Globe size={18} />
                                <Activity size={18} />
                                <Fingerprint size={18} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- 4. DATA-CENTRIC FOOTER --- */}
            <footer className="relative z-50 px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 bg-[#020102]">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Devnet_Operational</span>
                    <div className="w-px h-3 bg-white/10" />
                    <span>© 2025 LazorKit_Documentation_Suite</span>
                </div>

                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none">Developed_by:</span>
                        <span className="text-[12px] font-black italic text-transparent bg-clip-text bg-linear-to-r from-[#ff3e3e] via-white to-[#f9d423] uppercase">
                            MdAbdullah
                        </span>
                    </div>
                    <Share2 size={18} className="text-white/20 hover:text-[#f83a99] cursor-pointer transition-all hover:scale-110" />
                </div>
            </footer>
        </div>
    );
}

function TechnicalMetric({ label, value, icon: Icon }: any) {
    return (
        <div className="flex flex-col gap-2 group cursor-crosshair">
            <div className="flex items-center gap-2">
                <Icon size={12} className="text-[#f83a99] opacity-40 group-hover:opacity-100 transition-all" />
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{label}</span>
            </div>
            <span className="text-3xl font-black italic text-white tracking-tighter group-hover:text-[#f9d423] transition-all tabular-nums leading-none">
                {value}
            </span>
        </div>
    );
}
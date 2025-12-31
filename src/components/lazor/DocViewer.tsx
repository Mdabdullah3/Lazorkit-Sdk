/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useWalletStore } from '@/store/useWalletStore';
import { ArrowLeft, Zap, ShieldCheck, Check, Copy, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DOC_DATA } from '@/lib/data';

export default function DocViewer() {
    const { selectedDoc, setSelectedDoc, setActiveTab } = useWalletStore();
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const doc = selectedDoc ? DOC_DATA[selectedDoc] : null;

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    if (!doc) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl flex flex-col gap-10 pb-40"
        >
            {/* 1. TOP TACTICAL NAVIGATION */}
            <div className="flex justify-between items-center px-4">
                <button
                    onClick={() => { setSelectedDoc(null); setActiveTab('dashboard'); }}
                    className="flex items-center gap-3 text-cyan-400 group"
                >
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] italic">De-initialize_Audit</span>
                </button>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/40">
                        Doc_ID: {selectedDoc?.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* 2. THE SOVEREIGN HERO */}
            <div className="sovereign-glass rounded-[60px] p-12 md:p-20 relative overflow-hidden border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] rotate-12 scale-150">
                    <Terminal size={300} />
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3 text-fuchsia-500 font-black text-[11px] tracking-[0.6em] uppercase italic">
                        <Zap size={16} className="animate-pulse" /> {doc.subtitle}
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
                        {doc.title}
                    </h2>
                    <p className="text-white/40 text-sm md:text-xl max-w-3xl font-medium uppercase tracking-tight leading-relaxed">
                        {doc.description}
                    </p>
                </div>
            </div>

            {/* 3. DYNAMIC STEP STACK */}
            <div className="grid grid-cols-1 gap-10">
                {doc.steps.map((step: any, i: number) => (
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="sovereign-glass rounded-[45px] p-10 md:p-14 border-white/5 flex flex-col lg:flex-row gap-12 group"
                    >
                        <div className="lg:w-1/3 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                                    0{i + 1}
                                </div>
                                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{step.head}</h4>
                            </div>
                            <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium uppercase tracking-tight">{step.body}</p>
                        </div>

                        <div className="lg:w-2/3 relative">
                            {/* CODE HEADER */}
                            <div className="flex justify-between items-center mb-3 px-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol_Source_v1</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(step.code, i)}
                                    className="text-white/20 hover:text-cyan-400 transition-colors"
                                >
                                    {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                            {/* CODE BLOCK */}
                            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black/60 p-8 shadow-2xl group-hover:border-cyan-500/30 transition-all duration-500">
                                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent pointer-events-none" />
                                <pre className="font-mono text-[11px] md:text-xs leading-relaxed text-cyan-400 overflow-x-auto no-scrollbar">
                                    <code>{step.code}</code>
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 4. FINAL VALIDATION BAR */}
            <div className="p-14 rounded-[60px] bg-linear-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex flex-col lg:flex-row justify-between items-center gap-10 shadow-2xl">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/40">
                        <ShieldCheck size={32} />
                    </div>
                    <div className="space-y-1">
                        <h5 className="text-white font-black uppercase italic tracking-tighter text-2xl">Handshake_Verified</h5>
                        <p className="text-[11px] text-emerald-400/60 font-bold uppercase tracking-[0.2em]">This module is production-ready for the Solana Devnet cluster.</p>
                    </div>
                </div>
                <button className="w-full lg:w-auto px-12 py-5 bg-emerald-500 text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-[1.05] transition-all">
                    Initialize Project
                </button>
            </div>
        </motion.div>
    );
}
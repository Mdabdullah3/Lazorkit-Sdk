/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useWalletStore } from '@/store/useWalletStore';
import {
    BookOpen, ChevronRight, Binary,
    Fingerprint, Zap, Cpu
} from 'lucide-react';

export default function Guides() {
    const { setSelectedDoc, setActiveTab } = useWalletStore();

    // FUNCTION TO OPEN A GUIDE 
    const openGuide = (id: string) => {
        setActiveTab('guides');
        setSelectedDoc(id);
    };

    return (
        <div className="sovereign-glass rounded-[50px] p-10 border-white/10 flex flex-col gap-10 shadow-2xl relative overflow-hidden">

            {/* Background Atmosphere Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-5 -z-10 rotate-12">
                <BookOpen size={120} />
            </div>

            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f9d423] animate-pulse shadow-[0_0_10px_#f9d423]" />
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.5em] italic">Knowledge_Hub</h3>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                {/* ✅ NEW: INFRASTRUCTURE SETUP (The First Step) */}
                <GuideBox
                    title="Infrastructure Setup"
                    desc="Initial SDK Integration"
                    icon={Cpu}
                    color="text-yellow-400"
                    onClick={() => openGuide('setup')}
                />

                <GuideBox
                    title="Biometric Handshake"
                    desc="Passkey Identity Logic"
                    icon={Fingerprint}
                    color="text-cyan-400"
                    onClick={() => openGuide('passkey')}
                />

                <GuideBox
                    title="Gasless Relay"
                    desc="Ghost Transaction Protocol"
                    icon={Zap}
                    color="text-fuchsia-500"
                    onClick={() => openGuide('gasless')}
                />

                <GuideBox
                    title="Neural Persistence"
                    desc="Session Recovery Layer"
                    icon={Binary}
                    color="text-emerald-400"
                    onClick={() => openGuide('persistence')}
                />
            </div>

            <div className="mt-4 p-6 rounded-3xl bg-white/2 border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-r from-[#ff3e3e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-relaxed italic relative z-10">
                    Sovereign blueprints for the decentralized internet. Production-ready Solana protocols.
                </p>
            </div>
        </div>
    );
}

// GUIDE BOX COMPONENT 
function GuideBox({ title, desc, icon: Icon, color, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className="p-5 rounded-[25px] bg-white/2 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group flex justify-between items-center"
        >
            <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl bg-black/40 border border-white/5 group-hover:border-white/20 transition-all flex items-center justify-center ${color} shadow-inner`}>
                    <Icon size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-black italic text-white uppercase tracking-tight group-hover:text-white transition-colors">{title}</span>
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{desc}</span>
                </div>
            </div>
            <ChevronRight size={18} className="text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
    );
}
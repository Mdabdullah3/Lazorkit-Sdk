/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useWalletStore } from '@/store/useWalletStore';
import { BookOpen, ChevronRight, Binary, Fingerprint, Zap } from 'lucide-react';

export default function Guides() {
    const { setSelectedDoc, setActiveTab } = useWalletStore();

    // FUNCTION TO OPEN A GUIDE 
    const openGuide = (id: string) => {
        setActiveTab('guides');
        setSelectedDoc(id);
    };
    return (
        <div className="sovereign-glass rounded-[50px] p-10 border-white/10 flex flex-col gap-10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-[#f9d423]" />
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Guides </h3>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <GuideBox
                    title="Biometric Auth"
                    icon={Fingerprint}
                    color="text-cyan-400"
                    onClick={() => openGuide('passkey')}
                />
                <GuideBox
                    title="Gasless Relay"
                    icon={Zap}
                    color="text-fuchsia-500"
                    onClick={() => openGuide('gasless')}
                />
                <GuideBox
                    title="SDK Persistence"
                    icon={Binary}
                    color="text-emerald-400"
                    onClick={() => openGuide('persistence')}
                />
            </div>
            <div className="mt-4 p-6 rounded-3xl bg-white/2 border border-white/5">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-relaxed italic">
                    Explore step-by-step tutorials on integrating LazorKit&apos;s cutting-edge features into your Solana applications. 
                </p>
            </div>
        </div>
    );
}

// GUIDE BOX COMPONENT 
function GuideBox({ title, icon: Icon, color, onClick }: any) {
    return (
        <div onClick={onClick} className="p-6 rounded-[25px] bg-white/2 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group flex justify-between items-center">
            <div className="flex items-center gap-5">
                <div className={`p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-white/20 transition-all ${color}`}>
                    <Icon size={20} />
                </div>
                <span className="text-sm font-black italic text-white uppercase tracking-tight group-hover:text-white transition-colors">{title}</span>
            </div>
            <ChevronRight size={18} className="text-white/10 group-hover:text-white transition-all" />
        </div>
    );
}
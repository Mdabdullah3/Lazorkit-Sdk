/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { LayoutGrid, BookOpen, Shield, Zap, Activity, LogOut } from "lucide-react";
import { useWalletStore } from '@/store/useWalletStore';
import { useWallet } from '@lazorkit/wallet';

export default function Sidebar() {
    const { address, activeTab, setActiveTab, disconnect: clearStore } = useWalletStore();
    const { disconnect: officialDisconnect } = useWallet();

    if (!address) return null;

    // --- FUNCTIONAL LOGIC: SECURE LOGOUT ---
    const handleLogout = async () => {
        try {
            await officialDisconnect(); // ✅ OFFICIAL SDK CLEANUP
            clearStore(); // ✅ ZUSTAND UI CLEANUP
        } catch (error) {
            clearStore();
        }
    };

    return (
        <aside className="fixed left-6 top-1/2 -translate-y-1/2 w-20 h-[80vh] sovereign-glass rounded-[40px] flex flex-col items-center justify-between py-10 z-[100] border-white/5 shadow-[0_40px_80px_rgba(0,0,0,1)] overflow-hidden">

            {/* 1. PRISM EDGE TRACE (Warm Palette) */}
            <div className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#ff3e3e] via-white to-[#f83a99] opacity-40 z-0" />

            {/* 2. BRAND SECTOR */}
            <div className="relative group z-10">
                <div className="absolute inset-0 bg-[#ff3e3e] blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff3e3e] to-[#f83a99] flex items-center justify-center relative z-10 shadow-2xl border-t border-white/30">
                    <Shield size={24} className="text-black" fill="black" />
                </div>
            </div>

            {/* 3. NAVIGATION SECTOR */}
            <nav className="flex flex-col gap-10 relative z-10">
                {/* Dashboard / Home Trigger */}
                <button onClick={() => setActiveTab('dashboard')} className="relative group">
                    <SidebarIcon icon={LayoutGrid} active={activeTab === 'dashboard'} />
                    {activeTab === 'dashboard' && (
                        <motion.div layoutId="nav-glow" className="absolute inset-0 bg-[#ff3e3e]/5 blur-lg rounded-full" />
                    )}
                </button>

                {/* Guides / Documentation Trigger */}
                <button onClick={() => setActiveTab('guides')} className="relative group">
                    <SidebarIcon icon={BookOpen} active={activeTab === 'guides'} />
                    {activeTab === 'guides' && (
                        <motion.div layoutId="nav-glow" className="absolute inset-0 bg-[#f83a99]/5 blur-lg rounded-full" />
                    )}
                </button>
            </nav>

            {/* 4. SYSTEM STATUS / LOGOUT */}
            <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="flex flex-col items-center gap-1.5">
                    <div className="w-1 h-8 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 24, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-full h-2 bg-[#f9d423] shadow-[0_0_10px_#f9d423]"
                        />
                    </div>
                    <Activity size={12} className="text-white/20" />
                </div>

                <button
                    onClick={handleLogout}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all group/exit"
                >
                    <LogOut size={22} className="group-hover/exit:-translate-x-1 transition-transform" />
                </button>
            </div>

        </aside>
    );
}

// --- ICON MODULE COMPONENT ---
function SidebarIcon({ icon: Icon, active }: { icon: any, active: boolean }) {
    return (
        <div className={`p-4 rounded-2xl transition-all duration-500 relative overflow-hidden
            ${active
                ? 'bg-white/10 text-white border border-white/20 shadow-[0_0_20px_rgba(255,62,62,0.1)]'
                : 'text-white/30 hover:text-white/70 hover:bg-white/5'}`}>
            <Icon size={24} strokeWidth={active ? 2.5 : 1.5} className={active ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""} />

            {/* Liquid Shine Effect for Active State */}
            {active && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            )}
        </div>
    );
}
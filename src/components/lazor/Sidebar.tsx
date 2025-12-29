/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { LayoutGrid, Zap, BookOpen, Fingerprint, Shield, LogOut } from "lucide-react";
import { useWalletStore } from '@/store/useWalletStore';

export default function Sidebar() {
    const { disconnect, address, activeTab, setActiveTab } = useWalletStore();
    if (!address) return null;

    return (
        <aside className="fixed left-6 top-1/2 -translate-y-1/2 w-20 h-[80vh] sovereign-glass rounded-[40px] flex flex-col items-center justify-between py-10 z-50">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center">
                <Shield size={20} className="text-black" fill="black" />
            </div>

            <nav className="flex flex-col gap-8">
                {/* Click to go to Dashboard */}
                <button onClick={() => setActiveTab('dashboard')}>
                    <SidebarIcon icon={LayoutGrid} active={activeTab === 'dashboard'} />
                </button>

                {/* Click to go to Guides */}
                <button onClick={() => setActiveTab('guides')}>
                    <SidebarIcon icon={BookOpen} active={activeTab === 'guides'} />
                </button>
            </nav>

            <button onClick={disconnect} className="text-white/20 hover:text-red-500 transition-colors">
                <LogOut size={22} />
            </button>
        </aside>
    );
}

function SidebarIcon({ icon: Icon, active }: any) {
    return (
        <div className={`p-3 rounded-2xl transition-all ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/20 hover:text-white'}`}>
            <Icon size={24} />
        </div>
    );
}
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Zap, ShieldCheck } from 'lucide-react';

export default function GaslessTransfer() {
    return (
        <div className="sovereign-glass rounded-[40px] p-10 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="flex items-center gap-3 mb-8">
                <Zap size={20} className="text-fuchsia-500" />
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Gasless_Relay_Module</h3>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-2">Recipient_Address</label>
                    <input
                        placeholder="ENTER_SOLANA_PUBKEY..."
                        className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-xs font-mono text-white focus:border-fuchsia-500 outline-none"
                    />
                </div>

                <button className="w-full h-16 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-[0_20px_40px_rgba(255,0,189,0.2)] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
                    Execute Gasless Transfer <Send size={16} />
                </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[9px] font-black text-emerald-400/60 uppercase italic">
                <ShieldCheck size={12} />
                Transaction_Fees_Sponsored_by_LazorKit
            </div>
        </div>
    );
}
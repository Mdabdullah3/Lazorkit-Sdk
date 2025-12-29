"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '@/store/useWalletStore';
import { Copy, LogOut, Zap, ShieldCheck, Database, Check } from 'lucide-react';
import { useWallet } from '@lazorkit/wallet';

export default function WalletDashboard() {
   const { address, disconnect: clearStore } = useWalletStore();
   const { disconnect: officialDisconnect } = useWallet();
   const [copied, setCopied] = useState(false);

   if (!address) return null;

   // --- 1. FUNCTIONAL LOGIC: SECURE COPY ---
   const copyAddress = () => {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const handleLogout = async () => {
      try {
         await officialDisconnect(); 
         clearStore(); 
      } catch (error) {
         console.error("Disconnect Error:", error);
         clearStore(); // Force clear on UI anyway
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="w-full max-w-2xl mx-auto"
      >
         {/* --- THE SOVEREIGN IDENTITY CARD --- */}
         <div className="sovereign-glass rounded-[45px] p-10 relative overflow-hidden border-white/10 shadow-[0_40px_80px_rgba(0,0,0,1)] group">

            {/* Prism Border Glow */}
            <div className="absolute inset-0 p-[1.5px] rounded-[inherit] bg-gradient-to-r from-[#ff3e3e] via-white to-[#f9d423] opacity-20 z-0" />

            {/* Internal Atmospheric Decor */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000 -z-10">
               <ShieldCheck size={200} className="text-white" />
            </div>

            <div className="relative z-10 space-y-8">

               {/* HEADER SECTOR */}
               <div className="flex justify-between items-start">
                  <div className="space-y-1">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Smart_Wallet_Active</span>
                     </div>
                     <h2 className="text-4xl font-[900] italic text-white uppercase tracking-tighter leading-none">
                        Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3e3e] to-white">Identity</span>
                     </h2>
                  </div>

                  {/* Logout Action */}
                  <button
                     onClick={handleLogout}
                     className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all group/exit"
                  >
                     <LogOut size={20} className="group-hover/exit:-translate-x-1 transition-transform" />
                  </button>
               </div>

               {/* ADDRESS DATA SECTOR */}
               <div className="bg-black/60 rounded-[30px] p-8 border border-white/5 relative group/addr overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ff3e3e]/5 to-transparent opacity-0 group-hover/addr:opacity-100 transition-opacity" />

                  <div className="flex flex-col gap-3">
                     <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] ml-1">Solana_Public_Key</span>

                     <div className="flex items-center justify-between gap-6 relative z-10">
                        <span className="text-md md:text-lg font-mono text-white font-bold tracking-widest truncate max-w-[280px] md:max-w-md">
                           {address}
                        </span>

                        {/* Copy Button with Feedback State */}
                        <button
                           onClick={copyAddress}
                           className={`p-4 rounded-xl transition-all duration-300 ${copied ? 'bg-emerald-500 text-black shadow-[0_0_20px_#10b981]' : 'bg-white/5 text-white/20 hover:text-cyan-400'}`}
                        >
                           <AnimatePresence mode="wait">
                              {copied ? (
                                 <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <Check size={18} strokeWidth={4} />
                                 </motion.div>
                              ) : (
                                 <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <Copy size={18} />
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </button>
                     </div>
                  </div>
               </div>

               {/* TECHNICAL STATUS STRIP */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.02] border border-white/5 group/stat">
                     <div className="w-10 h-10 rounded-2xl bg-[#ff3e3e]/10 flex items-center justify-center text-[#ff3e3e] group-hover/stat:bg-[#ff3e3e] group-hover/stat:text-black transition-all">
                        <Zap size={18} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/20 uppercase">Gas_Relay</span>
                        <span className="text-xs font-black italic text-white uppercase">Active_L2</span>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.02] border border-white/5 group/stat">
                     <div className="w-10 h-10 rounded-2xl bg-[#f9d423]/10 flex items-center justify-center text-[#f9d423] group-hover/stat:bg-[#f9d423] group-hover/stat:text-black transition-all">
                        <Database size={18} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/20 uppercase">Cluster</span>
                        <span className="text-xs font-black italic text-white uppercase">Sol_Devnet</span>
                     </div>
                  </div>
               </div>

            </div>

            {/* Refractive Light Sweep Animation */}
            <motion.div
               animate={{ x: ["-200%", "200%"] }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 pointer-events-none"
            />
         </div>
      </motion.div>
   );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react'; // ✅ Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '@/store/useWalletStore';
import { Copy, LogOut, Zap, ShieldCheck, Database, Check, RefreshCw, Coins } from 'lucide-react';
import { useWallet } from '@lazorkit/wallet';
import { Connection, PublicKey } from '@solana/web3.js'; // ✅ Added Solana Web3 imports

export default function WalletDashboard() {
   const { address, disconnect: clearStore } = useWalletStore();
   const { disconnect: officialDisconnect } = useWallet();

   const [copied, setCopied] = useState(false);
   const [balance, setBalance] = useState<number | null>(null);
   const [isRefreshing, setIsRefreshing] = useState(false);

   // --- 1. FUNCTIONAL LOGIC: FETCH BALANCE ---
   const fetchBalance = async () => {
      if (!address) return;
      setIsRefreshing(true);
      try {
         const connection = new Connection("https://api.devnet.solana.com");
         const pubKey = new PublicKey(address);
         const bal = await connection.getBalance(pubKey);
         setBalance(bal / 1e9); // Convert lamports to SOL
      } catch (e) {
         console.error("Failed to fetch balance", e);
      } finally {
         setIsRefreshing(false);
      }
   };

   // Initial fetch on mount
   useEffect(() => {
      fetchBalance();
   }, [address]);

   if (!address) return null;

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
         clearStore();
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="w-full max-w-2xl mx-auto"
      >
         <div className="sovereign-glass rounded-[45px] p-10 relative overflow-hidden border-white/10 shadow-[0_40px_80px_rgba(0,0,0,1)] group">

            <div className="absolute inset-0 p-[1.5px] rounded-[inherit] bg-gradient-to-r from-[#ff3e3e] via-white to-[#f9d423] opacity-20 z-0" />

            {/* HEADER SECTOR */}
            <div className="relative z-10 space-y-8">
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

                  <button
                     onClick={handleLogout}
                     className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-rose-500 transition-all"
                  >
                     <LogOut size={20} />
                  </button>
               </div>

               {/* ADDRESS DATA SECTOR */}
               <div className="bg-black/60 rounded-[30px] p-8 border border-white/5 relative overflow-hidden">
                  <div className="flex flex-col gap-3">
                     <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] ml-1">Solana_Public_Key</span>
                     <div className="flex items-center justify-between gap-6 relative z-10">
                        <span className="text-md md:text-lg font-mono text-white font-bold tracking-widest truncate max-w-[280px]">
                           {address}
                        </span>
                        <button
                           onClick={copyAddress}
                           className={`p-4 rounded-xl transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/20 hover:text-cyan-400'}`}
                        >
                           {copied ? <Check size={18} strokeWidth={4} /> : <Copy size={18} />}
                        </button>
                     </div>
                  </div>
               </div>

               {/* --- ✅ NEW: LIQUIDITY / BALANCE MODULE --- */}
               <div className="bg-gradient-to-r from-[#ff3e3e]/10 to-transparent rounded-[30px] p-8 border border-white/5 flex items-center justify-between group/bal">
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 rounded-[22px] bg-black/40 border border-white/10 flex items-center justify-center text-[#f9d423] shadow-inner">
                        <Coins size={28} className="group-hover/bal:rotate-[20deg] transition-transform" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Available_Liquidity</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-[900] italic text-white tracking-tighter tabular-nums">
                              {balance !== null ? balance.toFixed(3) : "0.000"}
                           </span>
                           <span className="text-sm font-black text-[#f9d423] italic uppercase">SOL</span>
                        </div>
                     </div>
                  </div>

                  <button
                     onClick={fetchBalance}
                     disabled={isRefreshing}
                     className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-[#f9d423] transition-all"
                  >
                     <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
                  </button>
               </div>

               {/* TECHNICAL STATUS STRIP */}
               <div className="grid grid-cols-2 gap-4">
                  <StatusModule icon={Zap} label="Gas_Relay" val="Active_L2" color="text-[#ff3e3e]" />
                  <StatusModule icon={Database} label="Cluster" val="Sol_Devnet" color="text-[#f9d423]" />
               </div>

            </div>

            <motion.div
               animate={{ x: ["-200%", "200%"] }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 pointer-events-none"
            />
         </div>
      </motion.div>
   );
}

// Sub-component for clean code
function StatusModule({ icon: Icon, label, val, color }: any) {
   return (
      <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.02] border border-white/5 group/stat">
         <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ${color}`}>
            <Icon size={18} />
         </div>
         <div className="flex flex-col">
            <span className="text-[8px] font-black text-white/20 uppercase">{label}</span>
            <span className="text-xs font-black italic text-white uppercase">{val}</span>
         </div>
      </div>
   );
}
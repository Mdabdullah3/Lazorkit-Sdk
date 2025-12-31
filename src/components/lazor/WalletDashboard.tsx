"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '@/store/useWalletStore';
import { Copy, LogOut, Zap, ShieldCheck, Database, Check, RefreshCw, Coins } from 'lucide-react';
import { useWallet } from '@lazorkit/wallet';
import { Connection, PublicKey } from '@solana/web3.js';

export default function WalletDashboard() {
   const { address, disconnect: clearStore } = useWalletStore();
   const { disconnect: officialDisconnect } = useWallet();

   const [copied, setCopied] = useState(false);
   const [balance, setBalance] = useState<number | null>(null);
   const [isRefreshing, setIsRefreshing] = useState(false);

   const fetchBalance = async () => {
      if (!address) return;
      setIsRefreshing(true);
      try {
         const connection = new Connection("https://api.devnet.solana.com");
         const bal = await connection.getBalance(new PublicKey(address));
         setBalance(bal / 1e9);
      } catch (e) { console.error(e); }
      finally { setIsRefreshing(false); }
   };

   useEffect(() => { fetchBalance(); }, [address]);

   const copyAddress = () => {
      navigator.clipboard.writeText(address || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className="sovereign-glass rounded-[50px] p-10 flex flex-col gap-10 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,1)] relative overflow-hidden group">

         {/* Refractive Light Sweep */}
         <div className="absolute inset-0 bg-gradient-to-tr from-[#ff3e3e]/5 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

         <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-start">
               <div className="space-y-2">
                  <div className="flex items-center gap-2">
                     <ShieldCheck size={14} className="text-emerald-400" />
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Verified_Identity</span>
                  </div>
                  <h2 className="text-4xl font-[900] italic text-white uppercase tracking-tighter leading-none">Sovereign<br />Vault</h2>
               </div>
               <button onClick={async () => { await officialDisconnect(); clearStore(); }} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-rose-500 transition-all"><LogOut size={20} /></button>
            </div>

            {/* BALANCE MODULE */}
            <div className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-[35px] p-8 border border-white/5 flex flex-col gap-4">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Available_Liquidity</span>
                  <button onClick={fetchBalance} className={isRefreshing ? "animate-spin" : ""}><RefreshCw size={14} className="text-white/20" /></button>
               </div>
               <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-[900] italic text-white tracking-tighter tabular-nums">
                     {balance !== null ? balance.toFixed(3) : "0.000"}
                  </span>
                  <span className="text-xl font-black text-[#f9d423] italic">SOL</span>
               </div>
            </div>

            {/* ADDRESS HUD */}
            <div className="bg-black/60 rounded-3xl p-6 border border-white/5 flex items-center justify-between group/addr">
               <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Public_Access_Key</span>
                  <span className="text-sm font-mono text-white font-bold tracking-widest truncate max-w-[200px]">{address}</span>
               </div>
               <button onClick={copyAddress} className={`p-3 rounded-xl transition-all ${copied ? 'bg-emerald-500 text-black shadow-[0_0_15px_#10b981]' : 'bg-white/5 text-white/20 hover:text-cyan-400'}`}>
                  {copied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} />}
               </button>
            </div>
         </div>
      </div>
   );
}
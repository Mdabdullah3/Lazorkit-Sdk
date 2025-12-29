"use client";
import { motion } from 'framer-motion';
import { useWalletStore } from '@/store/useWalletStore';
import { Copy, LogOut, Zap, ShieldCheck, Database } from 'lucide-react';
import { useWallet } from '@lazorkit/wallet';
export default function WalletDashboard() {
   const { address, disconnect } = useWalletStore();
   const { disconnect: officialDisconnect } = useWallet();
   if (!address) return null;

   const copyAddress = () => {
      navigator.clipboard.writeText(address);
      alert("Address copied to clipboard!");
   };
   const handleLogout = async () => {
      await officialDisconnect(); // Clears SDK cache
      disconnect(); // Clears Zustand state
   };
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="w-full max-w-2xl mx-auto space-y-6"
      >
         {/* 1. IDENTITY CARD */}
         <div className="sovereign-glass rounded-[32px] p-8 relative overflow-hidden border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <ShieldCheck size={120} className="text-cyan-400" />
            </div>

            <div className="relative z-10 space-y-6">
               <div className="flex justify-between items-start">
                  <div>
                     <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Smart_Wallet_Active</span>
                     <h2 className="text-2xl font-black italic text-white uppercase tracking-tight mt-1">Sovereign Identity</h2>
                  </div>
                  <button
                     onClick={disconnect}
                     className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-red-500 transition-all"
                  >
                     <LogOut size={18} />
                  </button>
               </div>

               <div className="bg-black/40 rounded-2xl p-6 border border-white/5 flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                     <span className="text-[9px] font-mono text-white/30 uppercase">Public_Key</span>
                     <span className="text-sm font-mono text-white tracking-widest truncate max-w-[250px] md:max-w-md">
                        {address}
                     </span>
                  </div>
                  <button
                     onClick={copyAddress}
                     className="p-3 rounded-lg hover:bg-white/5 text-white/20 hover:text-cyan-400 transition-all"
                  >
                     <Copy size={16} />
                  </button>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Zap size={14} />
                     </div>
                     <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Gasless_Enabled</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Database size={14} />
                     </div>
                     <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Solana_Devnet</span>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
}
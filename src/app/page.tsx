"use client";
import { useWalletStore } from '@/store/useWalletStore';
import { AnimatePresence, motion } from 'framer-motion';
import WalletDashboard from '@/components/lazor/WalletDashboard';
import GaslessTransfer from '@/components/lazor/GaslessTransfer';
import Guides from '@/components/lazor/Guides';
import DocViewer from '@/components/lazor/DocViewer';
import SovereignLanding from '@/components/lazor/SovereignLanding';

export default function Home() {
  const { address, activeTab, selectedDoc } = useWalletStore();

  return (
    <main className="relative min-h-screen w-full bg-[#020102] selection:bg-rose-500/30 overflow-x-hidden">
      {/* Dynamic Solar Atmosphere */}
      <div className="solar-flow fixed inset-0 z-0 opacity-70" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none z-50" />

      <AnimatePresence mode="wait">
        {!address ? (
          <SovereignLanding key="landing" />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start py-20 px-6 md:px-12"
          >
            {/* Top Branding HUD */}


            {activeTab === 'guides' && selectedDoc ? (
              <DocViewer />
            ) : (
              <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-3 gap-10">
                <WalletDashboard />
                <GaslessTransfer />
                <Guides />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
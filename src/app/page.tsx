"use client";
import { useWalletStore } from '@/store/useWalletStore';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/lazor/Sidebar';
import WalletDashboard from '@/components/lazor/WalletDashboard';
import GaslessTransfer from '@/components/lazor/GaslessTransfer';
import Guides from '@/components/lazor/Guides';
import DocViewer from '@/components/lazor/DocViewer';
import SovereignLanding from '@/components/lazor/SovereignLanding';

export default function Home() {
  const { address, activeTab, selectedDoc } = useWalletStore();

  return (
    <main className="w-full relative selection:bg-red-500/30">
      <div className="solar-flow" /> {/* The New Warm Background */}

      <AnimatePresence mode="wait">
        {!address ? (
          <SovereignLanding key="landing" />
        ) : (
          <div className="flex min-h-screen relative overflow-hidden">
            <Sidebar />
            <div className={`flex-1 flex flex-col items-center justify-center p-10 md:ml-24`}>
              {activeTab === 'guides' && selectedDoc ? (
                <DocViewer />
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <WalletDashboard />
                  <GaslessTransfer />
                  <Guides />
                </motion.div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
"use client";
import { useWalletStore } from '@/store/useWalletStore';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/lazor/Sidebar';
import PasskeyLogin from '@/components/lazor/PasskeyLogin';
import WalletDashboard from '@/components/lazor/WalletDashboard';
import GaslessTransfer from '@/components/lazor/GaslessTransfer';
import Guides from '@/components/lazor/Guides';
import DocViewer from '@/components/lazor/DocViewer';

export default function Home() {
  const { address, activeTab, selectedDoc } = useWalletStore();
  return (
    <main className="min-h-screen w-full relative flex overflow-hidden">
      <div className="neural-bg" />
      <Sidebar />

      <div className={`flex-1 flex flex-col items-center justify-center p-10 transition-all duration-700 ${address ? 'ml-24' : 'ml-0'}`}>

        <AnimatePresence mode="wait">
          {!address ? (
            <motion.div key="login"> <PasskeyLogin /> </motion.div>
          ) : (
            <div className="w-full flex items-center justify-center">
              {activeTab === 'guides' && selectedDoc ? (
                <DocViewer />
              ) : (
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <WalletDashboard />
                  <GaslessTransfer />
                  <Guides />
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
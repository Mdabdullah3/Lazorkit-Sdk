import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// DEFINE THE FULL INTERFACE
interface WalletState {
  address: string | null;
  status: "idle" | "connecting" | "connected" | "error";
  activeTab: "dashboard" | "guides";
  selectedDoc: string | null;
  // ACTIONS
  setWallet: (address: string) => void;
  setStatus: (status: "idle" | "connecting" | "connected" | "error") => void;
  setActiveTab: (tab: "dashboard" | "guides") => void;
  setSelectedDoc: (doc: string | null) => void;
  disconnect: () => void;
}

//  CREATE THE STORE
export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      status: "idle",
      activeTab: "dashboard",
      selectedDoc: null,

      setWallet: (address) => set({ address, status: "connected" }),
      setStatus: (status) => set({ status }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setSelectedDoc: (selectedDoc) => set({ selectedDoc }),

      disconnect: () =>
        set({
          address: null,
          status: "idle",
          activeTab: "dashboard",
          selectedDoc: null,
        }),
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

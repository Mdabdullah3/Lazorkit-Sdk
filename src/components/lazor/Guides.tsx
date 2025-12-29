import { useWalletStore } from "@/store/useWalletStore";
import { ArrowUpRight } from "lucide-react";

// The individual item component
function GuideItem({ title, desc, onClick }: { title: string, desc: string, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
        >
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h4 className="text-sm font-black text-white uppercase italic tracking-tight group-hover:text-cyan-400 transition-colors">
                        {title}
                    </h4>
                    <p className="text-[10px] text-white/30 uppercase font-bold">
                        {desc}
                    </p>
                </div>
                <ArrowUpRight size={16} className="text-white/10 group-hover:text-cyan-400" />
            </div>
        </div>
    );
}

// The main Guides component
export default function Guides() {
    const { setSelectedDoc, setActiveTab } = useWalletStore();

    const handleOpenDoc = (id: string) => {
        setActiveTab('guides');
        setSelectedDoc(id);
    };

    return (
        <div className="sovereign-glass rounded-[40px] p-10 border-white/5 flex flex-col h-full">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-8 italic">Knowledge_Base</h3>
            <div className="space-y-4">
                <GuideItem
                    title="Passkey Integration"
                    desc="Handshake Tutorial"
                    onClick={() => handleOpenDoc('passkey')}
                />
                <GuideItem
                    title="Gasless Relay"
                    desc="Ghost Tx Tutorial"
                    onClick={() => handleOpenDoc('gasless')}
                />
            </div>
        </div>
    );
}
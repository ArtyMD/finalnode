"use client";

import { useState } from "react";
import { Lock, Plus, Key, FileText, ChevronRight, Shield } from "lucide-react";

type VaultEntry = {
    id: string;
    title: string;
    type: string;
};

const INITIAL_ENTRIES: VaultEntry[] = [
    { id: "1", title: "Gmail Access", type: "credentials" },
    { id: "2", title: "Crypto Seed Phrase", type: "key" },
    { id: "3", title: "Domain Portfolio", type: "document" },
];

export function Vault() {
    const [entries, setEntries] = useState<VaultEntry[]>(INITIAL_ENTRIES);

    return (
        <div className="flex flex-col p-8 rounded-2xl border border-white/5 bg-[#0F172A]/80 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-300">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-medium tracking-wide text-white">Encrypted Vault</h2>
                        <p className="text-sm text-zinc-500 mt-1">Client-side encrypted. Zero-knowledge.</p>
                    </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-brand-emerald text-emerald-950 hover:bg-emerald-400 rounded-lg font-medium transition-colors">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Entry</span>
                </button>
            </div>

            <div className="space-y-3">
                {entries.map((entry) => (
                    <div key={entry.id} className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#1E293B] hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-md bg-black/40 text-zinc-400 group-hover:text-white group-hover:bg-black/60 transition-colors border border-white/5">
                                {entry.type === "credentials" && <Key className="w-4 h-4" />}
                                {entry.type === "key" && <Shield className="w-4 h-4" />}
                                {entry.type === "document" && <FileText className="w-4 h-4" />}
                            </div>
                            <span className="font-medium text-zinc-200 group-hover:text-white transition-colors">{entry.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
}

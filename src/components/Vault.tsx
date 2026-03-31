"use client";

import { useState } from "react";
import { Lock, Plus, Key, FileText, ChevronRight, Shield, Wallet, Bitcoin, Landmark, Stamp, Database, Network, Briefcase, X, UploadCloud, Paperclip } from "lucide-react";

type VaultEntry = {
    id: string;
    title: string;
    type: string;
    hasFile?: boolean;
    fileName?: string;
};

// Available icons to choose from
const ICON_OPTIONS = [
    { id: "credentials", icon: Key, label: "Credentials" },
    { id: "document", icon: FileText, label: "Document" },
    { id: "key", icon: Shield, label: "Security Key" },
    { id: "wallet", icon: Wallet, label: "Financial" },
    { id: "crypto", icon: Bitcoin, label: "Crypto" },
    { id: "property", icon: Landmark, label: "Property/Bank" },
    { id: "legal", icon: Stamp, label: "Legal" },
    { id: "server", icon: Database, label: "Server" },
    { id: "api", icon: Network, label: "API/Network" },
    { id: "business", icon: Briefcase, label: "Business" },
];

const INITIAL_ENTRIES: VaultEntry[] = [
    { id: "1", title: "Gmail Access", type: "credentials" },
    { id: "2", title: "Crypto Seed Phrase", type: "key" },
    { id: "3", title: "Domain Portfolio", type: "document" },
];

export function Vault() {
    const [entries, setEntries] = useState<VaultEntry[]>(INITIAL_ENTRIES);
    const [isAdding, setIsAdding] = useState(false);
    
    // New Entry Form State
    const [newTitle, setNewTitle] = useState("");
    const [newType, setNewType] = useState("credentials");
    const [newContent, setNewContent] = useState(""); // Not stored in local array for this demo, usually encrypted
    const [newFile, setNewFile] = useState<File | null>(null);

    const handleSaveEntry = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle) return;

        setEntries([
             ...entries,
             { 
                 id: Math.random().toString(), 
                 title: newTitle, 
                 type: newType,
                 hasFile: !!newFile,
                 fileName: newFile?.name
             }
        ]);
        
        // Reset form
        setIsAdding(false);
        setNewTitle("");
        setNewType("credentials");
        setNewContent("");
        setNewFile(null);
    };

    // Helper to render the correct icon component based on type string
    const renderIcon = (typeId: string) => {
        const option = ICON_OPTIONS.find(opt => opt.id === typeId) || ICON_OPTIONS[0];
        const IconComponent = option.icon;
        return <IconComponent className="w-4 h-4" />;
    };

    return (
        <div className="flex flex-col p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0F172A]/80 backdrop-blur-md shadow-2xl relative">
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
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Entry</span>
                </button>
            </div>

            <div className="space-y-3">
                {entries.map((entry) => (
                    <div key={entry.id} className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#1E293B] hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-md bg-black/40 text-indigo-400 group-hover:text-white group-hover:bg-indigo-500 transition-colors border border-white/5">
                                {renderIcon(entry.type)}
                            </div>
                            <span className="font-medium text-zinc-200 group-hover:text-white transition-colors">{entry.title}</span>
                            {entry.hasFile && (
                                <div className="hidden sm:flex items-center space-x-1.5 px-2 py-0.5 rounded border border-indigo-500/30 bg-indigo-500/10 text-xs font-medium text-indigo-300">
                                    <Paperclip className="w-3 h-3" />
                                    <span className="max-w-[100px] truncate">{entry.fileName}</span>
                                </div>
                            )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
                    </div>
                ))}
                
                {entries.length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-xl">
                        <p className="text-zinc-500">Your vault is empty.</p>
                    </div>
                )}
            </div>

            {/* Add Entry Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsAdding(false)} />
                    
                    <div className="relative w-full max-w-lg bg-[#0F172A] border border-white/10 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02] shrink-0">
                            <h2 className="text-xl font-medium text-white flex items-center">
                                <Lock className="w-5 h-5 mr-3 text-indigo-400" />
                                Create New Entry
                            </h2>
                            <button 
                                onClick={() => setIsAdding(false)}
                                className="p-2 -mr-2 text-zinc-500 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEntry} className="p-6 overflow-y-auto space-y-6">
                            
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Entry Title</label>
                                <input 
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                    placeholder="e.g. Master Gmail Password"
                                />
                            </div>

                            {/* Icon Selector */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-zinc-300 flex items-center justify-between">
                                    <span>Category Icon</span>
                                    <span className="text-xs font-normal text-indigo-400">{ICON_OPTIONS.find(o => o.id === newType)?.label}</span>
                                </label>
                                <div className="grid grid-cols-5 gap-3">
                                    {ICON_OPTIONS.map((opt) => {
                                        const IconComp = opt.icon;
                                        const isSelected = newType === opt.id;
                                        return (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                onClick={() => setNewType(opt.id)}
                                                className={`flex items-center justify-center p-3 rounded-xl border transition-all ${
                                                    isSelected 
                                                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]' 
                                                    : 'bg-black/40 border-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                                                }`}
                                                title={opt.label}
                                            >
                                                <IconComp className="w-5 h-5" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Secret Content */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 flex justify-between">
                                        <span>Encrypted Payload</span>
                                        <span className="text-xs text-zinc-500 flex items-center"><Lock className="w-3 h-3 mr-1" /> AES-256</span>
                                    </label>
                                    <textarea 
                                        required
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm font-mono min-h-[120px] resize-y placeholder:font-sans"
                                        placeholder="Enter your seed phrase, password, or instructions here. This will be encrypted before saving."
                                    />
                                </div>

                                {/* File Attachment */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Secure Attachment (Optional)</label>
                                    <div className="relative">
                                        <input 
                                            type="file"
                                            id="file-upload"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    setNewFile(e.target.files[0]);
                                                }
                                            }}
                                        />
                                        <label 
                                            htmlFor="file-upload" 
                                            className={`flex items-center justify-center w-full px-4 py-4 rounded-xl border border-dashed transition-all cursor-pointer ${
                                                newFile 
                                                    ? 'bg-indigo-500/10 border-indigo-500/50 hover:bg-indigo-500/20' 
                                                    : 'bg-[#111827] border-white/20 hover:border-indigo-500/50 hover:bg-white/5'
                                            }`}
                                        >
                                            {newFile ? (
                                                <div className="flex items-center space-x-3 text-indigo-300">
                                                    <FileText className="w-5 h-5" />
                                                    <span className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">{newFile.name}</span>
                                                    <button 
                                                        type="button" 
                                                        className="ml-2 p-1 hover:bg-white/10 rounded-full"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setNewFile(null);
                                                        }}
                                                    >
                                                        <X className="w-4 h-4 text-zinc-400 hover:text-white" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center space-y-2 text-zinc-500 hover:text-indigo-400">
                                                    <UploadCloud className="w-6 h-6" />
                                                    <span className="text-sm">Click to upload .pdf, .doc, .docx</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                                >
                                    Encrypt & Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

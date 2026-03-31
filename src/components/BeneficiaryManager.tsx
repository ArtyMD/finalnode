"use client";

import { useState } from "react";
import { Users, UserPlus, X, Mail, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

type Beneficiary = {
    id: string;
    name: string;
    relation: string;
    email: string;
    phone: string;
    notifyEmail: boolean;
    notifySms: boolean;
};

export function BeneficiaryManager() {
    const [isOpen, setIsOpen] = useState(false);
    
    // Mock State for Beneficiaries
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
        {
            id: "1",
            name: "Sarah Jensen",
            relation: "Spouse",
            email: "sarah.j@example.com",
            phone: "+1 (555) 987-6543",
            notifyEmail: true,
            notifySms: true
        }
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newBeni, setNewBeni] = useState<Partial<Beneficiary>>({ notifyEmail: true, notifySms: false });

    const handleSaveNew = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBeni.name || !newBeni.email) return;
        
        setBeneficiaries([
            ...beneficiaries, 
            { 
                ...newBeni, 
                id: Math.random().toString(),
                relation: newBeni.relation || "Family",
                phone: newBeni.phone || "",
            } as Beneficiary
        ]);
        setIsAdding(false);
        setNewBeni({ notifyEmail: true, notifySms: false });
    };

    const handleRemove = (id: string) => {
        setBeneficiaries(beneficiaries.filter(b => b.id !== id));
    };

    return (
        <>
            {/* Header Trigger */}
            <button 
                onClick={() => setIsOpen(true)}
                className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
            >
                <Users className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-zinc-400">
                    Beneficiar{beneficiaries.length === 1 ? 'y' : 'ies'}:
                    <span className="text-white ml-2">{beneficiaries.length > 0 ? beneficiaries[0].name : "None"}</span>
                    {beneficiaries.length > 1 && <span className="text-emerald-400 ml-1">+{beneficiaries.length - 1}</span>}
                </span>
            </button>

            {/* Management Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />
                    
                    <div className="relative w-full max-w-2xl bg-[#0F172A] border border-white/10 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02] shrink-0">
                            <div>
                                <h2 className="text-xl font-medium text-white flex items-center">
                                    <Users className="w-5 h-5 mr-3 text-emerald-400" />
                                    Manage Beneficiaries
                                </h2>
                                <p className="text-sm text-zinc-400 mt-1">
                                    These trusted individuals will receive your vault access when your dead man's switch triggers.
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 -mr-2 -mt-4 text-zinc-500 hover:text-white rounded-full hover:bg-white/5 transition-colors absolute top-6 right-6"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1">
                            
                            {/* List of current beneficiaries */}
                            <div className="space-y-4">
                                {beneficiaries.map((b) => (
                                    <div key={b.id} className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none" />
                                        
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-white flex items-center">
                                                    {b.name}
                                                    <span className="ml-3 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-zinc-400 font-normal">
                                                        {b.relation}
                                                    </span>
                                                </h3>
                                                <div className="mt-3 flex items-center space-x-6">
                                                    <div className="flex items-center text-sm text-zinc-400">
                                                        <Mail className="w-4 h-4 mr-2 opacity-70 text-emerald-400" />
                                                        {b.email}
                                                    </div>
                                                    {b.phone && (
                                                        <div className="flex items-center text-sm text-zinc-400">
                                                            <MessageSquare className="w-4 h-4 mr-2 opacity-70 text-indigo-400" />
                                                            {b.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col items-end space-y-3">
                                                <button onClick={() => handleRemove(b.id)} className="text-xs text-red-400/70 hover:text-red-400 transition-colors uppercase tracking-widest font-semibold">
                                                    Remove
                                                </button>
                                                <div className="flex items-center space-x-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span className="text-xs font-medium text-emerald-400/90 tracking-wide">
                                                        {b.notifyEmail && b.notifySms ? "EMAIL & SMS ALERTS" : b.notifyEmail ? "EMAIL ALERTS ONLY" : "SMS ALERTS ONLY"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {beneficiaries.length === 0 && (
                                    <div className="p-8 text-center rounded-xl border border-white/5 bg-white/[0.02]">
                                        <p className="text-zinc-500 text-sm">You have no beneficiaries configured. Your vault will be lost if your timer expires.</p>
                                    </div>
                                )}
                            </div>

                            {/* Add New Beneficiary Form Trigger */}
                            {!isAdding ? (
                                <button 
                                    onClick={() => setIsAdding(true)}
                                    className="w-full flex items-center justify-center py-4 border border-dashed border-zinc-700 rounded-xl text-zinc-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all outline-none"
                                >
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Add New Beneficiary
                                </button>
                            ) : (
                                <form onSubmit={handleSaveNew} className="p-6 rounded-xl border border-white/10 bg-[#111827] space-y-5 animate-in slide-in-from-bottom-4 duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-base font-semibold text-white">Register Beneficiary</h3>
                                        <button type="button" onClick={() => setIsAdding(false)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Full Name *</label>
                                            <input required type="text" value={newBeni.name || ""} onChange={e => setNewBeni({...newBeni, name: e.target.value})} className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Relation</label>
                                            <input type="text" value={newBeni.relation || ""} onChange={e => setNewBeni({...newBeni, relation: e.target.value})} className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm" placeholder="Spouse, Sibling, Lawyer..." />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Email Address *</label>
                                            <input required type="email" value={newBeni.email || ""} onChange={e => setNewBeni({...newBeni, email: e.target.value})} className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm" placeholder="john@example.com" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Phone (SMS Alerts)</label>
                                            <input type="tel" value={newBeni.phone || ""} onChange={e => setNewBeni({...newBeni, phone: e.target.value})} className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm" placeholder="+1 (555) 000-0000" />
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex space-x-6">
                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${newBeni.notifyEmail ? 'bg-emerald-500 border-emerald-400' : 'bg-black/50 border-zinc-700 group-hover:border-zinc-500'}`}>
                                                    {newBeni.notifyEmail && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-950" />}
                                                </div>
                                                <input type="checkbox" className="hidden" checked={newBeni.notifyEmail || false} onChange={e => setNewBeni({...newBeni, notifyEmail: e.target.checked})} />
                                                <span className="text-sm text-zinc-300">Email Alerts</span>
                                            </label>
                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${newBeni.notifySms ? 'bg-indigo-500 border-indigo-400' : 'bg-black/50 border-zinc-700 group-hover:border-zinc-500'}`}>
                                                    {newBeni.notifySms && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-950" />}
                                                </div>
                                                <input type="checkbox" className="hidden" checked={newBeni.notifySms || false} onChange={e => setNewBeni({...newBeni, notifySms: e.target.checked})} />
                                                <span className="text-sm text-zinc-300">SMS Alerts</span>
                                            </label>
                                        </div>
                                        
                                        <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-all shadow-[0_0_20px_-5px_transparent] hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] active:scale-95">
                                            Save Trust Contact
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

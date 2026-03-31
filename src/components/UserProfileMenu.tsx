"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, X, Phone, User as UserIcon, Type } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function UserProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Mock Profile State
    const [profile, setProfile] = useState({
        name: "Artur",
        phone: "+1 (555) 123-4567",
        emergencyNotes: "Please contact my spouse first.",
    });

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would save to Supabase Profiles table later
        setIsSettingsModalOpen(false);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Avatar */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden outline-none ring-0 focus:ring-2 focus:ring-indigo-500 hover:ring-2 hover:ring-indigo-400/50 transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            >
                {/* We use a simple gradient or initial */}
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-zinc-300 font-medium text-sm">
                    {profile.name.charAt(0).toUpperCase()}
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-white/10 bg-[#0F172A] shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                        <p className="text-sm font-medium text-white truncate">{profile.name}</p>
                        <p className="text-xs text-zinc-500 truncate mt-0.5">FinalNode User</p>
                    </div>
                    <div className="p-1.5">
                        <button 
                            onClick={() => {
                                setIsSettingsModalOpen(true);
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors flex items-center group"
                        >
                            <Settings className="w-4 h-4 mr-2.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                            Account Settings
                        </button>
                    </div>
                    <div className="p-1.5 border-t border-white/5 bg-black/10">
                        <button 
                            onClick={handleSignOut}
                            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center"
                        >
                            <LogOut className="w-4 h-4 mr-2.5 opacity-80" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}

            {/* Account Settings Modal */}
            {isSettingsModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
                        onClick={() => setIsSettingsModalOpen(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-[#0F172A] border border-white/10 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                            <h2 className="text-xl font-medium text-white flex items-center">
                                <UserIcon className="w-5 h-5 mr-3 text-indigo-400" />
                                Account Settings
                            </h2>
                            <button 
                                onClick={() => setIsSettingsModalOpen(false)}
                                className="p-2 -mr-2 text-zinc-500 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveSettings} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Display Name</label>
                                <div className="relative">
                                    <Type className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                                    <input 
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Phone Number (Optional)</label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                                    <input 
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Emergency Contact Notes</label>
                                <textarea 
                                    value={profile.emergencyNotes}
                                    onChange={(e) => setProfile({...profile, emergencyNotes: e.target.value})}
                                    className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm min-h-[100px] resize-y"
                                    placeholder="Any legal notes or directions for processing..."
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsSettingsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                                >
                                    Save Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

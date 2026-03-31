"use client";

import { useState } from "react";
import { KeyRound, ArrowRight, ShieldCheck, Lock } from "lucide-react";

export default function ClaimPage() {
    const [claimCode, setClaimCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        // Mock network request
        setTimeout(() => {
            setIsVerifying(false);
            // Logic for failed/successful claim
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B1120] relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vh] bg-brand-amber/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6 shadow-2xl">
                        <Lock className="w-8 h-8 text-brand-amber" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
                        Beneficiary Claim
                    </h1>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Enter the secure claim code you received via email to unlock the digital estate vault.
                    </p>
                </div>

                <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="code" className="text-sm font-medium text-zinc-300">
                                Claim Code
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyRound className="h-5 w-5 text-zinc-500" />
                                </div>
                                <input
                                    id="code"
                                    type="text"
                                    placeholder="FN-XXXX-XXXX-XXXX"
                                    required
                                    value={claimCode}
                                    onChange={(e) => setClaimCode(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-zinc-800 rounded-lg bg-[#0B1120] text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-emerald focus:border-brand-emerald transition-all sm:text-sm tracking-widest font-mono uppercase"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!claimCode || isVerifying}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-emerald disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {isVerifying ? (
                                <span className="flex items-center space-x-2">
                                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    <span>Verifying...</span>
                                </span>
                            ) : (
                                <span className="flex items-center space-x-2">
                                    <span>Access Vault</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="flex items-center justify-center space-x-2 text-zinc-500 text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Client-side decryption required after verification.</span>
                </div>
            </div>
        </div>
    );
}

"use client";
"use client";

import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<'google' | 'apple' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const supabase = createClient();
            if (isRegistering) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                // Supabase typically sends a confirmation email
                setSuccessMessage("Registration successful! You can now sign in.");
                setIsRegistering(false); // flip back to login mode
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                window.location.href = '/dashboard';
            }
        } catch (err: any) {
            setError(err.message || "Authentication failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthLogin = async (provider: 'google' | 'apple') => {
        setOauthLoading(provider);
        setError(null);
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || `Could not connect to ${provider}. Please try again.`);
            setOauthLoading(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B1120] relative overflow-hidden">
            <div className="absolute top-[30%] right-[20%] w-[40vw] h-[40vh] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-2xl">
                        <Lock className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
                        Welcome to FinalNode
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Sign in or register to access your digital estate.
                    </p>
                </div>

                <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl space-y-6">

                    {/* Error / Success Banners */}
                    {error && (
                        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                            <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}
                    {successMessage && (
                        <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3">
                            <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><path d="M8 11.857l2.5 2.5L15.857 9" />
                            </svg>
                            <p className="text-sm text-emerald-400">{successMessage}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Google Button */}
                        <button
                            onClick={() => handleOAuthLogin('google')}
                            disabled={!!oauthLoading}
                            className="w-full flex items-center justify-center py-3 px-4 border border-zinc-700/50 rounded-lg text-sm font-medium text-white bg-[#1E293B] hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {oauthLoading === 'google' ? (
                                <svg className="w-5 h-5 mr-3 animate-spin text-zinc-400" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            )}
                            {oauthLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
                        </button>

                        {/* Apple Button */}
                        <button
                            onClick={() => handleOAuthLogin('apple')}
                            disabled={!!oauthLoading}
                            className="w-full flex items-center justify-center py-3 px-4 border border-zinc-700/50 rounded-lg text-sm font-medium text-white bg-[#1E293B] hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {oauthLoading === 'apple' ? (
                                <svg className="w-5 h-5 mr-3 animate-spin text-zinc-400" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                /* Official Apple logo */
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 814 1000" fill="white">
                                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.9 0 663 0 541.8c0-207.6 136.3-317.3 270.3-317.3 71.2 0 130.3 46.4 174.8 46.4 42.8 0 109.8-49 193.1-49 31.1 0 108.2 2.6 168.1 74.8zm-97.4-244.3c31.1-36.8 53.1-88.1 53.1-139.4 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147 75.8-28.5 32-55.1 83.4-55.1 135.4 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.4-71.1z" />
                                </svg>
                            )}
                            {oauthLoading === 'apple' ? 'Connecting...' : 'Continue with Apple'}
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#0F172A] text-zinc-500">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-zinc-500" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-zinc-700/50 rounded-lg bg-[#0B1120] text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all sm:text-sm"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-zinc-300">Password</label>
                                    {!isRegistering && (
                                        <a href="#" className="text-xs text-brand-primary hover:text-indigo-400 transition-colors">
                                            Forgot password?
                                        </a>
                                    )}
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-zinc-500" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-zinc-700/50 rounded-lg bg-[#0B1120] text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || (!email || !password)}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-brand-primary hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {isLoading ? "Authenticating..." : isRegistering ? "Create Account" : "Sign In"}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError(null);
                                setSuccessMessage(null);
                            }}
                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            {isRegistering ? "Already have an account? Sign in here." : "Don't have an account? Register here."}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

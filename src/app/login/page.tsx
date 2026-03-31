"use client";

import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            // successful login
            window.location.href = '/dashboard';
        } catch (err: any) {
            console.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthLogin = async (provider: 'google' | 'apple') => {
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
            console.error(err.message);
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
                    <div className="space-y-4">
                        <button
                            onClick={() => handleOAuthLogin('google')}
                            className="w-full flex items-center justify-center py-3 px-4 border border-zinc-700/50 rounded-lg text-sm font-medium text-white bg-[#1E293B] hover:bg-zinc-800 transition-all duration-300"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
                        <button
                            onClick={() => handleOAuthLogin('apple')}
                            className="w-full flex items-center justify-center py-3 px-4 border border-zinc-700/50 rounded-lg text-sm font-medium text-white bg-[#1E293B] hover:bg-zinc-800 transition-all duration-300"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" fill="white" />
                            </svg>
                            Continue with Apple
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
                                    <a href="#" className="text-xs text-brand-primary hover:text-indigo-400 transition-colors">
                                        Forgot password?
                                    </a>
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
                            {isLoading ? "Authenticating..." : "Sign In / Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

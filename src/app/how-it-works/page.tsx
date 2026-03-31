import Link from "next/link";
import { Clock, ShieldCheck, Mail, ArrowLeft } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen p-6 sm:p-12 bg-gradient-to-b from-[#0B1120] to-[#0F172A] relative overflow-hidden text-white">
            <div className="max-w-4xl mx-auto relative z-10 space-y-16">

                <header className="flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center font-bold text-sm shadow-lg">
                            F
                        </div>
                    </div>
                </header>

                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">How FinalNode Works</h1>
                    <p className="text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
                        A reliable, zero-knowledge Dead Man's Switch to secure your digital legacy.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="shrink-0">
                            <div className="w-16 h-16 rounded-2xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center">
                                <ShieldCheck className="w-8 h-8 text-brand-primary" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-semibold">1. Encrypt Your Assets</h3>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                Create a secure vault containing access credentials, seed phrases, or final instructions. Your data is encrypted entirely on your device before it ever reaches our servers. Not even we can decrypt it.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="shrink-0">
                            <div className="w-16 h-16 rounded-2xl bg-brand-emerald/20 border border-brand-emerald/30 flex items-center justify-center">
                                <Clock className="w-8 h-8 text-brand-emerald" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-semibold">2. The Heartbeat Timer</h3>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                Set a grace period (e.g., 30, 90, or 180 days). You must sign in to "check-in" and reset the timer before it reaches zero. We will send you polite email reminders as your deadline approaches.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="shrink-0">
                            <div className="w-16 h-16 rounded-2xl bg-brand-amber/20 border border-brand-amber/30 flex items-center justify-center">
                                <Mail className="w-8 h-8 text-brand-amber" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-semibold">3. Beneficiary Claim</h3>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                If the timer reaches zero, the Dead Man's Switch is triggered. Your designated beneficiary automatically receives an encrypted claim code via email, allowing them to unlock and access your digital estate.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start">
                    <Link href="/login" className="px-8 py-4 bg-brand-primary text-white hover:bg-indigo-500 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto text-center shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]">
                        Create an Account
                    </Link>
                </div>
            </div>

            {/* Decorative Blob */}
            <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vh] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
    );
}

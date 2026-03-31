"use client";

import Link from "next/link";
import {
  ShieldAlert,
  LockKeyhole,
  Zap,
  Clock,
  ShieldCheck,
  Mail,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Users,
  Globe,
} from "lucide-react";

const STATS = [
  { value: "256-bit", label: "AES Encryption" },
  { value: "0", label: "Data We Can See" },
  { value: "∞", label: "Vault Items" },
  { value: "24h", label: "Claim Delivery" },
];

const FEATURES = [
  {
    icon: ShieldAlert,
    color: "emerald",
    title: "Dead Man's Switch",
    description:
      "Set a custom grace period. If you stop checking in, your encrypted assets are securely transferred to your beneficiary — automatically.",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    glow: "shadow-emerald-500/10",
  },
  {
    icon: LockKeyhole,
    color: "amber",
    title: "Zero-Knowledge Vault",
    description:
      "End-to-end client-side encryption. Your data is encrypted before it leaves your device. Not even we can read your vault contents.",
    gradient: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
    glow: "shadow-amber-500/10",
  },
  {
    icon: Zap,
    color: "indigo",
    title: "Instant Beneficiary Claim",
    description:
      "When your heartbeat timer expires, your designated beneficiary receives a unique claim code instantly via email.",
    gradient: "from-indigo-500/20 to-indigo-500/5",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-400",
    glow: "shadow-indigo-500/10",
  },
];

const STEPS = [
  {
    icon: ShieldCheck,
    num: "01",
    title: "Encrypt Your Assets",
    description:
      "Add passwords, seed phrases, or final instructions. Everything is encrypted on your device using AES-256 before reaching our servers.",
    color: "indigo",
  },
  {
    icon: Clock,
    num: "02",
    title: "Set Your Heartbeat",
    description:
      "Choose a check-in interval — 30, 90, or 180 days. Sign in periodically to reset the timer. We'll send email reminders.",
    color: "emerald",
  },
  {
    icon: Mail,
    num: "03",
    title: "Beneficiary Receives Access",
    description:
      "When the timer expires, your beneficiary is automatically notified and can securely claim your digital estate.",
    color: "amber",
  },
];

const TRUST = [
  "Client-side AES-256 encryption",
  "No plain-text data stored",
  "Email reminders before timer expires",
  "Instant beneficiary notification",
  "Unlimited vault entries",
  "Cancel or update anytime",
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#060B14] text-white overflow-hidden font-sans">
      {/* ── Background Effects ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[60%] right-[-15%] w-[500px] h-[500px] bg-emerald-600/8 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-amber-600/6 blur-[100px] rounded-full" />
      </div>

      {/* ── Navigation ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-5 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <KeyRound className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Final<span className="text-indigo-400">Node</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/how-it-works"
            className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors duration-200 px-4 py-2"
          >
            How it works
          </Link>
          <Link
            href="/login"
            className="text-sm px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-200 hover:text-white transition-all duration-200"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="text-sm px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/25"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-20 pb-12 px-6 sm:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 backdrop-blur-sm mb-10 hero-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-medium tracking-wide">
            Zero-knowledge • End-to-end encrypted
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[1.05] mx-auto max-w-5xl mb-6 hero-fade-in-delay-1">
          Your Digital Legacy.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-200 block sm:inline">
            Protected Forever.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light hero-fade-in-delay-2">
          A zero-knowledge vault with a built-in dead man&apos;s switch. Your
          encrypted credentials are only released to your beneficiary if you
          stop checking in — never before.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 hero-fade-in-delay-3">
          <Link
            href="/dashboard"
            id="cta-enter-vault"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-[0_0_60px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_0_80px_-5px_rgba(99,102,241,0.7)] hover:-translate-y-0.5"
          >
            Enter Vault
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/how-it-works"
            id="cta-how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-200 hover:text-white rounded-full font-medium text-lg transition-all duration-300"
          >
            How it works
          </Link>
        </div>

        {/* Stats Row */}
        <div className="inline-grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5 border border-white/10 rounded-2xl bg-white/[0.03] backdrop-blur-sm overflow-hidden hero-fade-in-delay-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="px-8 py-5 text-center hover:bg-white/5 transition-colors duration-200"
            >
              <div className="text-2xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 px-6 sm:px-12 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-indigo-400 tracking-[0.2em] uppercase mb-4">
            Core Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Built for the unthinkable.
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-lg">
            Every piece of your digital life, secured and ready to be passed on
            exactly when it&apos;s needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group relative p-8 rounded-2xl bg-gradient-to-b ${f.gradient} border ${f.border} hover:scale-[1.02] hover:shadow-xl ${f.glow} transition-all duration-500 overflow-hidden`}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[300%] transition-[transform] duration-700" />
                <div
                  className={`inline-flex p-3 rounded-xl bg-white/5 border ${f.border} mb-5`}
                >
                  <Icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative z-10 px-6 sm:px-12 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-emerald-400 tracking-[0.2em] uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Three steps to peace of mind.
          </h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute left-8 top-16 bottom-16 w-px bg-gradient-to-b from-indigo-500/50 via-emerald-500/50 to-amber-500/50" />

          <div className="space-y-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const colors: Record<
                string,
                { bg: string; border: string; text: string; num: string }
              > = {
                indigo: {
                  bg: "bg-indigo-500/10",
                  border: "border-indigo-500/30",
                  text: "text-indigo-400",
                  num: "text-indigo-400/50",
                },
                emerald: {
                  bg: "bg-emerald-500/10",
                  border: "border-emerald-500/30",
                  text: "text-emerald-400",
                  num: "text-emerald-400/50",
                },
                amber: {
                  bg: "bg-amber-500/10",
                  border: "border-amber-500/30",
                  text: "text-amber-400",
                  num: "text-amber-400/50",
                },
              };
              const c = colors[step.color];
              return (
                <div
                  key={step.num}
                  className="relative flex flex-col md:flex-row gap-6 group"
                >
                  <div className={`shrink-0 z-10 w-16 h-16 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-7 h-7 ${c.text}`} />
                  </div>
                  <div className={`flex-1 p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-colors duration-300`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <span className={`text-3xl font-black ${c.num} leading-none`}>
                        {step.num}
                      </span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trust / Included ── */}
      <section className="relative z-10 px-6 sm:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/10 p-10 sm:p-14 backdrop-blur-sm overflow-hidden relative">
            {/* Inner glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold text-indigo-400 tracking-[0.2em] uppercase mb-4">
                  Everything Included
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                  Total privacy.<br />Total control.
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  FinalNode is designed around one principle: your data belongs
                  to you. We never have access to your vault — we only hold the
                  encrypted ciphertext and the heartbeat timer.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Trusted by privacy-first users</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Global availability</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRUST.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-10 px-6 sm:px-12 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Start protecting your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              digital legacy
            </span>{" "}
            today.
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Create your free vault in under 2 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              id="cta-bottom-enter-vault"
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-[0_0_80px_-10px_rgba(99,102,241,0.7)] hover:shadow-[0_0_100px_-5px_rgba(99,102,241,0.8)] hover:-translate-y-1"
            >
              Create Free Vault
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-200 hover:text-white rounded-full font-medium text-lg transition-all duration-300"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 px-6 sm:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <KeyRound className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-400">
              Final<span className="text-indigo-400">Node</span>
            </span>
          </div>
          <p className="text-xs text-zinc-600 text-center">
            Zero-knowledge encryption. Your data, your keys, your legacy.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <Link href="/how-it-works" className="hover:text-zinc-400 transition-colors">
              How it works
            </Link>
            <Link href="/login" className="hover:text-zinc-400 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-fade-in {
          animation: fadeInUp 0.7s ease forwards;
          opacity: 0;
        }
        .hero-fade-in-delay-1 {
          animation: fadeInUp 0.7s ease 0.1s forwards;
          opacity: 0;
        }
        .hero-fade-in-delay-2 {
          animation: fadeInUp 0.7s ease 0.2s forwards;
          opacity: 0;
        }
        .hero-fade-in-delay-3 {
          animation: fadeInUp 0.7s ease 0.35s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

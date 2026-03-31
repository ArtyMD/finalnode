"use client";

import { useState, useEffect } from "react";
import { Activity, RotateCcw, ShieldAlert } from "lucide-react";

export function HeartbeatTimer() {
    // Mock data: 30 days translated into seconds
    const GRACE_PERIOD_DAYS = 30;
    const GRACE_PERIOD_SECONDS = GRACE_PERIOD_DAYS * 24 * 60 * 60;

    const [timeLeft, setTimeLeft] = useState(GRACE_PERIOD_SECONDS);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        setTimeLeft(GRACE_PERIOD_SECONDS);
    };

    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    const isActive = timeLeft > 0;
    const statusColor = isActive ? "text-brand-emerald" : "text-brand-amber";
    const bgStatusGlow = isActive ? "bg-brand-emerald/10 border-brand-emerald/20" : "bg-brand-amber/10 border-brand-amber/20";

    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden shadow-2xl">
            <div className={`absolute top-0 w-full h-1 ${isActive ? "bg-brand-emerald" : "bg-brand-amber"} opacity-80`} />

            <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-full ${bgStatusGlow} border transition-colors duration-500`}>
                    {isActive ? <Activity className={`w-6 h-6 ${statusColor}`} /> : <ShieldAlert className={`w-6 h-6 ${statusColor} animate-pulse`} />}
                </div>
                <h2 className="text-xl font-medium tracking-wide">Vital Status</h2>
            </div>

            <div className="text-5xl sm:text-6xl md:text-7xl font-mono font-light tracking-tighter mb-8 tabular-nums tracking-[-0.05em] text-white">
                {String(days).padStart(2, '0')}:
                {String(hours).padStart(2, '0')}:
                {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
            </div>

            <button
                onClick={handleCheckIn}
                className="group relative flex items-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
            >
                <RotateCcw className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors">Check In</span>
            </button>

            <p className="mt-6 text-sm text-zinc-500 font-medium text-center">Checking in resets your {GRACE_PERIOD_DAYS}-day grace period.</p>
        </div>
    );
}

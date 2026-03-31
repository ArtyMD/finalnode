"use client";

import { useState, useEffect } from "react";
import { Activity, RotateCcw, ShieldAlert, Settings } from "lucide-react";

export function HeartbeatTimer() {
    // Interactive grace period
    const [gracePeriodDays, setGracePeriodDays] = useState(30);
    const gracePeriodSeconds = gracePeriodDays * 24 * 60 * 60;

    const [timeLeft, setTimeLeft] = useState(gracePeriodSeconds);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        setTimeLeft(gracePeriodSeconds);
    };

    const handleGracePeriodChange = (days: number) => {
        setGracePeriodDays(days);
        setTimeLeft(days * 24 * 60 * 60);
        setShowSettings(false);
    };

    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    const isActive = timeLeft > 0;
    const statusColor = isActive ? "text-emerald-400" : "text-amber-400";
    const bgStatusGlow = isActive ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20";
    const statusLineColor = isActive ? "bg-emerald-500" : "bg-amber-500";

    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm relative shadow-2xl overflow-visible w-full">
            <div className={`absolute top-0 w-full h-1 ${statusLineColor} opacity-80 rounded-t-2xl`} />

            {/* Top Header */}
            <div className="flex items-center justify-between w-full mb-6">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 sm:p-3 rounded-full ${bgStatusGlow} border transition-colors duration-500`}>
                        {isActive ? <Activity className={`w-5 h-5 sm:w-6 sm:h-6 ${statusColor}`} /> : <ShieldAlert className={`w-5 h-5 sm:w-6 sm:h-6 ${statusColor} animate-pulse`} />}
                    </div>
                    <h2 className="text-lg sm:text-xl font-medium tracking-wide text-white">Vital Status</h2>
                </div>
                
                {/* Settings Toggle */}
                <div className="relative">
                    <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                        title="Timer Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                    
                    {/* Settings Dropdown */}
                    {showSettings && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20">
                            <div className="px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-white/5">
                                Grace Period
                            </div>
                            <div className="flex flex-col">
                                {[30, 60, 180].map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => handleGracePeriodChange(d)}
                                        className={`px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors flex items-center justify-between ${gracePeriodDays === d ? 'text-indigo-400 font-medium bg-indigo-500/5' : 'text-zinc-300'}`}
                                    >
                                        {d} Days
                                        {gracePeriodDays === d && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Timer Display - Reduced font size to avoid overflow */}
            <div className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-mono font-light tracking-tighter mb-8 tabular-nums tracking-[-0.02em] text-white w-full text-center">
                {String(days).padStart(2, '0')}:
                {String(hours).padStart(2, '0')}:
                {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
            </div>

            <button
                onClick={handleCheckIn}
                className="group w-full max-w-[240px] relative flex justify-center items-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
            >
                <RotateCcw className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors">Check In</span>
            </button>

            <p className="mt-6 text-sm text-zinc-500 font-medium text-center">Checking in resets your <span className="text-zinc-300">{gracePeriodDays}-day</span> grace period.</p>
        </div>
    );
}

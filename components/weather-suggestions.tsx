"use client"

import { Shirt, Tent, Umbrella, Coffee, Sun, Zap } from "lucide-react"

interface WeatherSuggestionsProps {
    condition: string
    temp: number
}

function getSuggestions(condition: string, temp: number) {
    const c = condition.toLowerCase();

    if (c.includes('rain') || c.includes('drizzle') || c.includes('thunder')) {
        return {
            outfit: "Waterproof layers, umbrella, and technical boots.",
            activity: "Ideal for cozy reading, high-score gaming, or atmospheric cafe hopping.",
            icon: Umbrella,
            color: "text-blue-300",
            bg: "bg-blue-400/10"
        };
    }
    if (c.includes('snow')) {
        return {
            outfit: "Heavy insulation, wool scarf, and thermal-grip footwear.",
            activity: "Perfect for winter photography, hot cocoa labs, or snow architecture.",
            icon: Coffee,
            color: "text-cyan-200",
            bg: "bg-cyan-400/10"
        };
    }
    if (c.includes('clear') || c.includes('sunny')) {
        if (temp > 28) {
            return {
                outfit: "Breathable linen, UV-tinted eyewear, and protective caps.",
                activity: "Ocean exploration, sunset sprints, or artisan gelateria visits.",
                icon: Sun,
                color: "text-orange-300",
                bg: "bg-orange-500/10"
            };
        }
        return {
            outfit: "Lightweight cotton, denim layers, and city-walk sneakers.",
            activity: "High-altitude hiking, urban discovery, or park-side social labs.",
            icon: Tent,
            color: "text-emerald-300",
            bg: "bg-emerald-500/10"
        };
    }
    if (c.includes('cloud')) {
        return {
            outfit: "Versatile soft-shells, base layers, and weather-proof accessories.",
            activity: "Museum deep-dives, minimalist photography, or long geometric walks.",
            icon: Shirt,
            color: "text-indigo-300",
            bg: "bg-indigo-500/10"
        };
    }
    return {
        outfit: "Essential casual comfort, seasonal layers.",
        activity: "Explore new cinematic releases or culinary high-grounds.",
        icon: Zap,
        color: "text-purple-300",
        bg: "bg-purple-500/10"
    };
}

export default function WeatherSuggestions({ condition, temp }: WeatherSuggestionsProps) {
    const { outfit, activity, icon: Icon, color, bg } = getSuggestions(condition, temp);

    return (
        <div className="glass-panel p-8 h-full flex flex-col glass-shimmer">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className={`p-3.5 ${bg} rounded-2xl border border-white/10 shadow-lg`}>
                        <Icon className={color} size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tight">Weather Lifestyle</h3>
                        <p className="text-white text-[10px] font-black uppercase tracking-widest mt-1">Optimized AI Protocol</p>
                    </div>
                </div>
                <div className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-white whitespace-nowrap">
                    SYNCING LIFESTYLE...
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                <div className="bg-white/10 p-6 rounded-[2rem] border border-white/10 hover:bg-white/20 transition-all duration-500 group active:scale-[0.98]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-6 bg-blue-400 rounded-full group-hover:h-8 transition-all duration-500 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                        <p className="text-xs text-blue-300 font-black uppercase tracking-[0.2em]">OUTFIT PROTOCOL</p>
                    </div>
                    <p className="text-white text-lg leading-relaxed font-bold">{outfit}</p>
                </div>
                <div className="bg-white/10 p-6 rounded-[2rem] border border-white/10 hover:bg-white/20 transition-all duration-500 group active:scale-[0.98]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-6 bg-emerald-400 rounded-full group-hover:h-8 transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <p className="text-xs text-emerald-300 font-black uppercase tracking-[0.2em]">ACTIVITY LOG</p>
                    </div>
                    <p className="text-white text-lg leading-relaxed font-bold">{activity}</p>
                </div>
            </div>

            <div className="mt-8 flex gap-2 overflow-hidden opacity-30">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-20 h-1 bg-white/20 rounded-full animate-aurora" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
            </div>
        </div>
    )
}

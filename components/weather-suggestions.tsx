"use client"

import { Shirt, Tent, Umbrella, Coffee, Sun } from "lucide-react"

interface WeatherSuggestionsProps {
    condition: string
    temp: number
}

function getSuggestions(condition: string, temp: number) {
    const c = condition.toLowerCase();

    if (c.includes('rain') || c.includes('drizzle') || c.includes('thunder')) {
        return {
            outfit: "Waterproof jacket, umbrella, and boots.",
            activity: "Great day for reading, indoor gaming, or visiting a cafe.",
            icon: Umbrella
        };
    }
    if (c.includes('snow')) {
        return {
            outfit: "Heavy coat, scarf, gloves, and thermal wear.",
            activity: "Build a snowman, drink hot cocoa, or skiing.",
            icon: Coffee
        };
    }
    if (c.includes('clear') || c.includes('sunny')) {
        if (temp > 28) {
            return {
                outfit: "Light fabrics, sunglasses, and a hat.",
                activity: "Swimming, beach trip, or ice cream run.",
                icon: Sun
            };
        }
        return {
            outfit: "T-shirt, jeans, and comfortable sneakers.",
            activity: "Hiking, photography, or a picnic.",
            icon: Tent
        };
    }
    if (c.includes('cloud')) {
        return {
            outfit: "Layered clothing, light jacket.",
            activity: "Museum visit, photography, or a long walk.",
            icon: Shirt
        };
    }
    return {
        outfit: "Comfortable casual wear.",
        activity: "Check out a new movie or restaurant.",
        icon: Shirt
    };
}

export default function WeatherSuggestions({ condition, temp }: WeatherSuggestionsProps) {
    const { outfit, activity, icon: Icon } = getSuggestions(condition, temp);

    return (
        <div className="glass-panel p-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-white/10 rounded-full border border-white/10">
                    <Icon className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">AI Suggestions</h3>
            </div>

            <div className="space-y-4 flex-grow">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider mb-2">Recommended Outfit</p>
                    <p className="text-white/90 text-sm leading-relaxed">{outfit}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-[10px] text-green-200 font-bold uppercase tracking-wider mb-2">Best Activity</p>
                    <p className="text-white/90 text-sm leading-relaxed">{activity}</p>
                </div>
            </div>
        </div>
    )
}

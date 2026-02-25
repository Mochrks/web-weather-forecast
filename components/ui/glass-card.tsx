"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    className?: string
    gradient?: boolean
    glow?: boolean
    shimmer?: boolean
}

export function GlassCard({
    children,
    className,
    gradient = false,
    glow = false,
    shimmer = false,
    ...props
}: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "glass-card p-6",
                gradient && "bg-gradient-to-br from-white/10 via-white/5 to-transparent",
                glow && "glass-glow",
                shimmer && "glass-shimmer",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}

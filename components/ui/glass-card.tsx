"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    className?: string
    gradient?: boolean
}

export function GlassCard({ children, className, gradient = false, ...props }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md",
                "dark:bg-black/20 dark:border-white/10",
                "hover:bg-white/15 dark:hover:bg-black/25 transition-colors duration-300",
                gradient && "bg-gradient-to-br from-white/20 to-white/5",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}

"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="glass-pill h-12 w-12 border-white/10 hover:bg-white/10 transition-all duration-500">
          <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all duration-700 dark:-rotate-90 dark:scale-0 text-white" />
          <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all duration-700 dark:rotate-0 dark:scale-100 text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass border-white/20 p-2 mt-4 space-y-1">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-xl focus:bg-white/10 focus:text-white text-white cursor-pointer gap-3 font-bold text-xs uppercase tracking-widest"
        >
          <Sun size={14} className="text-white" /> Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="rounded-xl focus:bg-white/10 focus:text-white text-white cursor-pointer gap-3 font-bold text-xs uppercase tracking-widest"
        >
          <Moon size={14} className="text-white" /> Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="rounded-xl focus:bg-white/10 focus:text-white text-white cursor-pointer gap-3 font-bold text-xs uppercase tracking-widest"
        >
          <Monitor size={14} className="text-white" /> System Sync
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

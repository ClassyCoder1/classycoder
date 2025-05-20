import type React from "react"
import { cn } from "@/lib/utils"

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

export default function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div className={cn("relative backdrop-blur-md bg-white/5 border border-white/10 shadow-lg", className)}>
      {/* Subtle inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[inherit]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

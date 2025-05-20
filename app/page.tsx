"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Instagram, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassPanel from "@/components/glass-panel"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!isMounted) return null

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced background animation */}
      <ParticleBackground />

      {/* Dynamic background gradient that follows mouse */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 255, 255, 0.15), transparent 40%)`,
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <GlassPanel className="p-1 md:p-2 rounded-full">
              <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden">
                <Image src="/profile.jpg" alt="Profile picture" fill className="object-cover" priority />
              </div>
            </GlassPanel>
            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4">
              <GlassPanel className="px-4 py-2 rounded-full">
                <span className="text-xs md:text-sm font-medium text-cyan-100">Full-Stack Developer</span>
              </GlassPanel>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Classy</h1>
            <p className="text-lg md:text-xl text-cyan-100/80 max-w-lg">
              Creating seamless digital experiences through code and creativity
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link href="/about">
              <GlassPanel className="px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                <span className="flex items-center gap-2 text-white">
                  About Me <ChevronRight className="h-4 w-4" />
                </span>
              </GlassPanel>
            </Link>
            <Link href="/skills">
              <GlassPanel className="px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                <span className="flex items-center gap-2 text-white">
                  My Skills <ChevronRight className="h-4 w-4" />
                </span>
              </GlassPanel>
            </Link>
            <Link href="/projects">
              <GlassPanel className="px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                <span className="flex items-center gap-2 text-white">
                  Projects <ChevronRight className="h-4 w-4" />
                </span>
              </GlassPanel>
            </Link>
            <Link href="/blog">
              <GlassPanel className="px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                <span className="flex items-center gap-2 text-white">
                  Blog <ChevronRight className="h-4 w-4" />
                </span>
              </GlassPanel>
            </Link>
            <Link href="/contact">
              <GlassPanel className="px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                <span className="flex items-center gap-2 text-white">
                  Contact Me <ChevronRight className="h-4 w-4" />
                </span>
              </GlassPanel>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-4 mt-8"
          >
            <Link href="https://github.com/ClassyCoder1" target="_blank">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:text-cyan-300 hover:bg-white/10"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.instagram.com/alan.ex_/" target="_blank">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:text-cyan-300 hover:bg-white/10"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

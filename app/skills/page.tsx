"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import GlassPanel from "@/components/glass-panel"
import ParticleBackground from "@/components/particle-background"

export default function SkillsPage() {
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

  const frontendSkills = [
    { name: "React", level: 60 },
    { name: "Next.js", level: 35 },
    { name: "TypeScript", level: 40 },
    { name: "HTML/CSS", level: 95 },
    { name: "Tailwind CSS", level: 95 },
  ]

  const backendSkills = [
    { name: "Node.js", level: 90 },
    { name: "Express", level: 85 },
    { name: "MongoDB", level: 85 },
    { name: "SQL", level: 80 },
    { name: "Firebase", level: 70 },
  ]

  const minecraftSkills = [
    { name: "Java", level: 90 },
    { name: "Bukkit/Spigot API", level: 85 },
    { name: "Plugin Development", level: 85 },
    { name: "Forge/Fabric", level: 70 },
    { name: "Mod Development", level: 70 },
    { name: "Server Management", level: 80 },
  ]

  const otherSkills = [
    { name: "Git/GitHub", level: 80 },
    { name: "Docker", level: 70 },
    { name: "CI/CD", level: 75 },
    { name: "Problem Solving", level: 90 },
  ]

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
        <Link href="/" className="inline-flex items-center mb-8 text-cyan-100/80 hover:text-cyan-100 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">My Skills</h1>
          <p className="text-lg text-cyan-100/80 max-w-2xl">
            I've developed a diverse set of skills throughout my journey as a developer. Here's an overview of my
            technical expertise and proficiency levels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SkillCategory title="Frontend Development" skills={frontendSkills} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SkillCategory title="Backend Development" skills={backendSkills} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SkillCategory title="Minecraft Development" skills={minecraftSkills} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SkillCategory title="Other Skills" skills={otherSkills} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">My Development Process</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Planning",
                description: "I start by understanding requirements and planning the architecture.",
              },
              {
                step: "02",
                title: "Design",
                description: "Creating wireframes and designing the user interface for optimal experience.",
              },
              {
                step: "03",
                title: "Development",
                description: "Writing clean, efficient code following best practices.",
              },
              {
                step: "04",
                title: "Testing & Deployment",
                description: "Rigorous testing and smooth deployment to production.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <GlassPanel className="p-6 rounded-2xl h-full hover:bg-white/5 transition-colors">
                  <div className="space-y-4">
                    <div className="text-3xl font-mono text-cyan-300">{process.step}</div>
                    <h3 className="text-xl font-semibold text-white">{process.title}</h3>
                    <p className="text-cyan-100/80">{process.description}</p>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

function SkillCategory({ title, skills }: { title: string; skills: { name: string; level: number }[] }) {
  return (
    <GlassPanel className="p-6 rounded-2xl">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="space-y-2"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          >
            <div className="flex justify-between">
              <span className="font-medium text-white">{skill.name}</span>
              <span className="text-cyan-300">{skill.level}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-200 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  )
}

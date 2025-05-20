"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassPanel from "@/components/glass-panel"
import ParticleBackground from "@/components/particle-background"
import { Badge } from "@/components/ui/badge"
import { projectsData } from "@/data/projects"

export default function ProjectsPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white">My Projects</h1>
          <p className="text-lg text-cyan-100/80 max-w-2xl">
            Here are some of the projects I've worked on. Each project showcases different skills and technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {/* Add New Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * projectsData.length }}
          >
            <GlassPanel className="h-full rounded-2xl flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/20 hover:border-cyan-300/50 transition-colors group cursor-pointer">
              <div className="text-center space-y-4">
                <div className="mx-auto bg-white/10 rounded-full p-4 group-hover:bg-white/20 transition-colors">
                  <Plus className="h-8 w-8 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">Add New Project</h3>
                <p className="text-cyan-100/80">
                  Add your next amazing project to showcase your skills and experience.
                </p>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassPanel className="h-full rounded-2xl overflow-hidden flex flex-col hover:bg-white/5 transition-colors">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>

        <p className="text-cyan-100/80 mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/10 text-cyan-100 hover:bg-white/20">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-white/10 border-0 text-white hover:bg-white/20 hover:text-cyan-300"
              >
                <Github className="h-4 w-4 mr-2" />
                Code
              </Button>
            </Link>
          )}

          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-white/10 border-0 text-white hover:bg-white/20 hover:text-cyan-300"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
            </Link>
          )}
        </div>
      </div>
    </GlassPanel>
  )
}

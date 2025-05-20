"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Github, Instagram, Code, Server, Gamepad2, Braces, Star } from "lucide-react"
import GlassPanel from "@/components/glass-panel"
import ParticleBackground from "@/components/particle-background"
import { testimonials } from "@/data/testimonials"

export default function AboutPage() {
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16"
        >
          <div className="relative">
            <GlassPanel className="p-2 rounded-2xl">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image src="/profile.jpg" alt="Profile picture" fill className="object-cover" />
              </div>
            </GlassPanel>
            <div className="absolute -bottom-4 -right-4 hidden md:block">
              <GlassPanel className="px-4 py-2 rounded-full">
                <div className="flex items-center gap-2">
                  <Link href="https://github.com/Alan-seb" target="_blank" className="text-white hover:text-cyan-300">
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/alan.ex_/"
                    target="_blank"
                    className="text-white hover:text-cyan-300"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </GlassPanel>
            </div>
          </div>

          <div className="space-y-6">
            <GlassPanel className="p-6 rounded-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h1>
              <div className="space-y-4 text-cyan-100/90">
                <p>
                  Hello! I'm Classy, a passionate full-stack developer with expertise in web development and
                  Minecraft mod creation.
                </p>
                <p>
                  My journey in programming began with a curiosity about how websites work, which quickly evolved into a
                  deep passion for creating digital experiences that are both functional and beautiful.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or designing new Minecraft plugins that enhance gameplay experiences.
                </p>
              </div>
            </GlassPanel>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">My Expertise</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ExpertiseCard
              icon={<Code className="h-8 w-8 text-cyan-300" />}
              title="Frontend Development"
              description="Creating responsive and intuitive user interfaces with modern frameworks and libraries."
            />
            <ExpertiseCard
              icon={<Server className="h-8 w-8 text-cyan-300" />}
              title="Backend Development"
              description="Building robust server-side applications and APIs that power seamless experiences."
            />
            <ExpertiseCard
              icon={<Gamepad2 className="h-8 w-8 text-cyan-300" />}
              title="Minecraft Plugins"
              description="Developing custom plugins that enhance gameplay and server management."
            />
            <ExpertiseCard
              icon={<Braces className="h-8 w-8 text-cyan-300" />}
              title="Full-Stack Solutions"
              description="Connecting all the pieces to create complete, end-to-end applications."
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 space-y-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">My Journey</h2>

          <div className="space-y-6">
            <TimelineItem
              year="2020 - Present"
              title="Full-Stack Developer"
              description="Working on various web applications and Minecraft plugins, constantly improving my skills and exploring new technologies."
            />
            <TimelineItem
              year="2018 - 2020"
              title="Frontend Developer"
              description="Focused on creating responsive and intuitive user interfaces with React and other modern frameworks."
            />
            <TimelineItem
              year="2016 - 2018"
              title="Minecraft Plugin Developer"
              description="Started developing custom Minecraft plugins to enhance gameplay and server management."
            />
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 space-y-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">Testimonials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

function ExpertiseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <GlassPanel className="p-6 rounded-2xl h-full hover:bg-white/5 transition-colors">
      <div className="space-y-4">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-cyan-100/80">{description}</p>
      </div>
    </GlassPanel>
  )
}

function TimelineItem({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <GlassPanel className="p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="md:w-1/4">
          <span className="text-cyan-300 font-mono">{year}</span>
        </div>
        <div className="md:w-3/4">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-cyan-100/80">{description}</p>
        </div>
      </div>
    </GlassPanel>
  )
}

interface Testimonial {
  content: string
  author: string
  position: string
  avatar?: string
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <GlassPanel className="p-6 rounded-2xl relative">
      <div className="absolute top-6 right-6 text-cyan-300">
        <Star className="h-6 w-6 fill-current" />
      </div>

      <div className="space-y-4">
        <p className="text-cyan-100/90 italic">"{testimonial.content}"</p>

        <div className="flex items-center gap-3 pt-2">
          {testimonial.avatar ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.author}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-xl font-semibold text-cyan-300">{testimonial.author.charAt(0)}</span>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-white">{testimonial.author}</h4>
            <p className="text-sm text-cyan-100/70">{testimonial.position}</p>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

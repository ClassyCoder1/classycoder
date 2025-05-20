"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import GlassPanel from "@/components/glass-panel"
import ParticleBackground from "@/components/particle-background"
import { Badge } from "@/components/ui/badge"
import { blogData } from "@/data/blog"

export default function BlogPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white">Blog & Insights</h1>
          <p className="text-lg text-cyan-100/80 max-w-2xl">
            Thoughts, tutorials, and insights about web development, Minecraft plugins, and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  readTime: string
  categories: string[]
  slug: string
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <GlassPanel className="h-full rounded-2xl overflow-hidden flex flex-col hover:bg-white/5 transition-colors">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary" className="bg-white/10 text-cyan-100 hover:bg-white/20">
                {category}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>

          <p className="text-cyan-100/80 mb-4 flex-1">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-cyan-100/70 mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{post.date}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>

            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </GlassPanel>
    </Link>
  )
}

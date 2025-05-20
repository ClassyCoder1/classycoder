"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Github, Instagram, Mail, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import GlassPanel from "@/components/glass-panel"
import ParticleBackground from "@/components/particle-background"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using EmailJS to send the form
      await emailjs.sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        formRef.current!,
        "YOUR_PUBLIC_KEY", // Replace with your EmailJS public key
      )

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <h1 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h1>
          <p className="text-lg text-cyan-100/80 max-w-2xl">
            Have a project in mind or want to collaborate? Feel free to reach out to me through any of the channels
            below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 space-y-6"
          >
            <GlassPanel className="p-6 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Phone className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Phone</h3>
                    <p className="text-cyan-100/80">+91-8075642803</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Mail className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-cyan-100/80 break-all">alansebastian.parackal@gmail.com</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium text-white mb-4">Social Media</h3>
                  <div className="flex gap-3">
                    <Link href="https://github.com/Alan-seb" target="_blank">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/10 border-0 text-white hover:bg-white/20 hover:text-cyan-300"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                    <Link href="https://www.instagram.com/alan.ex_/" target="_blank">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/10 border-0 text-white hover:bg-white/20 hover:text-cyan-300"
                      >
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <GlassPanel className="p-6 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Send Me a Message</h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-cyan-100">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-0 text-white placeholder:text-white/50 focus-visible:ring-cyan-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-cyan-100">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-0 text-white placeholder:text-white/50 focus-visible:ring-cyan-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-cyan-100">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-0 text-white placeholder:text-white/50 focus-visible:ring-cyan-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-cyan-100">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-0 text-white placeholder:text-white/50 focus-visible:ring-cyan-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-cyan-400 text-white hover:from-cyan-400 hover:to-cyan-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

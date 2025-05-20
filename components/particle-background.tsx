"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  pulse: boolean
  pulseSpeed: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mousePosition = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    // Initialize particles
    const initParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100)

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getRandomColor(),
          opacity: Math.random() * 0.5 + 0.2,
          pulse: true,
          pulseSpeed: Math.random() * 0.01 + 0.005,
        })
      }
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(100, 255, 255, alpha)", // Cyan
        "rgba(180, 255, 255, alpha)", // Light cyan
        "rgba(100, 200, 255, alpha)", // Blue-cyan
        "rgba(150, 150, 255, alpha)", // Light blue
        "rgba(200, 150, 255, alpha)", // Light purple
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Pulse opacity
        if (particle.pulse) {
          particle.opacity += particle.pulseSpeed
          if (particle.opacity > 0.7 || particle.opacity < 0.2) {
            particle.pulseSpeed *= -1
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("alpha", particle.opacity.toString())
        ctx.fill()

        // Connect particles that are close to each other
        connectParticles(particle)
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    const connectParticles = (particle: Particle) => {
      const maxDistance = 150

      particles.current.forEach((otherParticle) => {
        if (particle === otherParticle) return

        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - distance / maxDistance

          ctx!.beginPath()
          ctx!.strokeStyle = `rgba(100, 255, 255, ${opacity * 0.2})`
          ctx!.lineWidth = 0.5
          ctx!.moveTo(particle.x, particle.y)
          ctx!.lineTo(otherParticle.x, otherParticle.y)
          ctx!.stroke()
        }
      })
    }

    // Set up event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // Initialize
    handleResize()
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />
}

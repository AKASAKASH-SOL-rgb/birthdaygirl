import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function SpatialCard({ children, className = '', glowColor = '#8B5CF6' }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for responsive feel
  const mouseXSpring = useSpring(x, { stiffness: 160, damping: 18 })
  const mouseYSpring = useSpring(y, { stiffness: 160, damping: 18 })

  // Transform coordinates to degree tilts
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  // Dynamic light glare position across the glass
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%'])

  const handlePointerMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const width = rect.width
    const height = rect.height
    const mouseX = (clientX - rect.left) / width - 0.5
    const mouseY = (clientY - rect.top) / height - 0.5
    x.set(mouseX)
    y.set(mouseY)
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className={`relative inline-block w-full ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={(e) => { setIsHovered(true); handlePointerMove(e) }}
        onTouchMove={(e) => { setIsHovered(true); handlePointerMove(e) }}
        onMouseLeave={handlePointerLeave}
        onTouchEnd={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="relative w-full rounded-xl overflow-visible transition-shadow duration-300"
      >
        {/* Sleek anime outer rim */}
        <div
          className="relative w-full rounded-xl p-[1px] transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${glowColor}B0 0%, rgba(255,255,255,0.2) 50%, rgba(16,185,129,0.5) 100%)`,
            boxShadow: isHovered
              ? `0 25px 50px -12px ${glowColor}40, 0 0 35px rgba(16,185,129,0.25)`
              : `0 15px 35px -10px rgba(0,0,0,0.8), 0 0 25px ${glowColor}20`,
          }}
        >
          {/* Main glass surface */}
          <div
            className="w-full h-full rounded-[11px] bg-[#070318]/90 backdrop-blur-2xl relative overflow-hidden p-0.5"
            style={{ transform: 'translateZ(15px)' }}
          >
            {/* Dynamic specular glare reflection */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.35 : 0.08,
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 0%, transparent 60%)`,
              }}
            />

            {/* Anime subtle grid line art */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Geometric anime corner brackets */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40 pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40 pointer-events-none z-20" />

            {children}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
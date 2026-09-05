import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function SpatialCard({ children, className = '', glowColor = '#8B5CF6' }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for buttery smooth response (like LiquidInk)
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18 })
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18 })

  // Transform coordinates to degree tilts
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg'])

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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full rounded-2xl overflow-hidden transition-shadow duration-300"
      >
        {/* Frosted glass backdrop with dynamic glow */}
        <div
          className="relative w-full rounded-2xl p-[2px] transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${glowColor}90 0%, rgba(57,255,20,0.4) 50%, ${glowColor}60 100%)`,
            boxShadow: isHovered
              ? `0 20px 40px -10px ${glowColor}50, 0 0 35px rgba(57,255,20,0.25)`
              : `0 10px 30px -10px ${glowColor}30, 0 0 20px rgba(139,92,246,0.2)`,
          }}
        >
          <div
            className="w-full h-full rounded-[14px] bg-[#0c081e]/85 backdrop-blur-xl relative overflow-hidden"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Dynamic specular glare (LiquidInk lighting sheen) */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 opacity-0 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.35 : 0,
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8) 0%, transparent 60%)`,
              }}
            />

            {/* Subtle starlight grid texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {children}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

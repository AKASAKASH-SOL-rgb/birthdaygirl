import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

export default function Phase1Preloader({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFadeOut(true), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (fadeOut) {
      const t = setTimeout(() => onComplete(), 900)
      return () => clearTimeout(t)
    }
  }, [fadeOut, onComplete])

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          key="preloader"
          className="relative w-full min-h-screen bg-[#000008] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Starfield count={300} speed={0.1} />

          {/* Parallax nebula layers */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute rounded-full animate-nebula"
              style={{
                width: '600px', height: '400px',
                top: '10%', left: '5%',
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
                animationDelay: '0s',
              }}
            />
            <div
              className="absolute rounded-full animate-nebula"
              style={{
                width: '500px', height: '300px',
                bottom: '15%', right: '10%',
                background: 'radial-gradient(ellipse, rgba(57,255,20,0.12) 0%, transparent 70%)',
                animationDelay: '2s',
              }}
            />
            <div
              className="absolute rounded-full animate-nebula"
              style={{
                width: '350px', height: '350px',
                top: '40%', right: '20%',
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)',
                animationDelay: '1s',
              }}
            />
          </div>

          {/* The baby star traveling from deep space */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            initial={{ scale: 0.05, opacity: 0, x: -100, y: 80 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute rounded-full"
              style={{ width: '160px', height: '160px' }}
              animate={{
                boxShadow: [
                  '0 0 30px 10px rgba(57,255,20,0.3)',
                  '0 0 60px 20px rgba(139,92,246,0.4)',
                  '0 0 30px 10px rgba(57,255,20,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Chibi star SVG */}
            <motion.div
              style={{ width: '100px', height: '100px', position: 'relative', zIndex: 10 }}
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Star body */}
                <polygon
                  points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                  fill="url(#starGrad)"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                />
                {/* Chibi face */}
                <circle cx="43" cy="47" r="4" fill="#000008" />
                <circle cx="57" cy="47" r="4" fill="#000008" />
                <circle cx="44.5" cy="45.5" r="1.5" fill="white" />
                <circle cx="58.5" cy="45.5" r="1.5" fill="white" />
                <path d="M44 55 Q50 60 56 55" stroke="#000008" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Sparkle accents */}
                <circle cx="20" cy="20" r="2" fill="#39FF14" opacity="0.8" />
                <circle cx="80" cy="25" r="2" fill="#8B5CF6" opacity="0.8" />
                <circle cx="15" cy="70" r="1.5" fill="#FFD700" opacity="0.8" />
                <circle cx="85" cy="75" r="1.5" fill="#39FF14" opacity="0.8" />
                <defs>
                  <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#39FF14" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Particle trail */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${4 + i * 2}px`,
                  height: `${4 + i * 2}px`,
                  background: i % 2 === 0 ? '#39FF14' : '#8B5CF6',
                  left: `${-20 - i * 12}px`,
                  top: `${10 + i * 5}px`,
                }}
                animate={{
                  opacity: [0.8, 0.2, 0.8],
                  scale: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* Bottom text */}
          <motion.p
            className="absolute bottom-16 text-center text-white/40 text-sm tracking-widest uppercase font-['Nunito']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            A cosmic journey begins...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

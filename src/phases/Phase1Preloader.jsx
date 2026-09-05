import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

export default function Phase1Preloader({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFadeOut(true), 3200)
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
          className="relative w-full min-h-screen bg-[#02000d] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
          transition={{ duration: 0.9 }}
        >
          <Starfield count={260} speed={0.2} />

          {/* Deep Twilight Nebulae */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute rounded-full"
              style={{
                width: '700px', height: '500px',
                top: '5%', left: '0%',
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 65%)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '600px', height: '400px',
                bottom: '10%', right: '5%',
                background: 'radial-gradient(ellipse, rgba(16,185,129,0.14) 0%, transparent 65%)',
              }}
            />
          </div>

          {/* Ethereal Anime Celestial Core / Star Seed */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            initial={{ scale: 0.1, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Concentric Rotating Astrolabe Rings */}
            <motion.div
              className="absolute rounded-full border border-violet-400/30"
              style={{ width: '220px', height: '220px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </motion.div>

            <motion.div
              className="absolute rounded-full border border-emerald-400/20"
              style={{ width: '170px', height: '170px' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />

            {/* Radiant Celestial Halo */}
            <motion.div
              className="absolute rounded-full"
              style={{ width: '130px', height: '130px' }}
              animate={{
                boxShadow: [
                  '0 0 35px 10px rgba(139,92,246,0.4), 0 0 70px 25px rgba(16,185,129,0.25)',
                  '0 0 55px 20px rgba(16,185,129,0.5), 0 0 90px 35px rgba(139,92,246,0.35)',
                  '0 0 35px 10px rgba(139,92,246,0.4), 0 0 70px 25px rgba(16,185,129,0.25)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glowing Diamond Prism Core */}
            <motion.div
              className="relative z-10"
              animate={{
                rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
                scale: [1, 1.08, 1],
              }}
              transition={{
                rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <svg width="74" height="74" viewBox="0 0 74 74" fill="none">
                <defs>
                  <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#6ee7b7" />
                    <stop offset="70%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#00f0ff" />
                  </linearGradient>
                </defs>
                {/* 8-pointed celestial geometric star */}
                <polygon
                  points="37,4 44,28 68,28 48,43 56,67 37,51 18,67 26,43 6,28 30,28"
                  fill="url(#coreGrad)"
                  filter="drop-shadow(0 0 12px rgba(255,255,255,0.9))"
                />
                <circle cx="37" cy="37" r="6" fill="#ffffff" />
              </svg>
            </motion.div>

            {/* Ethereal Stardust Embers Trail */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  background: i % 2 === 0 ? '#6ee7b7' : '#c084fc',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#6ee7b7' : '#c084fc'}`,
                }}
                animate={{
                  x: [0, (Math.cos((i * 30 * Math.PI) / 180) * 85)],
                  y: [0, (Math.sin((i * 30 * Math.PI) / 180) * 85)],
                  opacity: [0.9, 0],
                  scale: [1, 0.2],
                }}
                transition={{
                  duration: 2 + (i % 3) * 0.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>

          {/* Mature Cinematic Prologue Subtitles */}
          <motion.div
            className="absolute bottom-16 md:bottom-20 text-center px-6 z-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-violet-400/40" />
              <span className="text-[10px] md:text-xs font-mono tracking-[0.35em] text-violet-300 uppercase">
                PROLOGUE // CELESTIAL AWAKENING
              </span>
              <span className="w-8 h-[1px] bg-violet-400/40" />
            </div>
            <p className="font-serif italic text-lg md:text-2xl text-slate-200 tracking-wide max-w-md">
              &ldquo;Across a billion lightyears, a destined light begins its journey...&rdquo;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
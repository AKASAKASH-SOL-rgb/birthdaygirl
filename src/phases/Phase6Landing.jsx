import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

export default function Phase6Landing({ onComplete }) {
  const [cracks, setCracks] = useState(0)
  const [shattering, setShattering] = useState(false)

  const handleStarClick = () => {
    if (shattering || cracks >= 3) return
    const newCracks = cracks + 1
    setCracks(newCracks)
    if (newCracks >= 3) {
      setShattering(true)
      setTimeout(() => onComplete(), 1600)
    }
  }

  const glowColor = cracks === 0 ? '#a78bfa' : cracks === 1 ? '#6ee7b7' : cracks === 2 ? '#fde047' : '#ffffff'

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start"
      style={{
        background: 'linear-gradient(to bottom, #030014 0%, #0a0428 50%, #050a1a 100%)',
      }}
    >
      <Starfield count={220} speed={0.12} />

      {/* Shinkai Twilight Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft violet nebula glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: '700px', height: '500px',
            top: '0%', left: '50%', transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 65%)',
          }}
        />

        {/* Ethereal Crescent Moon */}
        <div
          className="absolute rounded-full"
          style={{
            width: '64px', height: '64px',
            top: '8%', right: '12%',
            boxShadow: '-8px 6px 0 2px #fef08a, 0 0 25px rgba(254,240,138,0.4)',
          }}
        />
      </div>

      {/* Silhouette Grassy Twilight Knoll */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 220" className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08031d" />
              <stop offset="40%" stopColor="#04020f" />
              <stop offset="100%" stopColor="#010006" />
            </linearGradient>
            <linearGradient id="grassBlade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Majestic Rolling Hill Horizon */}
          <path d="M0,90 Q380,45 720,75 Q1060,105 1440,65 L1440,220 L0,220 Z" fill="url(#hillGrad)" />

          {/* Bioluminescent Anime Grass Blades */}
          {[...Array(40)].map((_, i) => {
            const x = i * 36 + ((i * 17) % 20)
            const h = 25 + ((i * 13) % 25)
            return (
              <path
                key={i}
                d={`M${x},80 Q${x - 4},${80 - h * 0.6} ${x - 2},${80 - h}`}
                stroke="url(#grassBlade)"
                strokeWidth={i % 3 === 0 ? "1.8" : "1.2"}
                fill="none"
                opacity={0.7}
              />
            )
          })}
        </svg>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center min-h-screen pb-24 px-4">
        {/* Cinematic Title Header */}
        <motion.div
          className="text-center mb-8 max-w-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-violet-400/50" />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-violet-300">
              DESCENT // THE CELESTIAL PRISM
            </span>
            <span className="w-6 h-[1px] bg-violet-400/50" />
          </div>

          <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-2 drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]">
            The Awakening
          </h2>
          <p className="text-slate-300 font-serif italic text-base md:text-lg">
            Tap the fallen crystal{' '}
            <span className="font-semibold text-emerald-400">3 times</span>{' '}
            to release its memories.
          </p>

          {/* Sleek Energy Counter */}
          <div className="flex gap-2.5 justify-center mt-3.5">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-violet-400/40"
                style={{
                  background: i < cracks ? '#10b981' : 'transparent',
                  boxShadow: i < cracks ? '0 0 12px #10b981, 0 0 24px #10b981' : 'none',
                  borderColor: i < cracks ? '#6ee7b7' : 'rgba(255,255,255,0.2)',
                }}
                animate={i < cracks ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* The Fallen Celestial Star Crystal */}
        <motion.div
          className="relative cursor-pointer select-none"
          onClick={handleStarClick}
          animate={
            shattering
              ? { scale: [1, 1.6, 0], opacity: [1, 1, 0], rotate: [0, 20, -20, 0] }
              : { y: [0, -8, 0] }
          }
          transition={
            shattering
              ? { duration: 0.85, ease: 'easeOut' }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={{ scale: shattering ? 1 : 1.08 }}
          whileTap={{ scale: shattering ? 1 : 0.95 }}
        >
          {/* Prismatic Aura Ring */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ transform: 'scale(1.4)' }}
            animate={{
              boxShadow: [
                `0 0 35px ${glowColor}60, 0 0 70px ${glowColor}30`,
                `0 0 55px ${glowColor}90, 0 0 100px ${glowColor}50`,
                `0 0 35px ${glowColor}60, 0 0 70px ${glowColor}30`,
              ],
            }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />

          {/* Faceted Anime Celestial Crystal SVG */}
          <div className="relative w-36 h-36 md:w-44 md:h-44">
            <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="facetA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>
                <linearGradient id="facetB" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="60%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
                <linearGradient id="facetC" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>

              {/* Central 8-Pointed Star Prism Facets */}
              <polygon points="80,10 95,65 150,80 95,95 80,150 65,95 10,80 65,65" fill="url(#facetA)" stroke="#fff" strokeWidth="1" />
              <polygon points="80,25 90,68 135,80 90,92 80,135 70,92 25,80 70,68" fill="url(#facetB)" opacity="0.85" />
              <polygon points="80,45 86,72 115,80 86,88 80,115 74,88 45,80 74,72" fill="url(#facetC)" opacity="0.9" />

              {/* Geometric Facet Lines */}
              <line x1="80" y1="10" x2="80" y2="150" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
              <line x1="10" y1="80" x2="150" y2="80" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
              <line x1="25" y1="25" x2="135" y2="135" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
              <line x1="135" y1="25" x2="25" y2="135" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />

              {/* Internal Glowing Energy Core */}
              <circle cx="80" cy="80" r={8 + cracks * 5} fill="#ffffff" filter="drop-shadow(0 0 10px #6ee7b7)" />

              {/* Fracture Veins on Taps */}
              {cracks >= 1 && (
                <path d="M80,80 L95,60 L110,65" stroke="#6ee7b7" strokeWidth="2.5" fill="none" filter="drop-shadow(0 0 6px #6ee7b7)" />
              )}
              {cracks >= 2 && (
                <>
                  <path d="M80,80 L65,100 L50,95" stroke="#6ee7b7" strokeWidth="2.5" fill="none" filter="drop-shadow(0 0 6px #6ee7b7)" />
                  <path d="M80,80 L88,110 L102,118" stroke="#fbbf24" strokeWidth="2.5" fill="none" filter="drop-shadow(0 0 6px #fbbf24)" />
                </>
              )}
            </svg>
          </div>

          {/* Prismatic Beams on Tap */}
          {cracks > 0 && !shattering && (
            <>
              {[...Array(cracks * 6)].map((_, i) => (
                <motion.div
                  key={`beam-${cracks}-${i}`}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{
                    background: i % 2 === 0 ? '#6ee7b7' : '#c084fc',
                    left: '50%', top: '50%',
                    boxShadow: `0 0 10px ${i % 2 === 0 ? '#6ee7b7' : '#c084fc'}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * 30 * Math.PI) / 180) * (60 + Math.random() * 40),
                    y: Math.sin((i * 30 * Math.PI) / 180) * (60 + Math.random() * 40),
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Supernova Shatter Beams */}
        <AnimatePresence>
          {shattering && (
            <>
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none z-30"
                  style={{
                    width: '3px',
                    height: '24px',
                    background: i % 3 === 0 ? '#ffffff' : i % 2 === 0 ? '#6ee7b7' : '#c084fc',
                    left: '50%', top: '50%',
                    boxShadow: '0 0 15px #fff',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scaleY: 1 }}
                  animate={{
                    x: Math.cos((i * 15 * Math.PI) / 180) * 450,
                    y: Math.sin((i * 15 * Math.PI) / 180) * 450,
                    opacity: 0,
                    scaleY: 4,
                  }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
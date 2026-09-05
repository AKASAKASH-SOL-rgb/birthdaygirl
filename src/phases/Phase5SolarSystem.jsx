import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

const planets = [
  { name: 'Mars', x: '14%', y: '45%', size: 32, color: '#f87171', glow: '#ef4444' },
  { name: 'Jupiter', x: '26%', y: '28%', size: 56, color: '#fcd34d', glow: '#f59e0b' },
  { name: 'Saturn', x: '62%', y: '22%', size: 48, color: '#fed7aa', glow: '#fb923c', hasRing: true },
  { name: 'Neptune', x: '82%', y: '48%', size: 36, color: '#60a5fa', glow: '#3b82f6' },
]

export default function Phase5SolarSystem({ onComplete }) {
  const [earthClicked, setEarthClicked] = useState(false)
  const [impacting, setImpacting] = useState(false)

  const handleEarthClick = () => {
    if (earthClicked) return
    setEarthClicked(true)
    setImpacting(true)
    setTimeout(() => onComplete(), 1800)
  }

  return (
    <div className="relative w-full min-h-screen bg-[#02000d] overflow-hidden flex flex-col items-center justify-center px-4">
      <Starfield count={260} speed={0.15} />

      {/* Atmospheric Solar Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '350px', height: '350px',
          left: '-100px', top: '50%', transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(245,158,11,0.1) 45%, transparent 70%)',
        }}
      />

      {/* Header text */}
      <motion.div
        className="relative z-10 text-center mb-6 max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-cyan-400/50" />
          <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-cyan-400">
            SOLAR SYSTEM // ORBITAL ENTRY
          </span>
          <span className="w-6 h-[1px] bg-cyan-400/50" />
        </div>

        <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-2 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
          Terra In Sight
        </h2>
        <p className="text-slate-300 font-serif italic text-base md:text-lg">
          &ldquo;You are now entering this world, destined to illuminate the lives around you...&rdquo;
        </p>
      </motion.div>

      {/* Solar system scene */}
      <div className="relative w-full max-w-4xl h-72 md:h-84 z-10 flex items-center justify-center">
        {/* Orbital Trajectory Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400">
          <ellipse cx="400" cy="200" rx="360" ry="120" stroke="#60a5fa" strokeWidth="0.8" fill="none" strokeDasharray="5 5" />
          <ellipse cx="400" cy="200" rx="260" ry="85" stroke="#a78bfa" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
        </svg>

        {/* Other planets with soft anime glow */}
        {planets.map((planet, i) => (
          <motion.div
            key={planet.name}
            className="absolute pointer-events-none"
            style={{ left: planet.x, top: planet.y, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.85, scale: 1, y: [0, -5, 0] }}
            transition={{
              opacity: { delay: 0.4 + i * 0.1, duration: 0.6 },
              scale: { delay: 0.4 + i * 0.1, duration: 0.6 },
              y: { duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
            }}
          >
            <div className="relative flex flex-col items-center">
              <div
                className="rounded-full"
                style={{
                  width: planet.size, height: planet.size,
                  background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${planet.color} 50%, #000 100%)`,
                  boxShadow: `0 0 15px ${planet.glow}50`,
                }}
              />
              {planet.hasRing && (
                <div
                  className="absolute"
                  style={{
                    width: planet.size * 2, height: planet.size * 0.38,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%) rotateX(75deg)',
                    border: `3px solid ${planet.color}80`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <span className="text-slate-500 text-[10px] font-mono mt-1.5 uppercase tracking-wider">{planet.name}</span>
            </div>
          </motion.div>
        ))}

        {/* Majestic Anime Earth */}
        <motion.div
          className="absolute cursor-pointer select-none"
          style={{ left: '46%', top: '50%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.6, duration: 0.8 },
            scale: { delay: 0.6, duration: 0.8, type: 'spring', stiffness: 140 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          onClick={handleEarthClick}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-3">
            {/* Earth Sphere with Atmospheric Rim */}
            <div className="relative" style={{ width: '100px', height: '100px' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  {/* Planet sphere gradient */}
                  <radialGradient id="earthSphere" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="25%" stopColor="#3b82f6" />
                    <stop offset="60%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#030712" />
                  </radialGradient>
                  {/* Atmospheric cyan rim */}
                  <radialGradient id="atmoRim" cx="40%" cy="35%" r="65%">
                    <stop offset="65%" stopColor="transparent" />
                    <stop offset="95%" stopColor="rgba(0, 240, 255, 0.7)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0.9)" />
                  </radialGradient>
                </defs>

                {/* Ocean Sphere */}
                <circle cx="50" cy="50" r="44" fill="url(#earthSphere)" />

                {/* Stylized Continents */}
                <path
                  d="M32,36 Q45,28 56,38 Q62,48 48,52 Q35,58 28,48 Z"
                  fill="#10b981"
                  opacity="0.8"
                />
                <path
                  d="M58,45 Q70,42 66,58 Q55,68 50,58 Z"
                  fill="#10b981"
                  opacity="0.75"
                />

                {/* Soft White Cloud Swirls */}
                <path
                  d="M26,38 Q42,32 58,42"
                  stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" fill="none"
                />
                <path
                  d="M40,55 Q56,58 72,50"
                  stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none"
                />

                {/* Atmospheric Glow Rim */}
                <circle cx="50" cy="50" r="48" fill="url(#atmoRim)" />
              </svg>

              {/* Pulsing Target Halo */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 25px rgba(0, 240, 255, 0.4), 0 0 50px rgba(59, 130, 246, 0.2)',
                    '0 0 45px rgba(0, 240, 255, 0.75), 0 0 80px rgba(59, 130, 246, 0.45)',
                    '0 0 25px rgba(0, 240, 255, 0.4), 0 0 50px rgba(59, 130, 246, 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Target Label */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-cyan-300">
                TERRA // TARGET
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Prompt */}
      {!earthClicked && (
        <motion.p
          className="relative z-10 text-slate-400/70 text-xs font-mono uppercase tracking-[0.25em] mt-4"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✦ touch earth to commence atmospheric entry ✦
        </motion.p>
      )}

      {/* Atmospheric Entry Shockwave */}
      <AnimatePresence>
        {impacting && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-white shadow-[0_0_50px_#fff]"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: [1, 40, 80], opacity: [1, 0.9, 0] }}
              transition={{ duration: 1.5, ease: 'easeIn' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
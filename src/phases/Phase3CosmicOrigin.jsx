import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

const sectors = [
  {
    id: 1,
    name: 'Andromeda Nebula',
    code: 'SEC-01 // ALPHA',
    x: '22%',
    y: '42%',
    color: '#6ee7b7',
    desc: 'Luminous cradle of ancient starlight',
  },
  {
    id: 2,
    name: 'Whirlpool Core',
    code: 'SEC-02 // VORTEX',
    x: '50%',
    y: '30%',
    color: '#c084fc',
    desc: 'Spiral vortex of cosmic memories',
  },
  {
    id: 3,
    name: 'Sombrero Ridge',
    code: 'SEC-03 // AURA',
    x: '78%',
    y: '55%',
    color: '#fbbf24',
    desc: 'Golden boundary of the outer rim',
  },
]

export default function Phase3CosmicOrigin({ onComplete }) {
  const [selected, setSelected] = useState(null)
  const [warpActive, setWarpActive] = useState(false)

  const handleSectorClick = (id) => {
    if (selected) return
    setSelected(id)
    setWarpActive(true)
    setTimeout(() => onComplete(), 1600)
  }

  return (
    <div className="relative w-full min-h-screen bg-[#02000d] overflow-hidden flex flex-col items-center justify-center px-4">
      <Starfield count={260} speed={warpActive ? 2.5 : 0.15} />

      {/* Atmospheric Aurora Nebulae */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: '750px', height: '550px',
            top: '-15%', left: '-10%',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '700px', height: '600px',
            bottom: '-15%', right: '-10%',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.16) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Title & Cinematic Narrative */}
      <motion.div
        className="relative z-10 text-center mb-6 max-w-xl"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-emerald-400/50" />
          <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-emerald-400">
            ASTRAL CARTOGRAPHY // ORIGIN SELECT
          </span>
          <span className="w-6 h-[1px] bg-emerald-400/50" />
        </div>

        <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-white tracking-wide mb-2 drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]">
          Cosmic Origin
        </h2>
        <p className="text-sm md:text-base font-serif italic text-slate-300">
          Where in the deep expanse did this shooting star originate?
        </p>
      </motion.div>

      {/* Celestial Astrolabe Star Map */}
      <div className="relative w-full max-w-4xl h-80 md:h-[420px] z-10 flex items-center justify-center">
        {/* Concentric Coordinate Rings (Astrolabe) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400">
          <circle cx="400" cy="200" r="180" stroke="#8B5CF6" strokeWidth="1" fill="none" strokeDasharray="4 6" />
          <circle cx="400" cy="200" r="120" stroke="#10B981" strokeWidth="0.8" fill="none" />
          <circle cx="400" cy="200" r="60" stroke="#8B5CF6" strokeWidth="0.5" fill="none" />
          <line x1="50" y1="200" x2="750" y2="200" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="400" y1="20" x2="400" y2="380" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>

        {/* Origin Nodes / Sectors */}
        {sectors.map((sec, idx) => {
          const isSelected = selected === sec.id
          return (
            <motion.div
              key={sec.id}
              className="absolute cursor-pointer select-none"
              style={{ left: sec.x, top: sec.y, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.15, duration: 0.6 }}
              onClick={() => handleSectorClick(sec.id)}
            >
              <motion.div
                className="flex flex-col items-center gap-2 group"
                animate={isSelected ? { scale: 1.3 } : { y: [0, -6, 0] }}
                transition={isSelected ? { duration: 0.5 } : { duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.15 }}
              >
                {/* Node Core Orb */}
                <div className="relative flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                  {/* Outer Orbiting Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-dashed"
                    style={{ borderColor: `${sec.color}70` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Pulsing Glow Aura */}
                  <motion.div
                    className="absolute inset-2 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${sec.color}80 0%, ${sec.color}20 60%, transparent 80%)`,
                      boxShadow: `0 0 25px ${sec.color}60`,
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                  />

                  {/* Center Star Diamond */}
                  <div
                    className="w-4 h-4 rounded-sm rotate-45 border border-white"
                    style={{ background: sec.color, boxShadow: `0 0 10px #fff` }}
                  />
                </div>

                {/* Node Labels */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400">
                    {sec.code}
                  </span>
                  <span
                    className="font-cinzel font-bold text-xs md:text-sm tracking-wider uppercase"
                    style={{ color: sec.color, textShadow: `0 0 12px ${sec.color}` }}
                  >
                    {sec.name}
                  </span>
                  <span className="text-[10px] font-serif italic text-slate-400/80 max-w-[140px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {sec.desc}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )
        })}

        {/* Warp Streak on Selection */}
        <AnimatePresence>
          {warpActive && (
            <motion.div
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-white shadow-[0_0_40px_#fff]"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 30, opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeIn' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guide prompt */}
      <motion.p
        className="relative z-10 text-slate-400/70 text-xs font-mono uppercase tracking-[0.25em] mt-4"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        ✦ select a coordinate sector to initiate trajectory ✦
      </motion.p>
    </div>
  )
}
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

const galaxies = [
  { id: 1, name: 'Andromeda', x: '20%', y: '40%', color: '#39FF14' },
  { id: 2, name: 'Whirlpool', x: '50%', y: '30%', color: '#8B5CF6' },
  { id: 3, name: 'Sombrero', x: '75%', y: '55%', color: '#FFD700' },
]

export default function Phase3CosmicOrigin({ onComplete }) {
  const [selected, setSelected] = useState(null)
  const [shooting, setShooting] = useState(false)

  const handleGalaxyClick = (id) => {
    if (selected) return
    setSelected(id)
    setShooting(true)
    setTimeout(() => onComplete(), 1800)
  }

  return (
    <div className="relative w-full min-h-screen bg-[#000008] overflow-hidden flex flex-col items-center justify-center">
      <Starfield count={250} speed={0.1} />

      {/* Nebula backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full animate-nebula" style={{
          width: '700px', height: '500px', top: '-10%', left: '-10%',
          background: 'radial-gradient(ellipse, rgba(57,255,20,0.12) 0%, transparent 60%)',
        }} />
        <div className="absolute rounded-full animate-nebula" style={{
          width: '600px', height: '600px', bottom: '-15%', right: '-15%',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 60%)',
          animationDelay: '2s',
        }} />
        <div className="absolute rounded-full animate-nebula" style={{
          width: '400px', height: '400px', top: '30%', left: '40%',
          background: 'radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, transparent 60%)',
          animationDelay: '1s',
        }} />
      </div>

      {/* Title */}
      <motion.div
        className="relative z-10 text-center mb-8 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold font-['Cinzel'] glow-violet mb-3 text-white">
          Cosmic Origin
        </h2>
        <p className="text-lg md:text-xl text-white/70 font-['Nunito'] tracking-wide">
          Where did this shooting star originate?
        </p>
        <p className="text-sm text-white/40 mt-2 font-['Nunito']">
          ✦ Choose a galaxy to begin the journey ✦
        </p>
      </motion.div>

      {/* Galaxy map area */}
      <div className="relative w-full max-w-4xl h-80 md:h-96 z-10">
        {/* Grid lines for "map" effect */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 400">
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#8B5CF6" strokeWidth="0.5" />
          ))}
          {[...Array(16)].map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="#8B5CF6" strokeWidth="0.5" />
          ))}
          <ellipse cx="400" cy="200" rx="390" ry="190" stroke="#39FF14" strokeWidth="1" fill="none" strokeDasharray="8 4" />
        </svg>

        {/* Galaxies */}
        {galaxies.map((galaxy, idx) => (
          <motion.div
            key={galaxy.id}
            className="absolute cursor-pointer select-none"
            style={{ left: galaxy.x, top: galaxy.y, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + idx * 0.2, duration: 0.6, type: 'spring' }}
            onClick={() => handleGalaxyClick(galaxy.id)}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + idx, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
              whileHover={{ scale: 1.2 }}
            >
              {/* Galaxy spiral SVG */}
              <motion.div
                style={{ width: '70px', height: '70px', position: 'relative' }}
                animate={selected === galaxy.id ? { scale: [1, 1.5, 0], opacity: [1, 1, 0] } : {}}
                transition={{ duration: 0.6 }}
              >
                <svg viewBox="0 0 70 70">
                  <defs>
                    <radialGradient id={`gGrad${galaxy.id}`}>
                      <stop offset="0%" stopColor={galaxy.color} stopOpacity="1" />
                      <stop offset="60%" stopColor={galaxy.color} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={galaxy.color} stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="35" cy="35" r="30" fill={`url(#gGrad${galaxy.id})`} />
                  <path
                    d="M35,15 Q55,25 50,35 Q45,45 35,40 Q20,35 25,25 Q30,15 35,35"
                    stroke={galaxy.color} strokeWidth="2" fill="none" opacity="0.8"
                  />
                  <path
                    d="M35,55 Q15,45 20,35 Q25,25 35,30 Q50,35 45,45 Q40,55 35,35"
                    stroke={galaxy.color} strokeWidth="1.5" fill="none" opacity="0.5"
                  />
                  <circle cx="35" cy="35" r="4" fill="white" opacity="0.9" />
                </svg>
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  style={{ boxShadow: `0 0 20px ${galaxy.color}, 0 0 40px ${galaxy.color}40` }}
                />
              </motion.div>

              <span
                className="text-xs font-bold tracking-widest uppercase font-['Nunito']"
                style={{ color: galaxy.color, textShadow: `0 0 8px ${galaxy.color}` }}
              >
                {galaxy.name}
              </span>
            </motion.div>
          </motion.div>
        ))}

        {/* Shooting star animation when selected */}
        <AnimatePresence>
          {shooting && (
            <motion.div
              className="absolute z-20 flex items-center"
              initial={{ x: '50%', y: '50%', scale: 0.5, opacity: 0 }}
              animate={{ x: '110%', y: '-20%', scale: 2.5, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeIn' }}
              style={{ top: 0, left: 0 }}
            >
              <div className="text-4xl">⭐</div>
              <div
                className="w-24 h-1 rounded-full"
                style={{ background: 'linear-gradient(to left, transparent, #39FF14)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative floating elements */}
      {['✦', '✧', '✦', '✧'].map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-violet-400 text-lg pointer-events-none"
          style={{
            left: `${10 + i * 22}%`,
            bottom: `${15 + (i % 2) * 10}%`,
            opacity: 0.5,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  )
}

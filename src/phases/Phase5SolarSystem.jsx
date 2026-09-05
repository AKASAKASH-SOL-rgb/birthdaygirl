import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

const planets = [
  { name: 'Mars', x: '12%', y: '45%', size: 36, color: '#CD5C5C', glow: '#CD5C5C' },
  { name: 'Jupiter', x: '25%', y: '30%', size: 60, color: '#C88B3A', glow: '#C88B3A' },
  { name: 'Saturn', x: '60%', y: '25%', size: 52, color: '#D4AF37', glow: '#D4AF37', hasRing: true },
  { name: 'Neptune', x: '80%', y: '50%', size: 38, color: '#4169E1', glow: '#4169E1' },
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
    <div className="relative w-full min-h-screen bg-[#000008] overflow-hidden flex flex-col items-center justify-center">
      <Starfield count={250} speed={0.1} />

      {/* Distant Sun glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '200px', height: '200px',
          left: '-60px', top: '50%', transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,165,0,0.5) 30%, transparent 70%)',
        }}
      />

      {/* Header text */}
      <motion.div
        className="relative z-10 text-center mb-4 px-4 max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-4xl font-bold font-['Cinzel'] text-white mb-2" style={{
          textShadow: '0 0 20px rgba(57,255,20,0.6)',
        }}>
          Our Solar System
        </h2>
        <p className="text-white/60 font-['Nunito'] text-base md:text-lg">
          You are now entering the world, destined to lighten up the whole universe...
        </p>
      </motion.div>

      {/* Solar system scene */}
      <div className="relative w-full max-w-4xl h-64 md:h-80 z-10">

        {/* Other planets */}
        {planets.map((planet, i) => (
          <motion.div
            key={planet.name}
            className="absolute pointer-events-none"
            style={{ left: planet.x, top: planet.y, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { delay: 0.4 + i * 0.1, duration: 0.6 },
              scale: { delay: 0.4 + i * 0.1, duration: 0.6 },
              y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
            }}
          >
            <div className="relative flex flex-col items-center">
              <div
                className="rounded-full"
                style={{
                  width: planet.size, height: planet.size,
                  background: `radial-gradient(circle at 35% 35%, white, ${planet.color})`,
                  boxShadow: `0 0 15px ${planet.glow}60`,
                }}
              />
              {planet.hasRing && (
                <div
                  className="absolute"
                  style={{
                    width: planet.size * 1.9, height: planet.size * 0.35,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%) rotateX(75deg)',
                    border: `4px solid ${planet.color}80`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <span className="text-white/30 text-xs mt-1 font-['Nunito']">{planet.name}</span>
            </div>
          </motion.div>
        ))}

        {/* Earth - the clickable one */}
        <motion.div
          className="absolute cursor-pointer"
          style={{ left: '46%', top: '50%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 0.8, duration: 0.8 },
            scale: { delay: 0.8, duration: 0.8, type: 'spring' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
          onClick={handleEarthClick}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-2">
            {/* Earth SVG */}
            <div className="relative" style={{ width: '90px', height: '90px' }}>
              <svg viewBox="0 0 90 90" className="w-full h-full">
                <defs>
                  <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="30%" stopColor="#1E90FF" />
                    <stop offset="70%" stopColor="#006400" />
                    <stop offset="100%" stopColor="#00008B" />
                  </radialGradient>
                  <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="60%" stopColor="transparent" />
                    <stop offset="100%" stopColor="rgba(57,255,20,0.5)" />
                  </radialGradient>
                </defs>
                <circle cx="45" cy="45" r="40" fill="url(#earthGrad)" />
                {/* Continents */}
                <ellipse cx="35" cy="38" rx="12" ry="8" fill="rgba(34,139,34,0.8)" transform="rotate(-15 35 38)" />
                <ellipse cx="55" cy="42" rx="8" ry="12" fill="rgba(34,139,34,0.7)" transform="rotate(20 55 42)" />
                <ellipse cx="45" cy="58" rx="10" ry="6" fill="rgba(34,139,34,0.6)" />
                {/* Glow */}
                <circle cx="45" cy="45" r="44" fill="url(#earthGlow)" />
              </svg>
              {/* Pulsing glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{ boxShadow: [
                  '0 0 20px rgba(57,255,20,0.6), 0 0 40px rgba(57,255,20,0.3)',
                  '0 0 40px rgba(57,255,20,0.9), 0 0 80px rgba(57,255,20,0.5)',
                  '0 0 20px rgba(57,255,20,0.6), 0 0 40px rgba(57,255,20,0.3)',
                ]}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <motion.span
              className="text-sm font-bold font-['Nunito'] glow-green"
              style={{ color: '#39FF14' }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ▼ EARTH ▼
            </motion.span>
          </div>
        </motion.div>

        {/* Asteroid belt hint */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ left: '35%', top: '50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{
                left: `${Math.cos((angle * Math.PI) / 180) * 130}px`,
                top: `${Math.sin((angle * Math.PI) / 180) * 130}px`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Click prompt */}
      {!earthClicked && (
        <motion.p
          className="relative z-10 text-white/50 text-sm font-['Nunito'] tracking-widest mt-4"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✦ Click Earth to continue ✦
        </motion.p>
      )}

      {/* Impact effect */}
      <AnimatePresence>
        {impacting && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.3, 0] }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(57,255,20,0.8) 0%, rgba(139,92,246,0.6) 30%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

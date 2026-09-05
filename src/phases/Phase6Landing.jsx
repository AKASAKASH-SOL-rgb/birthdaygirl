import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const glowColor = cracks === 0 ? '#8B5CF6' : cracks === 1 ? '#39FF14' : cracks === 2 ? '#FFD700' : '#ffffff'
  const glowIntensity = 20 + cracks * 20

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-end justify-start"
      style={{
        background: 'linear-gradient(to bottom, #000008 0%, #050a1a 40%, #0a1a0a 100%)',
      }}
    >
      {/* Night sky stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              background: 'white',
              opacity: Math.random() * 0.7 + 0.2,
              animation: `twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        {/* Moon */}
        <div
          className="absolute rounded-full"
          style={{
            width: '60px', height: '60px',
            top: '8%', right: '10%',
            background: 'radial-gradient(circle at 40% 40%, #FFF8E7, #D4C5A0)',
            boxShadow: '0 0 20px rgba(255,248,231,0.4)',
          }}
        />
      </div>

      {/* Chibi grassy ground */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 200" className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="30%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#052e16" />
            </linearGradient>
          </defs>
          {/* Ground base */}
          <path d="M0,80 Q360,40 720,70 Q1080,100 1440,60 L1440,200 L0,200 Z" fill="url(#grassGrad)" />
          {/* Grass blades */}
          {[...Array(30)].map((_, i) => {
            const x = i * 48 + Math.random() * 30
            return (
              <g key={i}>
                <path d={`M${x},80 Q${x-8},50 ${x-5},40`} stroke="#4ade80" strokeWidth="2" fill="none" />
                <path d={`M${x+5},78 Q${x+12},48 ${x+8},38`} stroke="#4ade80" strokeWidth="2" fill="none" />
                <path d={`M${x+2},82 Q${x+2},55 ${x},45`} stroke="#86efac" strokeWidth="1.5" fill="none" />
              </g>
            )
          })}
          {/* Small flowers */}
          {[200, 500, 850, 1100, 1350].map((fx, i) => (
            <g key={i}>
              <circle cx={fx} cy="65" r="4" fill={i % 2 === 0 ? '#8B5CF6' : '#39FF14'} opacity="0.8" />
              <circle cx={fx-6} cy="70" r="3" fill="white" opacity="0.6" />
            </g>
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center" style={{ minHeight: '100vh', paddingBottom: '120px' }}>
        {/* Title */}
        <motion.div
          className="text-center mb-6 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold font-['Cinzel'] text-white mb-3"
            style={{ textShadow: '0 0 20px rgba(139,92,246,0.8)' }}>
            The Landing
          </h2>
          <p className="text-white/70 font-['Nunito'] text-base md:text-lg">
            Tap the star fragment{' '}
            <span className="font-bold" style={{ color: '#39FF14' }}>3 times</span>{' '}
            to awaken its magic.
          </p>
          {/* Tap counter */}
          <div className="flex gap-3 justify-center mt-3">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full border-2"
                style={{
                  borderColor: i < cracks ? '#39FF14' : '#ffffff40',
                  background: i < cracks ? '#39FF14' : 'transparent',
                  boxShadow: i < cracks ? '0 0 8px #39FF14' : 'none',
                }}
                animate={i < cracks ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* The star fragment */}
        <motion.div
          className="relative cursor-pointer select-none"
          onClick={handleStarClick}
          animate={shattering
            ? { scale: [1, 1.5, 0], opacity: [1, 1, 0], rotate: [0, 15, -15, 0] }
            : { y: [0, -8, 0] }
          }
          transition={shattering
            ? { duration: 0.8, ease: 'easeOut' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={{ scale: shattering ? 1 : 1.08 }}
          whileTap={{ scale: shattering ? 1 : 0.95 }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ transform: 'scale(1.3)' }}
            animate={{
              boxShadow: [
                `0 0 ${glowIntensity}px ${glowColor}, 0 0 ${glowIntensity * 2}px ${glowColor}60`,
                `0 0 ${glowIntensity * 1.5}px ${glowColor}, 0 0 ${glowIntensity * 3}px ${glowColor}80`,
                `0 0 ${glowIntensity}px ${glowColor}, 0 0 ${glowIntensity * 2}px ${glowColor}60`,
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          <svg viewBox="0 0 140 140" style={{ width: '140px', height: '140px' }}>
            <defs>
              <radialGradient id="fragGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor={glowColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.7" />
              </radialGradient>
            </defs>

            {/* Main star */}
            <polygon
              points="70,8 84,50 130,50 95,74 108,118 70,92 32,118 45,74 10,50 56,50"
              fill="url(#fragGrad)"
              stroke={glowColor}
              strokeWidth="2"
            />

            {/* Crack lines based on crack count */}
            {cracks >= 1 && (
              <line x1="70" y1="50" x2="90" y2="80" stroke="rgba(0,0,0,0.6)" strokeWidth="2" />
            )}
            {cracks >= 2 && (
              <>
                <line x1="70" y1="50" x2="50" y2="82" stroke="rgba(0,0,0,0.6)" strokeWidth="2" />
                <line x1="70" y1="50" x2="70" y2="92" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
              </>
            )}

            {/* Chibi face */}
            <circle cx="64" cy="64" r="4" fill="#000008" />
            <circle cx="76" cy="64" r="4" fill="#000008" />
            <circle cx="65.5" cy="62.5" r="1.5" fill="white" />
            <circle cx="77.5" cy="62.5" r="1.5" fill="white" />
            {cracks >= 2
              ? <path d="M63 73 Q70 78 77 73" stroke="#000008" strokeWidth="2" strokeLinecap="round" fill="none" />
              : <path d="M63 72 Q70 68 77 72" stroke="#000008" strokeWidth="2" strokeLinecap="round" fill="none" />
            }
          </svg>

          {/* Particle sparks on each tap */}
          {cracks > 0 && !shattering && (
            <>
              {[...Array(cracks * 4)].map((_, i) => (
                <motion.div
                  key={`spark-${cracks}-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                  style={{
                    background: i % 2 === 0 ? '#39FF14' : '#8B5CF6',
                    left: '50%', top: '50%',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * 45 * Math.PI) / 180) * (40 + Math.random() * 20),
                    y: Math.sin((i * 45 * Math.PI) / 180) * (40 + Math.random() * 20),
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.6, delay: 0.05 * i }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Shatter particles */}
        <AnimatePresence>
          {shattering && (
            <>
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full pointer-events-none"
                  style={{
                    background: [glowColor, '#39FF14', '#8B5CF6', '#FFD700'][i % 4],
                    left: '50%', top: '50%',
                    zIndex: 30,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * 22.5 * Math.PI) / 180) * (80 + i * 8),
                    y: Math.sin((i * 22.5 * Math.PI) / 180) * (80 + i * 8),
                    opacity: 0,
                    scale: 2,
                  }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

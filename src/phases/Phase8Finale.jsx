import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONFETTI_COLORS = [
  '#39FF14', '#8B5CF6', '#FFD700', '#FF69B4', '#00BFFF',
  '#FF4500', '#7FFF00', '#DA70D6', '#FFD700', '#00FA9A',
]

function Confetto({ x, color, delay, size }) {
  const startY = -20
  const endY = window.innerHeight + 40
  return (
    <motion.div
      className="fixed pointer-events-none rounded-sm z-40"
      style={{
        left: x,
        top: startY,
        width: size,
        height: size * 0.6,
        background: color,
        originX: 0.5,
        originY: 0.5,
      }}
      initial={{ y: startY, rotate: 0, opacity: 1 }}
      animate={{
        y: endY,
        rotate: [0, 180, 360, 540, 720],
        opacity: [1, 1, 1, 0.8, 0],
        x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        ease: 'linear',
      }}
    />
  )
}

const confetti = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * window.innerWidth,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  delay: Math.random() * 2,
  size: 8 + Math.random() * 10,
}))

export default function Phase8Finale() {
  const [blown, setBlown] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleFlameClick = () => {
    if (blown) return
    setBlown(true)
    setShowConfetti(true)
    setTimeout(() => setShowBanner(true), 600)
  }

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: showBanner
          ? 'radial-gradient(ellipse at center, #0d0b1e 0%, #000008 100%)'
          : 'radial-gradient(ellipse at center, #0a0a1a 0%, #000008 100%)',
      }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              background: i % 5 === 0 ? '#a78bfa' : '#ffffff',
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && confetti.map(c => <Confetto key={c.id} {...c} />)}
      </AnimatePresence>

      {/* Happy Birthday Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="absolute inset-x-4 top-8 z-30 text-center"
            initial={{ opacity: 0, scale: 0.3, y: -60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, type: 'spring', stiffness: 200, damping: 12 }}
          >
            <motion.h1
              className="font-['Cinzel'] font-bold leading-tight"
              style={{
                fontSize: 'clamp(2rem, 7vw, 5rem)',
                background: 'linear-gradient(135deg, #39FF14 0%, #FFD700 40%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.8))',
              }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Happy Birthday
            </motion.h1>
            <motion.h1
              className="font-['Cinzel'] font-bold"
              style={{
                fontSize: 'clamp(3rem, 12vw, 8rem)',
                background: 'linear-gradient(135deg, #FFD700 0%, #39FF14 50%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.9))',
                textShadow: 'none',
                lineHeight: 1.1,
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(255,215,0,0.7))',
                  'drop-shadow(0 0 40px rgba(57,255,20,0.9))',
                  'drop-shadow(0 0 20px rgba(139,92,246,0.8))',
                  'drop-shadow(0 0 20px rgba(255,215,0,0.7))',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Risha!
            </motion.h1>
            <motion.div
              className="flex justify-center gap-3 mt-2 text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {['🎂', '✨', '💚', '👑', '💜', '⭐', '🎉'].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cake */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ marginTop: showBanner ? '200px' : '0' }}
      >
        {/* Candle flame */}
        {!blown && (
          <div
            className="relative flex flex-col items-center cursor-pointer select-none mb-[-2px] z-20"
            onClick={handleFlameClick}
          >
            {/* Glow around flame */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ width: '50px', height: '50px', top: '-10px', left: '50%', transform: 'translateX(-50%)' }}
              animate={{
                boxShadow: [
                  '0 0 15px 5px rgba(255,200,50,0.6)',
                  '0 0 25px 10px rgba(255,140,0,0.7)',
                  '0 0 15px 5px rgba(255,200,50,0.6)',
                ]
              }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            {/* Flame SVG */}
            <motion.div
              style={{ width: '32px', height: '44px' }}
              animate={{
                scaleX: [1, 0.85, 1.1, 0.9, 1],
                scaleY: [1, 1.1, 0.9, 1.05, 1],
                rotate: [-2, 3, -1, 2, -2],
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 32 44" className="w-full h-full">
                <defs>
                  <radialGradient id="flameGrad" cx="50%" cy="80%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="20%" stopColor="#FFD700" />
                    <stop offset="60%" stopColor="#FF8C00" />
                    <stop offset="100%" stopColor="#FF4500" stopOpacity="0.6" />
                  </radialGradient>
                </defs>
                <path
                  d="M16,2 Q26,12 24,24 Q22,36 16,42 Q10,36 8,24 Q6,12 16,2 Z"
                  fill="url(#flameGrad)"
                />
                <path
                  d="M16,16 Q20,22 18,30 Q16,36 16,40 Q12,34 14,26 Q14,20 16,16 Z"
                  fill="rgba(255,255,255,0.5)"
                />
              </svg>
            </motion.div>

            {/* Candle stick */}
            <div
              className="rounded-t-sm"
              style={{
                width: '14px', height: '40px',
                background: 'linear-gradient(to bottom, #8B5CF6, #6D28D9)',
                boxShadow: '0 0 8px rgba(139,92,246,0.6)',
                borderRadius: '4px 4px 2px 2px',
              }}
            />
          </div>
        )}

        {/* Blown out candle */}
        {blown && (
          <div className="relative flex flex-col items-center mb-[-2px] z-20">
            {/* Smoke wisps */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.5)', bottom: '40px', left: `calc(50% + ${(i - 1) * 8}px)` }}
                animate={{ y: [-20, -60], opacity: [0.6, 0], scale: [1, 3] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: 2 }}
              />
            ))}
            <div
              className="rounded-t-sm"
              style={{
                width: '14px', height: '40px',
                background: 'linear-gradient(to bottom, #8B5CF6, #6D28D9)',
                borderRadius: '4px 4px 2px 2px',
              }}
            />
          </div>
        )}

        {/* Cake SVG */}
        <svg viewBox="0 0 240 160" style={{ width: 'min(300px, 80vw)', height: 'auto' }}>
          {/* Bottom tier */}
          <rect x="10" y="90" width="220" height="60" rx="12" fill="#1a0a2e" stroke="#8B5CF6" strokeWidth="2" />
          <rect x="10" y="90" width="220" height="20" rx="6" fill="#2d1459" />
          {/* Frosting drips - bottom */}
          {[30, 60, 90, 120, 150, 180, 210].map((x, i) => (
            <ellipse key={i} cx={x} cy="90" rx="10" ry="8" fill={i % 2 === 0 ? '#39FF14' : '#8B5CF6'} opacity="0.9" />
          ))}
          {/* Bottom tier decorations */}
          {[40, 80, 120, 160, 200].map((x, i) => (
            <circle key={i} cx={x} cy="125" r="5" fill={i % 2 === 0 ? '#FFD700' : '#39FF14'} />
          ))}

          {/* Top tier */}
          <rect x="40" y="40" width="160" height="55" rx="10" fill="#120a2b" stroke="#6D28D9" strokeWidth="2" />
          <rect x="40" y="40" width="160" height="16" rx="5" fill="#1e0f47" />
          {/* Frosting drips - top */}
          {[55, 80, 105, 130, 155, 180].map((x, i) => (
            <ellipse key={i} cx={x} cy="40" rx="9" ry="7" fill={i % 2 === 0 ? '#8B5CF6' : '#39FF14'} opacity="0.9" />
          ))}
          {/* Stars on top tier */}
          {[60, 100, 140, 180].map((x, i) => (
            <text key={i} x={x} y="72" textAnchor="middle" fontSize="14">
              {i % 2 === 0 ? '⭐' : '✨'}
            </text>
          ))}

          {/* "Risha" text on cake */}
          <text x="120" y="118" textAnchor="middle" fontSize="18" fontFamily="Cinzel, serif"
            fill="url(#cakeTextGrad)" fontWeight="bold">Risha</text>
          <defs>
            <linearGradient id="cakeTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39FF14" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Prompt text */}
        {!blown && (
          <motion.p
            className="text-white/60 text-sm font-['Nunito'] tracking-wide mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🕯️ Make a wish &amp; tap the flame to blow out the candle!
          </motion.p>
        )}

        {!showBanner && blown && (
          <motion.p
            className="text-white/70 text-base font-['Nunito'] tracking-wide mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ✨ May all your wishes come true! ✨
          </motion.p>
        )}
      </motion.div>

      {/* Floating birthday emojis background */}
      {showBanner && (
        <>
          {['🎊', '🎉', '🎈', '💚', '💜', '⭐', '✨', '👑', '🌟', '💫'].map((emoji, i) => (
            <motion.div
              key={i}
              className="fixed text-3xl pointer-events-none z-20"
              style={{ left: `${8 + i * 9}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, i % 2 === 0 ? 20 : -20, 0],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            >
              {emoji}
            </motion.div>
          ))}
        </>
      )}
    </div>
  )
}

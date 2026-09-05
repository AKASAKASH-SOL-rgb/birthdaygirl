import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  { src: '/images/risha1.jpg', rot: -6, x: -180, y: -80, cropPosition: 'center center' },
  { src: '/images/risha2.jpg', rot: 4, x: 60, y: -100, cropPosition: 'center center' },
  { src: '/images/risha3.jpg', rot: -3, x: -90, y: 60, cropPosition: 'center center' },
  { src: '/images/risha4.jpg', rot: 7, x: 140, y: 50, cropPosition: 'center center' },
  { src: '/images/risha5.jpg', rot: -5, x: 0, y: -20, cropPosition: 'center center' },
]

const empoweringMessages = [
  'You are fiercely strong, taking on the world with a brilliant smile.',
  'Your energy is boundless, and your heart is incredibly sweet.',
  'Keep reaching for the stars; I know you will achieve every dream you chase.',
  'You change the lives of everyone around you for the better, just by being you.',
]

const emojis = ['✨', '💚', '💜', '👑', '⭐', '🌟', '💫', '🌸']

function Particle({ x, y, emoji, id }) {
  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none select-none z-50 text-2xl"
      style={{ left: x, top: y }}
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        scale: 1.5,
        x: (Math.random() - 0.5) * 120,
        y: -(Math.random() * 80 + 40),
        rotate: (Math.random() - 0.5) * 360,
      }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {emoji}
    </motion.div>
  )
}

export default function Phase7Shatter({ onComplete }) {
  const [particles, setParticles] = useState([])
  const [msgIndex, setMsgIndex] = useState(0)
  const [showFinalBtn, setShowFinalBtn] = useState(false)
  const counterRef = useRef(0)
  const msgTimerRef = useRef(null)

  useEffect(() => {
    // Cycle through messages
    msgTimerRef.current = setInterval(() => {
      setMsgIndex(i => (i + 1) % empoweringMessages.length)
    }, 3500)
    // Show final button after 14s
    const t = setTimeout(() => setShowFinalBtn(true), 14000)
    return () => {
      clearInterval(msgTimerRef.current)
      clearTimeout(t)
    }
  }, [])

  const handleClick = useCallback((e) => {
    const rect = { x: e.clientX, y: e.clientY }
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: `${counterRef.current++}-${i}`,
      x: rect.x + (Math.random() - 0.5) * 30,
      y: rect.y + (Math.random() - 0.5) * 30,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
    setParticles(prev => [...prev.slice(-30), ...newParticles])
  }, [])

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0d0d2b 0%, #000008 100%)',
        cursor: 'crosshair',
      }}
      onClick={handleClick}
    >
      {/* Background starfield */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              background: i % 5 === 0 ? '#a78bfa' : i % 7 === 0 ? '#4ade80' : '#ffffff',
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${1.5 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            top: '-100px', left: '-100px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '400px', height: '400px',
            bottom: '-80px', right: '-80px',
            background: 'radial-gradient(ellipse, rgba(57,255,20,0.15) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Photo collage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ width: '160px', zIndex: i + 1 }}
            initial={{ opacity: 0, scale: 0.3, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: img.x,
              y: img.y,
              rotate: img.rot,
            }}
            transition={{
              delay: i * 0.25,
              duration: 0.7,
              type: 'spring',
              stiffness: 120,
              damping: 15,
            }}
          >
            <motion.div
              style={{ aspectRatio: '3/4' }}
              animate={{ y: [0, -6 - i * 2, 0], rotate: [img.rot, img.rot + 1.5, img.rot - 1, img.rot] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              {/* Polaroid frame */}
              <div
                className="w-full h-full rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `2px solid ${i % 2 === 0 ? 'rgba(139,92,246,0.6)' : 'rgba(57,255,20,0.5)'}`,
                  boxShadow: i % 2 === 0
                    ? '0 0 20px rgba(139,92,246,0.5), 0 8px 32px rgba(0,0,0,0.6)'
                    : '0 0 20px rgba(57,255,20,0.4), 0 8px 32px rgba(0,0,0,0.6)',
                  padding: '6px 6px 20px 6px',
                }}
              >
                <img
                  src={img.src}
                  alt={`Memory ${i + 1}`}
                  className="w-full rounded-lg"
                  style={{
                    height: '80%',
                    objectFit: 'cover',
                    objectPosition: img.cropPosition || 'center center',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Empowering message */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 pointer-events-none z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            className="max-w-lg px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-lg md:text-2xl font-bold font-['Nunito'] leading-relaxed"
              style={{
                color: msgIndex % 2 === 0 ? '#39FF14' : '#c4b5fd',
                textShadow: `0 0 20px ${msgIndex % 2 === 0 ? '#39FF14' : '#8B5CF6'}`,
              }}
            >
              &ldquo;{empoweringMessages[msgIndex]}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.p
          className="text-white/30 text-xs mt-4 tracking-widest uppercase font-['Nunito']"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✦ tap anywhere for magic ✦
        </motion.p>
      </div>

      {/* Click particles */}
      <AnimatePresence>
        {particles.map(p => (
          <Particle key={p.id} {...p} />
        ))}
      </AnimatePresence>

      {/* Reveal button */}
      <AnimatePresence>
        {showFinalBtn && (
          <motion.div
            className="absolute top-6 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <motion.button
              onClick={(e) => { e.stopPropagation(); onComplete() }}
              className="px-8 py-4 rounded-full font-bold text-base font-['Nunito'] text-white tracking-wider cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.3), rgba(139,92,246,0.4))',
                border: '2px solid rgba(255,215,0,0.8)',
                boxShadow: '0 0 30px rgba(255,215,0,0.5)',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,215,0,0.5)',
                  '0 0 40px rgba(255,215,0,0.8)',
                  '0 0 20px rgba(255,215,0,0.5)',
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              🎁 Reveal Final Surprise 🎁
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Reveal" hint if not shown yet */}
      {!showFinalBtn && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <motion.p
            className="text-white/20 text-xs font-['Nunito'] tracking-widest"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ keep exploring ✦
          </motion.p>
        </div>
      )}
    </div>
  )
}

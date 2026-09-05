import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const images = [
  { id: 1, src: '/images/risha1.jpg', rot: -8, x: -180, y: -70, z: -40, cropPosition: 'center center', size: 140 },
  { id: 2, src: '/images/risha2.jpg', rot: 6, x: 180, y: -90, z: -50, cropPosition: 'center center', size: 140 },
  { id: 3, src: '/images/risha3.jpg', rot: -5, x: -170, y: 100, z: -30, cropPosition: 'center center', size: 140 },
  { id: 4, src: '/images/risha4.jpg', rot: 7, x: 170, y: 95, z: -40, cropPosition: 'center center', size: 140 },
  // Hero centerpiece — risha5 sits elevated forward in 3D space
  { id: 5, src: '/images/risha5.jpg', rot: 0, x: 0, y: -10, z: 60, cropPosition: 'center center', size: 270, isHero: true },
]

const empoweringMessages = [
  'You have an unstoppable spark — never doubt how truly capable, brilliant, and strong you are.',
  'Your kindness, humor, and massive heart make you one of the most incredible people in this world.',
  'Whatever big dreams you chase this year, I know you are going to achieve every single one of them.',
  'Thank you for simply being you — the absolute best friend anyone could ever ask for.',
]

const emojis = ['✨', '💚', '💜', '👑', '⭐', '🌟', '💫', '🌸', '🎈']

function Particle({ x, y, emoji, id }) {
  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none select-none z-50 text-2xl"
      style={{ left: x, top: y }}
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        scale: 1.6,
        x: (Math.random() - 0.5) * 140,
        y: -(Math.random() * 90 + 40),
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
  const [activePhoto, setActivePhoto] = useState(null)
  const counterRef = useRef(0)
  const msgTimerRef = useRef(null)

  // 3D Spatial Constellation tilt controls (mouse & touch)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 15 })
  const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 15 })

  const rotY = useTransform(springTiltX, [-0.5, 0.5], ['-12deg', '12deg'])
  const rotX = useTransform(springTiltY, [-0.5, 0.5], ['12deg', '-12deg'])

  const handlePointerMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const xRatio = clientX / window.innerWidth - 0.5
    const yRatio = clientY / window.innerHeight - 0.5
    tiltX.set(xRatio)
    tiltY.set(yRatio)
  }

  const handlePointerLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  useEffect(() => {
    msgTimerRef.current = setInterval(() => {
      setMsgIndex(i => (i + 1) % empoweringMessages.length)
    }, 4000)

    const t = setTimeout(() => setShowFinalBtn(true), 12000)
    return () => {
      clearInterval(msgTimerRef.current)
      clearTimeout(t)
    }
  }, [])

  const handleClick = useCallback((e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: `${counterRef.current++}-${i}`,
      x: clientX + (Math.random() - 0.5) * 35,
      y: clientY + (Math.random() - 0.5) * 35,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
    setParticles(prev => [...prev.slice(-30), ...newParticles])
  }, [])

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at center, #0e0a26 0%, #000008 100%)',
        cursor: 'crosshair',
        perspective: 1200,
      }}
      onClick={handleClick}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchEnd={handlePointerLeave}
    >
      {/* Background starfield */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(140)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.6}px`,
              height: `${Math.random() * 2 + 0.6}px`,
              background: i % 4 === 0 ? '#39FF14' : i % 3 === 0 ? '#8B5CF6' : '#ffffff',
              opacity: Math.random() * 0.7 + 0.2,
              animation: `twinkle ${1.5 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Spatial cosmic glow nebulas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '600px', height: '600px',
            top: '-150px', left: '-100px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '550px', height: '550px',
            bottom: '-120px', right: '-100px',
            background: 'radial-gradient(ellipse, rgba(57,255,20,0.14) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* 3D Spatial Constellation Group */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: rotX,
          rotateY: rotY,
        }}
      >
        {images.map((img, i) => {
          const isHero = img.isHero
          return (
            <motion.div
              key={img.id}
              className="absolute pointer-events-auto"
              style={{
                width: `${img.size}px`,
                zIndex: isHero ? 30 : 10 + i,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0.2, z: -400 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: img.x,
                y: img.y,
                z: img.z,
                rotate: img.rot,
              }}
              transition={{
                delay: i * 0.2,
                duration: 0.8,
                type: 'spring',
                stiffness: 110,
                damping: 14,
              }}
            >
              {/* Floating zero-gravity harmonic motion */}
              <motion.div
                animate={{
                  y: isHero ? [0, -8, 0] : [0, -12 - (i % 2) * 4, 0],
                  rotate: [img.rot, img.rot + (isHero ? 0 : 2), img.rot - (isHero ? 0 : 1), img.rot],
                }}
                transition={{
                  duration: 3.5 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
                whileHover={{ scale: isHero ? 1.05 : 1.15, zIndex: 40 }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Frosted Glassmorphism Polaroid Frame */}
                <div
                  className="rounded-2xl overflow-hidden p-2 transition-all duration-300"
                  style={{
                    background: isHero
                      ? 'linear-gradient(135deg, rgba(255,215,0,0.3) 0%, rgba(57,255,20,0.2) 50%, rgba(139,92,246,0.3) 100%)'
                      : 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: isHero
                      ? '2px solid rgba(255,215,0,0.7)'
                      : '1.5px solid rgba(139,92,246,0.4)',
                    boxShadow: isHero
                      ? '0 15px 40px rgba(255,215,0,0.35), 0 0 50px rgba(57,255,20,0.25)'
                      : '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(139,92,246,0.2)',
                  }}
                >
                  {/* Photo container */}
                  <div
                    className="relative w-full rounded-xl overflow-hidden bg-black/40"
                    style={{ aspectRatio: isHero ? '4/5' : '3/4' }}
                  >
                    <img
                      src={img.src}
                      alt={`Memory ${img.id}`}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: img.cropPosition || 'center center' }}
                    />
                    {/* Starlight glass sheen */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
                      }}
                    />
                    {isHero && (
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-gold/40 text-[10px] font-bold text-gold">
                        👑 Bestie
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empowering Best-Friend Messages (Bottom carousel) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-28 md:pb-32 pointer-events-none z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            className="max-w-xl px-6 text-center"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-base md:text-2xl font-bold font-['Nunito'] leading-relaxed"
              style={{
                color: msgIndex % 2 === 0 ? '#39FF14' : '#e9d5ff',
                textShadow: `0 0 25px ${msgIndex % 2 === 0 ? 'rgba(57,255,20,0.6)' : 'rgba(139,92,246,0.6)'}`,
              }}
            >
              &ldquo;{empoweringMessages[msgIndex]}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.p
          className="text-white/40 text-xs mt-3 tracking-widest uppercase font-['Nunito']"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ✦ tilt/drag screen in 3D • tap for sparkles ✦
        </motion.p>
      </div>

      {/* Click Particles */}
      <AnimatePresence>
        {particles.map(p => (
          <Particle key={p.id} {...p} />
        ))}
      </AnimatePresence>

      {/* Final Surprise Button */}
      <AnimatePresence>
        {showFinalBtn && (
          <motion.div
            className="absolute top-7 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: -25, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <motion.button
              onClick={(e) => { e.stopPropagation(); onComplete() }}
              className="px-8 py-3.5 rounded-full font-bold text-sm md:text-base font-['Nunito'] text-white tracking-wider cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.35), rgba(139,92,246,0.45))',
                border: '2px solid rgba(255,215,0,0.85)',
                boxShadow: '0 0 30px rgba(255,215,0,0.6)',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,215,0,0.5)',
                  '0 0 45px rgba(255,215,0,0.85)',
                  '0 0 20px rgba(255,215,0,0.5)',
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              🎂 Reveal Birthday Surprise 🎂
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

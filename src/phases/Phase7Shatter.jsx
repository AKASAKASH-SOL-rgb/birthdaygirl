import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Starfield from '../components/Starfield'

const images = [
  { id: 1, src: '/images/risha1.jpg', rot: -6, x: -190, y: -70, z: -40, cropPosition: 'center center', size: 145 },
  { id: 2, src: '/images/risha2.jpg', rot: 5, x: 190, y: -85, z: -50, cropPosition: 'center center', size: 145 },
  { id: 3, src: '/images/risha3.jpg', rot: -4, x: -180, y: 95, z: -30, cropPosition: 'center center', size: 145 },
  { id: 4, src: '/images/risha4.jpg', rot: 6, x: 180, y: 90, z: -40, cropPosition: 'center center', size: 145 },
  // Hero centerpiece — risha5 sits elevated forward in 3D space
  { id: 5, src: '/images/risha5.jpg', rot: 0, x: 0, y: -10, z: 60, cropPosition: 'center center', size: 275, isHero: true },
]

const empoweringMessages = [
  'You have an unstoppable spark — never doubt how truly capable, brilliant, and strong you are.',
  'Your kindness, humor, and massive heart make you one of the most incredible people in this world.',
  'Whatever big dreams you chase this year, I know you are going to achieve every single one of them.',
  'Thank you for simply being you — the absolute best friend anyone could ever ask for.',
]

const glints = [
  { char: '✧', color: '#6ee7b7' },
  { char: '✦', color: '#c084fc' },
  { char: '★', color: '#fef08a' },
  { char: '◈', color: '#67e8f9' },
  { char: '◆', color: '#f472b6' },
  { char: '✵', color: '#ffffff' },
]

function StarlightGlint({ x, y, item, id }) {
  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none select-none z-50 font-serif"
      style={{
        left: x,
        top: y,
        color: item.color,
        textShadow: `0 0 12px ${item.color}`,
        fontSize: `${16 + Math.random() * 12}px`,
      }}
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        scale: 1.5,
        x: (Math.random() - 0.5) * 120,
        y: -(Math.random() * 80 + 30),
        rotate: (Math.random() - 0.5) * 180,
      }}
      transition={{ duration: 0.95, ease: 'easeOut' }}
    >
      {item.char}
    </motion.div>
  )
}

export default function Phase7Shatter({ onComplete }) {
  const [particles, setParticles] = useState([])
  const [msgIndex, setMsgIndex] = useState(0)
  const [showFinalBtn, setShowFinalBtn] = useState(false)
  const counterRef = useRef(0)
  const msgTimerRef = useRef(null)

  // 3D Spatial Constellation tilt controls
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 16 })
  const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 16 })

  const rotY = useTransform(springTiltX, [-0.5, 0.5], ['-10deg', '10deg'])
  const rotX = useTransform(springTiltY, [-0.5, 0.5], ['10deg', '-10deg'])

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
    }, 4200)

    const t = setTimeout(() => setShowFinalBtn(true), 11000)
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
      x: clientX + (Math.random() - 0.5) * 30,
      y: clientY + (Math.random() - 0.5) * 30,
      item: glints[Math.floor(Math.random() * glints.length)],
    }))
    setParticles(prev => [...prev.slice(-30), ...newParticles])
  }, [])

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at center, #0b0520 0%, #030012 60%, #02000d 100%)',
        cursor: 'crosshair',
        perspective: 1200,
      }}
      onClick={handleClick}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchEnd={handlePointerLeave}
    >
      <Starfield count={240} speed={0.15} />

      {/* Atmospheric Aurora Nebulae */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '650px', height: '650px',
            top: '-120px', left: '-100px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '600px', height: '600px',
            bottom: '-120px', right: '-100px',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.4, 0.2] }}
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
                delay: i * 0.18,
                duration: 0.8,
                type: 'spring',
                stiffness: 110,
                damping: 15,
              }}
            >
              {/* Floating zero-gravity harmonic motion */}
              <motion.div
                animate={{
                  y: isHero ? [0, -8, 0] : [0, -10 - (i % 2) * 4, 0],
                  rotate: [img.rot, img.rot + (isHero ? 0 : 1.5), img.rot - (isHero ? 0 : 1), img.rot],
                }}
                transition={{
                  duration: 4 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
                whileHover={{ scale: isHero ? 1.04 : 1.12, zIndex: 40 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Sleek Anime Glass Panel */}
                <div
                  className="rounded-xl overflow-hidden p-1.5 transition-all duration-300"
                  style={{
                    background: isHero
                      ? 'linear-gradient(135deg, rgba(251,191,36,0.3) 0%, rgba(16,185,129,0.2) 50%, rgba(139,92,246,0.3) 100%)'
                      : 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isHero
                      ? '1.5px solid rgba(251,191,36,0.7)'
                      : '1px solid rgba(255,255,255,0.18)',
                    boxShadow: isHero
                      ? '0 15px 45px rgba(251,191,36,0.35), 0 0 40px rgba(16,185,129,0.2)'
                      : '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(139,92,246,0.15)',
                  }}
                >
                  {/* Photo container */}
                  <div
                    className="relative w-full rounded-lg overflow-hidden bg-black/50"
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
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)',
                      }}
                    />
                    {/* Corner accent brackets */}
                    <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-white/50" />
                    <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-white/50" />

                    {isHero && (
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/50 text-[10px] font-mono font-bold text-amber-300">
                        ✦ BEST FRIEND
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empowering Best-Friend Messages in Literary Serif Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-28 md:pb-32 pointer-events-none z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            className="max-w-xl px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-lg md:text-2xl font-serif italic leading-relaxed text-slate-100 tracking-wide"
              style={{
                textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 25px rgba(168,85,247,0.5)',
              }}
            >
              &ldquo;{empoweringMessages[msgIndex]}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.p
          className="text-slate-400/60 text-[10px] md:text-xs mt-3.5 tracking-[0.3em] uppercase font-mono"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ✦ touch screen to disperse stardust ✦
        </motion.p>
      </div>

      {/* Click Starlight Glints */}
      <AnimatePresence>
        {particles.map(p => (
          <StarlightGlint key={p.id} {...p} />
        ))}
      </AnimatePresence>

      {/* Sleek Anime Reveal Finale Button */}
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
              className="px-8 py-3.5 rounded-xl font-mono text-xs md:text-sm tracking-[0.25em] text-white uppercase cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 10, 48, 0.85) 0%, rgba(10, 5, 30, 0.95) 100%)',
                border: '1px solid rgba(251, 191, 36, 0.8)',
                boxShadow: '0 0 35px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 45px rgba(251, 191, 36, 0.75)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              ✦ REVEAL CELESTIAL SURPRISE ✦
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
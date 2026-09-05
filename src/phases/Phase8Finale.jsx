import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONFETTI_COLORS = [
  '#39FF14', '#8B5CF6', '#FFD700', '#FF3366', '#00F0FF',
  '#FF9900', '#A855F7', '#10B981', '#F59E0B', '#EC4899',
]

// Synthesize a magical cosmic birthday chime using Web Audio API
function playBirthdayChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51] // C5, E5, G5, C6, E6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.1 + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.8)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + i * 0.1)
      osc.stop(ctx.currentTime + i * 0.1 + 0.85)
    })
  } catch (e) {
    // Audio optional if browser restricts autoplay
  }
}

function Confetto({ x, color, delay, size, rotSpeed }) {
  const startY = -40
  const endY = typeof window !== 'undefined' ? window.innerHeight + 80 : 900
  return (
    <motion.div
      className="fixed pointer-events-none rounded-sm z-40"
      style={{
        left: x,
        top: startY,
        width: size,
        height: size * 0.55,
        background: color,
        boxShadow: `0 0 8px ${color}80`,
      }}
      initial={{ y: startY, rotate: 0, opacity: 1 }}
      animate={{
        y: endY,
        rotate: [0, 180 * rotSpeed, 360 * rotSpeed, 720 * rotSpeed],
        opacity: [1, 1, 1, 0.7, 0],
        x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80],
      }}
      transition={{
        duration: 3.8 + Math.random() * 2.8,
        delay,
        ease: 'linear',
      }}
    />
  )
}

function SparkParticle({ id, x, y, color }) {
  const angle = Math.random() * Math.PI * 2
  const distance = 40 + Math.random() * 90
  return (
    <motion.div
      key={id}
      className="absolute rounded-full pointer-events-none z-30"
      style={{
        left: x,
        top: y,
        width: '4px',
        height: '4px',
        background: color,
        boxShadow: `0 0 10px ${color}`,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0.2,
      }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
    />
  )
}

export default function Phase8Finale() {
  const [blown, setBlown] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [rumble, setRumble] = useState(false)
  const [shockwave, setShockwave] = useState(false)
  const [confettiList, setConfettiList] = useState([])
  const [sparks, setSparks] = useState([])
  const sparkIdRef = useRef(0)

  // Generate initial confetti
  const spawnConfettiBatch = (count = 70) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 800
    const newItems = Array.from({ length: count }, (_, i) => ({
      id: Math.random() + '-' + i,
      x: Math.random() * w,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 1.5,
      size: 7 + Math.random() * 10,
      rotSpeed: Math.random() > 0.5 ? 1 : -1,
    }))
    setConfettiList(prev => [...prev.slice(-60), ...newItems])
  }

  const handleFlameClick = () => {
    if (blown) return
    setBlown(true)
    setRumble(true)
    setShockwave(true)
    playBirthdayChime()
    spawnConfettiBatch(85)

    setTimeout(() => setRumble(false), 450)
    setTimeout(() => setShowBanner(true), 500)
  }

  const handleExtraCelebration = (e) => {
    e.stopPropagation()
    playBirthdayChime()
    spawnConfettiBatch(50)

    // Burst sparks
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const newSparks = Array.from({ length: 16 }, () => ({
      id: sparkIdRef.current++,
      x: cx,
      y: cy,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    }))
    setSparks(prev => [...prev.slice(-40), ...newSparks])
  }

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center select-none ${
        rumble ? 'animate-rumble' : ''
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #100a26 0%, #060212 50%, #000004 100%)',
      }}
    >
      {/* Gritty Film Grain and Vignette Texture Overlays */}
      <div className="absolute inset-0 pointer-events-none z-20 gritty-vignette opacity-80" />
      <div className="absolute inset-0 pointer-events-none z-20 gritty-grain" />

      {/* Deep Space Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(110)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              background: i % 4 === 0 ? '#39FF14' : i % 3 === 0 ? '#8B5CF6' : '#FFD700',
              opacity: Math.random() * 0.7 + 0.2,
              animation: `twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient Pulsing Cosmic Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '650px', height: '650px',
            top: '25%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(57,255,20,0.1) 45%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Supernova Shockwave on Blowout */}
      <AnimatePresence>
        {shockwave && (
          <motion.div
            className="absolute z-30 pointer-events-none rounded-full"
            style={{
              left: '50%', top: '45%',
              transform: 'translate(-50%, -50%)',
              border: '3px solid rgba(57,255,20,0.9)',
              boxShadow: '0 0 50px rgba(57,255,20,0.8), 0 0 100px rgba(139,92,246,0.8)',
            }}
            initial={{ width: 10, height: 10, opacity: 1 }}
            animate={{ width: 1400, height: 1400, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Confetti Rain */}
      {confettiList.map(c => (
        <Confetto key={c.id} {...c} />
      ))}

      {/* Interactive Firework Sparks */}
      {sparks.map(s => (
        <SparkParticle key={s.id} {...s} />
      ))}

      {/* High-Impact Birthday Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="absolute inset-x-4 top-6 md:top-8 z-30 text-center flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.4, y: -70 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, type: 'spring', stiffness: 180, damping: 14 }}
          >
            {/* Top Star Sparkles Badge */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gold text-lg">✦</span>
              <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-emerald-300">
                A Star Is Celebrated
              </span>
              <span className="text-gold text-lg">✦</span>
            </div>

            {/* Glowing Main Title */}
            <motion.h1
              className="font-['Cinzel'] font-black tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 7vw, 4.8rem)',
                background: 'linear-gradient(135deg, #ffffff 0%, #39FF14 30%, #FFD700 70%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(57,255,20,0.7))',
                lineHeight: 1.05,
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(57,255,20,0.7))',
                  'drop-shadow(0 0 35px rgba(255,215,0,0.85))',
                  'drop-shadow(0 0 25px rgba(139,92,246,0.8))',
                  'drop-shadow(0 0 20px rgba(57,255,20,0.7))',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              Happy Birthday
            </motion.h1>

            {/* RISHA Big Name */}
            <motion.h1
              className="font-['Cinzel'] font-black tracking-wider"
              style={{
                fontSize: 'clamp(3.5rem, 13vw, 8.5rem)',
                background: 'linear-gradient(135deg, #FFD700 0%, #39FF14 50%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.95))',
                lineHeight: 1.0,
              }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Risha!
            </motion.h1>

            {/* Best-Friend Heartwarming Tribute Subtitle */}
            <motion.p
              className="text-white/90 text-sm md:text-lg font-['Nunito'] font-semibold tracking-wide max-w-lg mt-2 px-4 italic"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 15px rgba(139,92,246,0.5)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              &ldquo;To the brightest star in my universe — the absolute greatest best friend.&rdquo;
            </motion.p>

            {/* Floating emojis ribbon */}
            <div className="flex gap-2.5 mt-2.5 text-2xl">
              {['✨', '💚', '👑', '💜', '⭐', '🎂', '🎉'].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Redesigned 3D Cosmic Galaxy Birthday Cake */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ marginTop: showBanner ? '190px' : '0' }}
      >
        {/* Animated Candle & Multi-Layer Flame */}
        {!blown && (
          <div
            className="relative flex flex-col items-center cursor-pointer select-none mb-[-3px] z-30 group"
            onClick={handleFlameClick}
          >
            {/* Heat Haze Shimmer Glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '70px', height: '70px',
                top: '-20px', left: '50%', transform: 'translateX(-50%)',
              }}
              animate={{
                boxShadow: [
                  '0 0 25px 10px rgba(255,215,0,0.7), 0 0 50px 20px rgba(255,69,0,0.4)',
                  '0 0 35px 15px rgba(57,255,20,0.6), 0 0 70px 30px rgba(139,92,246,0.4)',
                  '0 0 25px 10px rgba(255,215,0,0.7), 0 0 50px 20px rgba(255,69,0,0.4)',
                ],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Tap Hint Tooltip */}
            <motion.div
              className="absolute -top-10 whitespace-nowrap bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/50 text-[11px] font-bold text-emerald-300 pointer-events-none"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🔥 Tap to blow out
            </motion.div>

            {/* Realistic Multi-Layer Flame SVG */}
            <motion.div
              style={{ width: '38px', height: '52px' }}
              animate={{
                scaleX: [1, 0.88, 1.12, 0.94, 1],
                scaleY: [1, 1.1, 0.92, 1.06, 1],
                rotate: [-2, 3, -1, 2, -2],
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 38 52" className="w-full h-full overflow-visible">
                <defs>
                  {/* Outer aura */}
                  <radialGradient id="flameOuter" cx="50%" cy="80%" r="75%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#FFD700" />
                    <stop offset="60%" stopColor="#FF4500" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  </radialGradient>
                  {/* Inner hot core */}
                  <radialGradient id="flameCore" cx="50%" cy="85%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor="#86efac" />
                    <stop offset="100%" stopColor="#39FF14" stopOpacity="0.8" />
                  </radialGradient>
                </defs>
                {/* Outer Flame body */}
                <path
                  d="M19,2 Q31,16 28,30 Q25,44 19,50 Q13,44 10,30 Q7,16 19,2 Z"
                  fill="url(#flameOuter)"
                  filter="drop-shadow(0 0 8px #FF8C00)"
                />
                {/* Inner white-hot plasma core */}
                <path
                  d="M19,16 Q25,26 23,36 Q21,44 19,48 Q17,44 15,36 Q13,26 19,16 Z"
                  fill="url(#flameCore)"
                />
                {/* Spark particles rising from flame */}
                <circle cx="19" cy="8" r="1.5" fill="#fff" opacity="0.9" />
                <circle cx="23" cy="18" r="1" fill="#FFD700" opacity="0.8" />
              </svg>
            </motion.div>

            {/* Candle Stick — Striped Cosmic Pattern */}
            <div
              className="relative rounded-t-sm"
              style={{
                width: '16px', height: '48px',
                background: 'repeating-linear-gradient(45deg, #8B5CF6, #8B5CF6 6px, #39FF14 6px, #39FF14 12px)',
                boxShadow: '0 0 12px rgba(139,92,246,0.8), inset 0 0 4px rgba(0,0,0,0.6)',
                borderRadius: '5px 5px 2px 2px',
              }}
            >
              {/* Wick */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-neutral-900 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Blown-out candle with realistic swirling smoke */}
        {blown && (
          <div className="relative flex flex-col items-center mb-[-3px] z-20">
            {/* Swirling Smoke Trails */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${6 + i * 3}px`,
                  height: `${6 + i * 3}px`,
                  background: 'rgba(255,255,255,0.4)',
                  filter: 'blur(2px)',
                  bottom: '48px',
                  left: `calc(50% + ${(i - 2) * 8}px)`,
                }}
                animate={{
                  y: [-15, -90 - i * 15],
                  x: [(i % 2 === 0 ? -12 : 12) * (i + 1), (i % 2 === 0 ? 15 : -15) * (i + 1)],
                  opacity: [0.7, 0],
                  scale: [1, 3.5],
                }}
                transition={{ duration: 2.2, delay: i * 0.18, repeat: Infinity }}
              />
            ))}
            {/* Darkened Candle Stick */}
            <div
              className="relative rounded-t-sm opacity-90"
              style={{
                width: '16px', height: '48px',
                background: 'repeating-linear-gradient(45deg, #4c1d95, #4c1d95 6px, #14532d 6px, #14532d 12px)',
                borderRadius: '5px 5px 2px 2px',
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[2px] h-2 bg-neutral-950 rounded-full" />
            </div>
          </div>
        )}

        {/* 3D-Styled Stylized Cosmic Cake SVG */}
        <div className="relative">
          {/* Twin Side Sparkler Fountain Fireworks */}
          <div className="absolute -left-8 top-16 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`spk-l-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-gold"
                style={{
                  boxShadow: '0 0 8px #FFD700',
                  '--tx': `${-30 - Math.random() * 40}px`,
                  '--ty': `${-20 - Math.random() * 50}px`,
                }}
                animate={{
                  x: [0, -30 - Math.random() * 30],
                  y: [0, -30 - Math.random() * 40],
                  opacity: [1, 0],
                  scale: [1, 0.2],
                }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
          <div className="absolute -right-8 top-16 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`spk-r-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{
                  boxShadow: '0 0 8px #39FF14',
                }}
                animate={{
                  x: [0, 30 + Math.random() * 30],
                  y: [0, -30 - Math.random() * 40],
                  opacity: [1, 0],
                  scale: [1, 0.2],
                }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>

          <svg
            viewBox="0 0 280 190"
            style={{ width: 'min(330px, 86vw)', height: 'auto', overflow: 'visible' }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="bottomTierGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1038" />
                <stop offset="50%" stopColor="#120824" />
                <stop offset="100%" stopColor="#080312" />
              </linearGradient>

              <linearGradient id="topTierGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#251447" />
                <stop offset="60%" stopColor="#170a2f" />
                <stop offset="100%" stopColor="#0c0419" />
              </linearGradient>

              <linearGradient id="greenGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>

              <linearGradient id="violetGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="60%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#581c87" />
              </linearGradient>

              <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#785310" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#785310" />
              </linearGradient>

              <linearGradient id="rishaGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#39FF14" />
                <stop offset="45%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>

              {/* Shadow Filters */}
              <filter id="cakeDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Serving Stand / Gold Plate */}
            <ellipse cx="140" cy="178" rx="135" ry="10" fill="url(#goldPlate)" filter="drop-shadow(0 8px 20px rgba(255,215,0,0.3))" />
            <ellipse cx="140" cy="175" rx="130" ry="8" fill="#180f2d" stroke="#FFD700" strokeWidth="1" />

            {/* ===== BOTTOM TIER ===== */}
            <rect
              x="25" y="105" width="230" height="68" rx="16"
              fill="url(#bottomTierGrad)"
              stroke="#8B5CF6"
              strokeWidth="2"
              filter="url(#cakeDropShadow)"
            />
            {/* Sponge Texture Stars */}
            {[50, 95, 140, 185, 230].map((x, i) => (
              <circle key={`bt-${i}`} cx={x} cy="150" r="3.5" fill={i % 2 === 0 ? '#FFD700' : '#39FF14'} opacity="0.8" />
            ))}
            {/* Dripping Glaze — Bottom Tier */}
            <path
              d="M25,105 L255,105 
                 C255,118 245,124 240,124 
                 C235,124 230,112 220,112 
                 C210,112 205,130 195,130 
                 C185,130 180,114 170,114 
                 C160,114 155,134 145,134 
                 C135,134 130,115 120,115 
                 C110,115 105,132 95,132 
                 C85,132 80,114 70,114 
                 C60,114 55,126 45,126 
                 C35,126 30,114 25,105 Z"
              fill="url(#violetGlaze)"
              filter="drop-shadow(0 3px 5px rgba(0,0,0,0.5))"
            />
            {/* Neon Green Drip Highlights */}
            {[45, 95, 145, 195, 240].map((cx, i) => (
              <ellipse key={`vdrip-${i}`} cx={cx} cy={i === 2 ? 134 : i % 2 === 0 ? 126 : 132} rx="4.5" ry="5.5" fill="#39FF14" />
            ))}

            {/* Glowing Plaque for RISHA */}
            <rect
              x="85" y="132" width="110" height="32" rx="8"
              fill="#0b041a"
              stroke="url(#rishaGold)"
              strokeWidth="2"
              filter="drop-shadow(0 0 10px rgba(57,255,20,0.5))"
            />
            <text
              x="140" y="154"
              textAnchor="middle"
              fontSize="17"
              fontFamily="Cinzel, Georgia, serif"
              fontWeight="900"
              letterSpacing="2"
              fill="url(#rishaGold)"
              style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
            >
              RISHA
            </text>

            {/* ===== TOP TIER ===== */}
            <rect
              x="60" y="48" width="160" height="60" rx="14"
              fill="url(#topTierGrad)"
              stroke="#A855F7"
              strokeWidth="2"
              filter="url(#cakeDropShadow)"
            />
            {/* Top Tier Dripping Neon Green Glaze */}
            <path
              d="M60,48 L220,48 
                 C220,58 212,65 205,65 
                 C198,65 192,54 185,54 
                 C178,54 172,70 165,70 
                 C158,70 152,55 145,55 
                 C138,55 132,72 125,72 
                 C118,72 112,56 105,56 
                 C98,56 92,68 85,68 
                 C78,68 72,58 60,48 Z"
              fill="url(#greenGlaze)"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.6))"
            />
            {/* Violet drip beads */}
            {[85, 125, 165, 205].map((cx, i) => (
              <ellipse key={`gdrip-${i}`} cx={cx} cy={i === 1 ? 72 : 68} rx="4" ry="5" fill="#c084fc" />
            ))}

            {/* Piped Frosting Dollops on Top */}
            {[75, 105, 135, 165, 195].map((x, i) => (
              <g key={`dollop-${i}`}>
                <ellipse cx={x} cy="48" rx="10" ry="7" fill={i % 2 === 0 ? '#39FF14' : '#A855F7'} />
                <circle cx={x} cy="44" r="3.5" fill="#FFD700" filter="drop-shadow(0 0 3px #FFD700)" />
              </g>
            ))}

            {/* Stardust Sparkles on Cake */}
            {[90, 130, 170, 200].map((x, i) => (
              <text key={`st-${i}`} x={x} y="85" textAnchor="middle" fontSize="11" fill="#FFD700">
                ✦
              </text>
            ))}
          </svg>
        </div>

        {/* Action Prompt */}
        {!blown && (
          <motion.p
            className="text-white/80 text-sm font-['Nunito'] tracking-wide mt-3 font-semibold"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            🕯️ Make a silent wish &amp; tap the flame to blow it out!
          </motion.p>
        )}

        {/* Celebratory Controls after blow out */}
        {blown && (
          <motion.div
            className="flex flex-col items-center gap-3 mt-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-emerald-300 font-bold text-sm tracking-wide">
              ✨ Wish dispatched across the cosmos! ✨
            </p>

            {/* Interactive Firework & Confetti Cannon Button */}
            <motion.button
              onClick={handleExtraCelebration}
              className="px-6 py-2.5 rounded-full font-bold text-xs md:text-sm font-['Nunito'] tracking-wider text-white cursor-pointer select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.3), rgba(255,215,0,0.35))',
                border: '1.5px solid rgba(255,215,0,0.8)',
                boxShadow: '0 0 20px rgba(255,215,0,0.4)',
              }}
              whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(255,215,0,0.8)' }}
              whileTap={{ scale: 0.94 }}
            >
              🎉 Tap For More Fireworks &amp; Confetti! 🎉
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Floating Birthday Orbs and Lanterns */}
      {showBanner && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {['🎈', '✨', '👑', '⭐', '💫', '🎊', '🎉', '🌟'].map((emoji, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${10 + i * 11}%`,
                bottom: '-40px',
              }}
              animate={{
                y: [-40, -window.innerHeight - 100],
                x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40],
                rotate: [0, i % 2 === 0 ? 30 : -30, 0],
              }}
              transition={{
                duration: 5 + i * 0.8,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'linear',
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

const CONFETTI_COLORS = [
  '#fde047', '#6ee7b7', '#c084fc', '#67e8f9', '#f472b6',
  '#f59e0b', '#10b981', '#a855f7', '#38bdf8', '#ffffff',
]

// Synthesize a refined anime celestial chime using Web Audio API
function playBirthdayChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98] // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08)
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.08 + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.9)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + i * 0.08)
      osc.stop(ctx.currentTime + i * 0.08 + 0.95)
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
        boxShadow: `0 0 10px ${color}90`,
      }}
      initial={{ y: startY, rotate: 0, opacity: 1 }}
      animate={{
        y: endY,
        rotate: [0, 180 * rotSpeed, 360 * rotSpeed, 720 * rotSpeed],
        opacity: [1, 1, 1, 0.7, 0],
        x: [(Math.random() - 0.5) * 70, (Math.random() - 0.5) * 70],
      }}
      transition={{
        duration: 3.8 + Math.random() * 2.5,
        delay,
        ease: 'linear',
      }}
    />
  )
}

function SparkParticle({ id, x, y, color }) {
  const angle = Math.random() * Math.PI * 2
  const distance = 45 + Math.random() * 85
  return (
    <motion.div
      key={id}
      className="absolute rounded-full pointer-events-none z-30"
      style={{
        left: x,
        top: y,
        width: '3.5px',
        height: '3.5px',
        background: color,
        boxShadow: `0 0 12px ${color}`,
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

  const spawnConfettiBatch = (count = 70) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 800
    const newItems = Array.from({ length: count }, (_, i) => ({
      id: Math.random() + '-' + i,
      x: Math.random() * w,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 1.5,
      size: 6 + Math.random() * 9,
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

    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const newSparks = Array.from({ length: 18 }, () => ({
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
        background: 'radial-gradient(ellipse at center, #0d0624 0%, #050214 55%, #02000d 100%)',
      }}
    >
      <Starfield count={260} speed={0.15} />

      {/* Cinematic Film Vignette & Grain */}
      <div className="absolute inset-0 pointer-events-none z-20 anime-vignette opacity-80" />
      <div className="absolute inset-0 pointer-events-none z-20 anime-grain" />

      {/* Ambient Pulsing Aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '700px', height: '700px',
            top: '25%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(139,92,246,0.16) 0%, rgba(16,185,129,0.1) 45%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Supernova Shockwave on Extinguish */}
      <AnimatePresence>
        {shockwave && (
          <motion.div
            className="absolute z-30 pointer-events-none rounded-full"
            style={{
              left: '50%', top: '48%',
              transform: 'translate(-50%, -50%)',
              border: '2px solid rgba(110,231,183,0.9)',
              boxShadow: '0 0 50px rgba(110,231,183,0.8), 0 0 100px rgba(192,132,252,0.8)',
            }}
            initial={{ width: 10, height: 10, opacity: 1 }}
            animate={{ width: 1500, height: 1500, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
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

      {/* Mature Anime Birthday Title Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="absolute inset-x-4 top-6 md:top-8 z-30 text-center flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.5, y: -60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, type: 'spring', stiffness: 180, damping: 14 }}
          >
            {/* Top Star Coordinates Badge */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-amber-300 text-xs">◆</span>
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.4em] uppercase text-emerald-300">
                CELESTIAL REIGN // RISHA
              </span>
              <span className="text-amber-300 text-xs">◆</span>
            </div>

            {/* Glowing Main Title */}
            <motion.h1
              className="font-cinzel font-bold tracking-wider"
              style={{
                fontSize: 'clamp(1.8rem, 6.5vw, 4.2rem)',
                background: 'linear-gradient(135deg, #ffffff 0%, #6ee7b7 30%, #fde047 70%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(110,231,183,0.6))',
                lineHeight: 1.1,
              }}
            >
              Happy Birthday
            </motion.h1>

            {/* RISHA Title in Regal Gold */}
            <motion.h1
              className="font-cinzel font-black tracking-widest uppercase"
              style={{
                fontSize: 'clamp(3rem, 12vw, 7.5rem)',
                background: 'linear-gradient(135deg, #fef08a 0%, #10b981 50%, #fef08a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 35px rgba(251,191,36,0.9))',
                lineHeight: 1.0,
              }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Risha
            </motion.h1>

            {/* Heartwarming Best-Friend Tribute in Literary Serif */}
            <motion.p
              className="text-slate-200 text-sm md:text-lg font-serif italic tracking-wide max-w-lg mt-2 px-4"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 15px rgba(139,92,246,0.5)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              &ldquo;To the brightest star in my universe — the absolute greatest best friend.&rdquo;
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gourmet Anime Midnight Galaxy Cake */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ marginTop: showBanner ? '190px' : '0' }}
      >
        {/* Animated Candle & Multi-Layer Ethereal Flame */}
        {!blown && (
          <div
            className="relative flex flex-col items-center cursor-pointer select-none mb-[-3px] z-30 group"
            onClick={handleFlameClick}
          >
            {/* Heat Haze Shimmer Glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '65px', height: '65px',
                top: '-18px', left: '50%', transform: 'translateX(-50%)',
              }}
              animate={{
                boxShadow: [
                  '0 0 25px 8px rgba(254,240,138,0.7), 0 0 50px 18px rgba(16,185,129,0.4)',
                  '0 0 35px 12px rgba(192,132,252,0.6), 0 0 65px 25px rgba(110,231,183,0.4)',
                  '0 0 25px 8px rgba(254,240,138,0.7), 0 0 50px 18px rgba(16,185,129,0.4)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Tap Hint Tooltip */}
            <motion.div
              className="absolute -top-10 whitespace-nowrap bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/40 text-[10px] font-mono font-bold tracking-wider text-emerald-300 pointer-events-none"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✦ TAP FLAME TO MAKE A WISH ✦
            </motion.div>

            {/* Ethereal Anime Flame SVG */}
            <motion.div
              style={{ width: '34px', height: '48px' }}
              animate={{
                scaleX: [1, 0.9, 1.1, 0.95, 1],
                scaleY: [1, 1.08, 0.94, 1.05, 1],
                rotate: [-2, 3, -1, 2, -2],
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 38 52" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="animeFlameOuter" cx="50%" cy="80%" r="75%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#fef08a" />
                    <stop offset="60%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  </radialGradient>
                  <radialGradient id="animeFlameCore" cx="50%" cy="85%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor="#6ee7b7" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                  </radialGradient>
                </defs>
                <path
                  d="M19,2 Q31,16 28,30 Q25,44 19,50 Q13,44 10,30 Q7,16 19,2 Z"
                  fill="url(#animeFlameOuter)"
                  filter="drop-shadow(0 0 8px #6ee7b7)"
                />
                <path
                  d="M19,16 Q25,26 23,36 Q21,44 19,48 Q17,44 15,36 Q13,26 19,16 Z"
                  fill="url(#animeFlameCore)"
                />
              </svg>
            </motion.div>

            {/* Sleek Tapered Candle Stick */}
            <div
              className="relative rounded-t-sm"
              style={{
                width: '14px', height: '44px',
                background: 'linear-gradient(to bottom, #c084fc 0%, #4c1d95 60%, #1e1b4b 100%)',
                boxShadow: '0 0 10px rgba(192,132,252,0.6), inset 0 1px 2px rgba(255,255,255,0.4)',
                borderRadius: '4px 4px 2px 2px',
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[1.5px] h-2.5 bg-neutral-900 rounded-full" />
            </div>
          </div>
        )}

        {/* Extinguished Candle with Anime Swirling Smoke */}
        {blown && (
          <div className="relative flex flex-col items-center mb-[-3px] z-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${5 + i * 2.5}px`,
                  height: `${5 + i * 2.5}px`,
                  background: 'rgba(255,255,255,0.35)',
                  filter: 'blur(2px)',
                  bottom: '44px',
                  left: `calc(50% + ${(i - 2) * 7}px)`,
                }}
                animate={{
                  y: [-12, -85 - i * 14],
                  x: [(i % 2 === 0 ? -10 : 10) * (i + 1), (i % 2 === 0 ? 12 : -12) * (i + 1)],
                  opacity: [0.65, 0],
                  scale: [1, 3.2],
                }}
                transition={{ duration: 2.2, delay: i * 0.16, repeat: Infinity }}
              />
            ))}
            <div
              className="relative rounded-t-sm opacity-80"
              style={{
                width: '14px', height: '44px',
                background: 'linear-gradient(to bottom, #3b0764, #1e1b4b)',
                borderRadius: '4px 4px 2px 2px',
              }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-2 bg-neutral-950 rounded-full" />
            </div>
          </div>
        )}

        {/* Gourmet Anime Galaxy Entremet Cake SVG */}
        <div className="relative">
          {/* Side Sparkler Embers */}
          <div className="absolute -left-6 top-14 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`spk-l-${i}`}
                className="absolute w-1 h-1 rounded-full bg-amber-300"
                style={{ boxShadow: '0 0 6px #fde047' }}
                animate={{
                  x: [0, -25 - Math.random() * 25],
                  y: [0, -25 - Math.random() * 35],
                  opacity: [1, 0],
                  scale: [1, 0.2],
                }}
                transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
          <div className="absolute -right-6 top-14 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`spk-r-${i}`}
                className="absolute w-1 h-1 rounded-full bg-emerald-300"
                style={{ boxShadow: '0 0 6px #6ee7b7' }}
                animate={{
                  x: [0, 25 + Math.random() * 25],
                  y: [0, -25 - Math.random() * 35],
                  opacity: [1, 0],
                  scale: [1, 0.2],
                }}
                transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>

          <svg
            viewBox="0 0 280 190"
            style={{ width: 'min(320px, 84vw)', height: 'auto', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="animeBottomTier" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1038" />
                <stop offset="50%" stopColor="#100624" />
                <stop offset="100%" stopColor="#05020f" />
              </linearGradient>

              <linearGradient id="animeTopTier" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#251347" />
                <stop offset="60%" stopColor="#14082e" />
                <stop offset="100%" stopColor="#070316" />
              </linearGradient>

              <linearGradient id="animeVioletGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="60%" stopColor="#7e22ce" />
                <stop offset="100%" stopColor="#3b0764" />
              </linearGradient>

              <linearGradient id="animeEmeraldGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>

              <linearGradient id="animeGoldStand" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              <linearGradient id="animePlaqueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>

            {/* Gold Serving Stand */}
            <ellipse cx="140" cy="178" rx="135" ry="9" fill="url(#animeGoldStand)" />
            <ellipse cx="140" cy="175" rx="130" ry="7" fill="#0f0724" stroke="#fbbf24" strokeWidth="0.8" />

            {/* ===== BOTTOM TIER ===== */}
            <rect
              x="25" y="105" width="230" height="68" rx="12"
              fill="url(#animeBottomTier)"
              stroke="rgba(139,92,246,0.5)"
              strokeWidth="1.5"
            />
            {/* Dripping Glaze — Bottom Tier */}
            <path
              d="M25,105 L255,105 
                 C255,116 245,122 240,122 
                 C235,122 230,111 220,111 
                 C210,111 205,128 195,128 
                 C185,128 180,113 170,113 
                 C160,113 155,130 145,130 
                 C135,130 130,114 120,114 
                 C110,114 105,129 95,129 
                 C85,129 80,113 70,113 
                 C60,113 55,124 45,124 
                 C35,124 30,113 25,105 Z"
              fill="url(#animeVioletGlaze)"
            />
            {/* Gold leaf foil specks */}
            {[45, 95, 145, 195, 235].map((cx, i) => (
              <circle key={`gleaf-${i}`} cx={cx} cy={i % 2 === 0 ? 123 : 129} r="2.5" fill="#fde047" />
            ))}

            {/* Minimalist Anime Plaque: RISHA */}
            <rect
              x="88" y="134" width="104" height="28" rx="6"
              fill="#060214"
              stroke="url(#animePlaqueGrad)"
              strokeWidth="1.5"
            />
            <text
              x="140" y="153"
              textAnchor="middle"
              fontSize="14"
              fontFamily="Cinzel, serif"
              fontWeight="900"
              letterSpacing="3"
              fill="url(#animePlaqueGrad)"
              style={{ filter: 'drop-shadow(0 0 5px #fde047)' }}
            >
              RISHA
            </text>

            {/* ===== TOP TIER ===== */}
            <rect
              x="60" y="48" width="160" height="60" rx="10"
              fill="url(#animeTopTier)"
              stroke="rgba(168,85,247,0.5)"
              strokeWidth="1.5"
            />
            {/* Top Tier Emerald Glaze */}
            <path
              d="M60,48 L220,48 
                 C220,57 212,63 205,63 
                 C198,63 192,53 185,53 
                 C178,53 172,67 165,67 
                 C158,67 152,54 145,54 
                 C138,54 132,69 125,69 
                 C118,69 112,55 105,55 
                 C98,55 92,66 85,66 
                 C78,66 72,56 60,48 Z"
              fill="url(#animeEmeraldGlaze)"
            />

            {/* Architectural Crystal Sugar Shards on Top */}
            <polygon points="75,48 79,28 85,48" fill="#6ee7b7" opacity="0.85" />
            <polygon points="105,48 110,22 116,48" fill="#c084fc" opacity="0.85" />
            <polygon points="165,48 171,20 178,48" fill="#fde047" opacity="0.85" />
            <polygon points="195,48 200,26 206,48" fill="#67e8f9" opacity="0.85" />

            {/* Star Pearls */}
            {[90, 135, 180].map((x, i) => (
              <circle key={`pearl-${i}`} cx={x} cy="48" r="3" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)" />
            ))}
          </svg>
        </div>

        {/* Wish Prompt */}
        {!blown && (
          <motion.p
            className="text-slate-300 font-serif italic text-sm md:text-base tracking-wide mt-3"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            🕯️ Make a silent wish &amp; tap the flame to ignite the stars.
          </motion.p>
        )}

        {/* Post-Extinguish Celebratory Action */}
        {blown && (
          <motion.div
            className="flex flex-col items-center gap-3 mt-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-emerald-300 font-mono text-xs md:text-sm tracking-widest uppercase">
              ✦ A WISH ENTRUSTED TO THE CELESTIAL REALM ✦
            </p>

            <motion.button
              onClick={handleExtraCelebration}
              className="px-7 py-3 rounded-xl font-mono text-xs md:text-sm tracking-[0.2em] text-white uppercase cursor-pointer select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 10, 48, 0.85) 0%, rgba(10, 5, 30, 0.95) 100%)',
                border: '1px solid rgba(251, 191, 36, 0.8)',
                boxShadow: '0 0 25px rgba(251, 191, 36, 0.35)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(251, 191, 36, 0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              ✦ IGNITE CELESTIAL FIREWORKS ✦
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Floating Starlight Orbs Rising Gracefully */}
      {showBanner && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${8 + i * 8}%`,
                bottom: '-30px',
                width: `${4 + (i % 3) * 3}px`,
                height: `${4 + (i % 3) * 3}px`,
                background: i % 3 === 0 ? '#fde047' : i % 2 === 0 ? '#6ee7b7' : '#c084fc',
                boxShadow: `0 0 15px ${i % 3 === 0 ? '#fde047' : i % 2 === 0 ? '#6ee7b7' : '#c084fc'}`,
              }}
              animate={{
                y: [-30, -window.innerHeight - 120],
                x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: 6 + i * 0.7,
                repeat: Infinity,
                delay: i * 0.35,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'
import SpatialCard from '../components/SpatialCard'

const stops = [
  {
    img: '/images/risha1.jpg',
    cropPosition: 'center center',
    message: 'Every universe needs an anchor of pure joy, and having you as my best friend makes every day a hundred times brighter.',
    label: 'ARCHIVE // 01',
    color: '#6ee7b7',
  },
  {
    img: '/images/risha2.jpg',
    cropPosition: 'center center',
    message: 'From our wildest laughs to all the late-night chats, you are the one friend who always understands my brand of chaos.',
    label: 'ARCHIVE // 02',
    color: '#c084fc',
  },
  {
    img: '/images/risha3.jpg',
    cropPosition: 'center center',
    message: 'You radiate an energy that makes everyone around you smile. Truly grateful to have a best friend as genuine and fun as you.',
    label: 'ARCHIVE // 03',
    color: '#6ee7b7',
  },
  {
    img: '/images/risha4.jpg',
    cropPosition: 'center center',
    message: 'Through thick and thin, you have always had my back. A friendship as loyal and rare as ours is once in a lifetime.',
    label: 'ARCHIVE // 04',
    color: '#c084fc',
  },
  {
    img: '/images/risha5.jpg',
    cropPosition: 'center center',
    message: 'To my favorite partner in crime and truest confidante — thank you for every unforgettable memory and all the ones still to come.',
    label: 'ARCHIVE // 05',
    color: '#fbbf24',
  },
]

function WarpTunnel() {
  return (
    <motion.div
      className="absolute inset-0 z-30 pointer-events-none overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Light streak lines zooming outward */}
      {[...Array(40)].map((_, i) => {
        const angle = (i * 9 * Math.PI) / 180
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '3px',
              height: '3px',
              background: i % 2 === 0 ? '#6ee7b7' : '#c084fc',
              boxShadow: `0 0 12px ${i % 2 === 0 ? '#6ee7b7' : '#c084fc'}`,
            }}
            initial={{ x: 0, y: 0, scale: 0.5, opacity: 0 }}
            animate={{
              x: cos * 700,
              y: sin * 700,
              scaleX: 20,
              scaleY: 1.2,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.85,
              ease: 'easeIn',
              delay: (i % 8) * 0.03,
            }}
          />
        )
      })}
      {/* Central speed flash */}
      <motion.div
        className="w-56 h-56 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(16,185,129,0.4) 40%, transparent 70%)',
        }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

function CelestialBeacon({ x }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
      style={{ left: `${x}%` }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative flex items-center justify-center">
        {/* Core Diamond */}
        <div className="w-5 h-5 rotate-45 bg-white shadow-[0_0_15px_#6ee7b7] border border-emerald-400" />
        {/* Orbit ring */}
        <div className="absolute w-8 h-8 rounded-full border border-violet-400/50 animate-spin" />
        {/* Trailing ion beam */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-20 w-20 h-[2px] rounded-full"
          style={{ background: 'linear-gradient(to left, rgba(110,231,183,0.9), transparent)' }}
        />
      </div>
    </motion.div>
  )
}

export default function Phase4Journey({ onComplete }) {
  const [stop, setStop] = useState(0)
  const [traveling, setTraveling] = useState(false)
  const [starX, setStarX] = useState(6)
  const [showCard, setShowCard] = useState(true)

  const handleContinue = () => {
    if (traveling) return
    setShowCard(false)
    setTraveling(true)
    setTimeout(() => {
      if (stop >= 4) {
        onComplete()
      } else {
        setStop(s => s + 1)
        setStarX(10 + (stop + 1) * 16)
        setTraveling(false)
        setShowCard(true)
      }
    }, 1050)
  }

  const current = stops[stop]

  return (
    <div className="relative w-full min-h-screen bg-[#02000d] overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <Starfield count={240} speed={traveling ? 2.0 : 0.18} />

      {/* Atmospheric Aurora Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '650px', height: '450px',
            top: '12%', left: '-8%',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '550px', height: '400px',
            bottom: '8%', right: '-8%',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Sleek Top Navigation Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-72 max-w-[90vw] z-20">
        <div className="flex justify-between mb-1.5 items-center">
          <span className="text-slate-400 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
            CELESTIAL TRANSIT
          </span>
          <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            0{stop + 1} // 05
          </span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden p-[1px]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, #10B981, #8B5CF6, #FBBF24)' }}
            animate={{ width: `${((stop + 1) / 5) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Orbit Tracker on Desktop */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <CelestialBeacon x={starX} />
      </div>

      {/* 3D Spatial Anime Polaroid Card */}
      <AnimatePresence mode="wait">
        {showCard && (
          <motion.div
            key={stop}
            className="relative z-10 flex flex-col items-center gap-5 max-w-sm w-full"
            initial={{ opacity: 0, scale: 0.45, z: -350, y: 35 }}
            animate={{ opacity: 1, scale: 1, z: 0, y: 0 }}
            exit={{ opacity: 0, scale: 1.7, z: 250, y: -50 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 130, damping: 16 }}
          >
            {/* Interactive 3D Spatial Tilt Card */}
            <SpatialCard glowColor={current.color} className="w-full">
              <div className="p-4 flex flex-col items-center">
                {/* Header Tag */}
                <div className="w-full flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ background: current.color }} />
                    <span className="text-xs font-mono font-bold tracking-widest" style={{ color: current.color }}>
                      {current.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                    ASTRAL MEMORY
                  </span>
                </div>

                {/* Photo container with refined frame */}
                <div
                  className="relative w-full rounded-lg overflow-hidden shadow-2xl border border-white/15 bg-black/40"
                  style={{ aspectRatio: '4/3' }}
                >
                  <img
                    src={current.img}
                    alt={`Memory ${stop + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ objectPosition: current.cropPosition || 'center center' }}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback */}
                  <div
                    className="absolute inset-0 items-center justify-center"
                    style={{
                      display: 'none',
                      background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(139,92,246,0.2) 100%)',
                    }}
                  >
                    <span className="text-4xl text-white">✧</span>
                  </div>
                  {/* Film gradient reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 65%, rgba(6,3,20,0.85) 100%)',
                    }}
                  />
                </div>

                {/* Heartwarming best-friend message in elegant literary font */}
                <div className="mt-4 px-2 text-center">
                  <p
                    className="text-slate-100 text-base md:text-lg font-serif leading-relaxed italic tracking-wide"
                    style={{
                      textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 15px rgba(139,92,246,0.3)',
                    }}
                  >
                    &ldquo;{current.message}&rdquo;
                  </p>
                </div>

                {/* Touch hint */}
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-3">
                  ✦ drag or tilt in 3D perspective ✦
                </span>
              </div>
            </SpatialCard>

            {/* Cinematic Button */}
            <motion.button
              onClick={handleContinue}
              disabled={traveling}
              className="px-8 py-3.5 rounded-xl font-mono text-xs md:text-sm tracking-[0.25em] text-white uppercase cursor-pointer relative overflow-hidden select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 10, 48, 0.8) 0%, rgba(10, 5, 30, 0.95) 100%)',
                border: '1px solid rgba(110, 231, 183, 0.5)',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
              whileHover={{
                scale: 1.04,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 0 35px rgba(16, 185, 129, 0.5)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              {stop < 4 ? '✦ WARP TO NEXT MEMORY ✦' : '✦ APPROACH EARTH ✦'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hyper-warp speed travel animation */}
      <AnimatePresence>
        {traveling && <WarpTunnel />}
      </AnimatePresence>
    </div>
  )
}
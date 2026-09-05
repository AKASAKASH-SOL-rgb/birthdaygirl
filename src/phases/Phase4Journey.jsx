import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'
import SpatialCard from '../components/SpatialCard'

const stops = [
  {
    img: '/images/risha1.jpg',
    cropPosition: 'center center',
    message: 'Every universe needs an anchor of pure joy, and having you as my best friend makes every day a hundred times brighter.',
    label: 'Stop 1 of 5',
    color: '#39FF14',
  },
  {
    img: '/images/risha2.jpg',
    cropPosition: 'center center',
    message: 'From our wildest laughs to all the late-night chats, you are the one friend who always understands my brand of chaos.',
    label: 'Stop 2 of 5',
    color: '#8B5CF6',
  },
  {
    img: '/images/risha3.jpg',
    cropPosition: 'center center',
    message: 'You radiate an energy that makes everyone around you smile. Truly grateful to have a best friend as genuine and fun as you.',
    label: 'Stop 3 of 5',
    color: '#39FF14',
  },
  {
    img: '/images/risha4.jpg',
    cropPosition: 'center center',
    message: 'Through thick and thin, you have always had my back. A friendship as loyal and rare as ours is once in a lifetime.',
    label: 'Stop 4 of 5',
    color: '#8B5CF6',
  },
  {
    img: '/images/risha5.jpg',
    cropPosition: 'center center',
    message: 'To my favorite partner in crime and truest confidante — thank you for every unforgettable memory and all the ones still to come.',
    label: 'Stop 5 of 5',
    color: '#FFD700',
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
      {[...Array(36)].map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '4px',
              height: '4px',
              background: i % 2 === 0 ? '#39FF14' : '#8B5CF6',
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#39FF14' : '#8B5CF6'}`,
            }}
            initial={{ x: 0, y: 0, scale: 0.5, opacity: 0 }}
            animate={{
              x: cos * 600,
              y: sin * 600,
              scaleX: 18,
              scaleY: 1.5,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.85,
              ease: 'easeIn',
              delay: (i % 6) * 0.04,
            }}
          />
        )
      })}
      {/* Central speed flash */}
      <motion.div
        className="w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(57,255,20,0.6) 0%, rgba(139,92,246,0.3) 50%, transparent 70%)',
        }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 4], opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

function StarTraveler({ x }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
      style={{ left: `${x}%` }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative">
        <svg width="44" height="44" viewBox="0 0 48 48">
          <defs>
            <radialGradient id="tGrad">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#39FF14" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </radialGradient>
          </defs>
          <polygon
            points="24,2 29,16 44,16 33,26 37,42 24,33 11,42 15,26 4,16 19,16"
            fill="url(#tGrad)"
            stroke="#8B5CF6"
            strokeWidth="1"
          />
          <circle cx="21" cy="21" r="2" fill="#000" />
          <circle cx="27" cy="21" r="2" fill="#000" />
          <circle cx="21.8" cy="20.2" r="0.8" fill="white" />
          <circle cx="27.8" cy="20.2" r="0.8" fill="white" />
          <path d="M21 26 Q24 29 27 26" stroke="#000" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-16 w-16 h-1 rounded-full"
          style={{ background: 'linear-gradient(to left, rgba(57,255,20,0.8), transparent)' }}
        />
      </div>
    </motion.div>
  )
}

export default function Phase4Journey({ onComplete }) {
  const [stop, setStop] = useState(0)
  const [traveling, setTraveling] = useState(false)
  const [starX, setStarX] = useState(5)
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
    }, 1100)
  }

  const current = stops[stop]

  return (
    <div className="relative w-full min-h-screen bg-[#000008] overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <Starfield count={220} speed={traveling ? 1.5 : 0.15} />

      {/* Parallax space nebulas */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '650px', height: '450px',
            top: '15%', left: '-10%',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '550px', height: '400px',
            bottom: '10%', right: '-10%',
            background: 'radial-gradient(ellipse, rgba(57,255,20,0.12) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Progress navigation bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-72 max-w-[90vw] z-20">
        <div className="flex justify-between mb-1.5 items-center">
          <span className="text-white/60 text-xs font-bold tracking-wider uppercase font-['Nunito']">
            ✦ Space Journey
          </span>
          <span className="text-xs font-mono text-violet-300 bg-violet-950/50 px-2 py-0.5 rounded-full border border-violet-800/40">
            {stop + 1} / 5
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, #39FF14, #8B5CF6, #FFD700)' }}
            animate={{ width: `${((stop + 1) / 5) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Star traveler icon on map */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <StarTraveler x={starX} />
      </div>

      {/* 3D Spatial Polaroid Card */}
      <AnimatePresence mode="wait">
        {showCard && (
          <motion.div
            key={stop}
            className="relative z-10 flex flex-col items-center gap-5 max-w-sm w-full"
            initial={{ opacity: 0, scale: 0.4, z: -300, y: 40 }}
            animate={{ opacity: 1, scale: 1, z: 0, y: 0 }}
            exit={{ opacity: 0, scale: 1.8, z: 250, y: -60 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 140, damping: 16 }}
          >
            {/* Interactive 3D Spatial Tilt Card */}
            <SpatialCard glowColor={current.color} className="w-full">
              <div className="p-4 flex flex-col items-center">
                {/* Header Tag */}
                <div className="w-full flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ background: current.color }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: current.color }}>
                      {current.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/50 tracking-wider">Memory Log</span>
                </div>

                {/* Photo container */}
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-inner border border-white/10"
                  style={{ aspectRatio: '4/3' }}
                >
                  <img
                    src={current.img}
                    alt={`Memory ${stop + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
                      background: 'linear-gradient(135deg, rgba(57,255,20,0.2) 0%, rgba(139,92,246,0.2) 100%)',
                    }}
                  >
                    <span className="text-5xl">⭐</span>
                  </div>
                  {/* Cinematic starlight gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 65%, rgba(12,8,30,0.7) 100%)',
                    }}
                  />
                </div>

                {/* Heartwarming best-friend message */}
                <div className="mt-4 px-2 text-center">
                  <p
                    className="text-white text-sm md:text-[15px] font-['Nunito'] leading-relaxed font-semibold italic"
                    style={{
                      textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(139,92,246,0.3)',
                    }}
                  >
                    &ldquo;{current.message}&rdquo;
                  </p>
                </div>

                {/* Mobile interaction hint */}
                <span className="text-[10px] text-white/30 uppercase tracking-widest mt-3">
                  ✦ tilt or touch to rotate in 3D ✦
                </span>
              </div>
            </SpatialCard>

            {/* Continue Journey button with spatial glow */}
            <motion.button
              onClick={handleContinue}
              disabled={traveling}
              className="px-9 py-3.5 rounded-full font-bold text-sm md:text-base font-['Nunito'] tracking-wider text-white cursor-pointer relative overflow-hidden select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.3), rgba(139,92,246,0.45))',
                border: '1.5px solid rgba(57,255,20,0.7)',
                boxShadow: '0 0 25px rgba(57,255,20,0.35), 0 0 50px rgba(139,92,246,0.2)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(57,255,20,0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              {stop < 4 ? '✦ Warp To Next Memory ✦' : '✦ Arrive at Earth ✦'}
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

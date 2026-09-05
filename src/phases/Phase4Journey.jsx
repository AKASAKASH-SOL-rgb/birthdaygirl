import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '../components/Starfield'

const stops = [
  {
    img: '/images/risha1.jpg',
    // ↓ Change to: 'top', 'center', 'bottom', 'left', 'right', or e.g. '50% 30%'
    cropPosition: 'center center',
    message: 'Every universe has its brightest star, and in mine, that star is you. Thank you for being the most amazing best friend.',
    label: 'Stop 1 of 5',
  },
  {
    img: '/images/risha2.jpg',
    cropPosition: 'center center',
    message: 'Through all the cosmic chaos, your laugh is the gravity that keeps me grounded and happy.',
    label: 'Stop 2 of 5',
  },
  {
    img: '/images/risha3.jpg',
    cropPosition: 'center center',
    message: 'Even across a million lightyears, I\'d still find you. You bring so much joy into every space you enter.',
    label: 'Stop 3 of 5',
  },
  {
    img: '/images/risha4.jpg',
    cropPosition: 'center center',
    message: 'To the one who holds my galaxies together — your kindness is a literal force of nature.',
    label: 'Stop 4 of 5',
  },
  {
    img: '/images/risha5.jpg',
    cropPosition: 'center center',
    message: 'Like a constellation, you guide me through the dark. I cherish every single memory we share.',
    label: 'Stop 5 of 5',
  },
]

function StarTraveler({ x }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
      style={{ left: `${x}%` }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative">
        <svg width="48" height="48" viewBox="0 0 48 48">
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
        {/* Trail */}
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
    }, 1200)
  }

  const current = stops[stop]

  return (
    <div className="relative w-full min-h-screen bg-[#000008] overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <Starfield count={200} speed={0.1} />

      {/* Progress bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-64 z-20">
        <div className="flex justify-between mb-1">
          <span className="text-white/40 text-xs font-['Nunito'] tracking-wide">Journey</span>
          <span className="text-white/40 text-xs font-['Nunito']">{stop + 1} / 5</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, #39FF14, #8B5CF6)' }}
            animate={{ width: `${((stop + 1) / 5) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Star traveler */}
      <div className="absolute inset-0 pointer-events-none">
        <StarTraveler x={starX} />
      </div>

      {/* Polaroid card */}
      <AnimatePresence mode="wait">
        {showCard && (
          <motion.div
            key={stop}
            className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full"
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Floating animation wrapper */}
            <motion.div
              className="w-full"
              animate={{ y: [0, -8, 0], rotate: [0, 0.5, -0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Polaroid frame */}
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '2px solid rgba(139,92,246,0.5)',
                  boxShadow: '0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(57,255,20,0.2)',
                }}
              >
                {/* Top label */}
                <div className="px-4 py-2 flex justify-between items-center">
                  <span className="text-xs text-violet-400 font-['Nunito'] tracking-widest uppercase">
                    ✦ {current.label}
                  </span>
                  <span className="text-xs text-green-400 font-['Nunito']">Memory Fragment</span>
                </div>

                {/* Photo area */}
                <div className="relative mx-4 rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={current.img}
                    alt={`Memory ${stop + 1}`}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: current.cropPosition || 'center center' }}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div
                    className="absolute inset-0 items-center justify-center"
                    style={{
                      display: 'none',
                      background: 'linear-gradient(135deg, rgba(57,255,20,0.2) 0%, rgba(139,92,246,0.2) 100%)',
                    }}
                  >
                    <span className="text-5xl">⭐</span>
                  </div>
                  {/* Shimmer overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                    }}
                  />
                </div>

                {/* Message area */}
                <div className="px-4 py-4">
                  <p
                    className="text-center text-white/90 text-sm md:text-base font-['Nunito'] leading-relaxed italic"
                    style={{ textShadow: '0 0 10px rgba(139,92,246,0.5)' }}
                  >
                    &ldquo;{current.message}&rdquo;
                  </p>
                </div>

                {/* Sparkle corners */}
                {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                  <motion.span
                    key={i}
                    className={`absolute ${pos} text-xs pointer-events-none`}
                    style={{ color: i % 2 === 0 ? '#39FF14' : '#8B5CF6' }}
                    animate={{ opacity: [0.4, 1, 0.4], rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    ✦
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Continue button */}
            <motion.button
              onClick={handleContinue}
              disabled={traveling}
              className="px-8 py-3.5 rounded-full font-bold text-base font-['Nunito'] tracking-wide text-white cursor-pointer relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.2), rgba(139,92,246,0.3))',
                border: '1.5px solid rgba(57,255,20,0.6)',
                boxShadow: '0 0 20px rgba(57,255,20,0.3)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(57,255,20,0.6)' }}
              whileTap={{ scale: 0.97 }}
            >
              {stop < 4 ? '✦ Continue Journey ✦' : '✦ Arrive at Destination ✦'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Traveling overlay */}
      <AnimatePresence>
        {traveling && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-5xl"
              animate={{ x: [-100, 400], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.1 }}
            >
              ⭐
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

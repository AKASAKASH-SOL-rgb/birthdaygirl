import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Phase2Spark({ onComplete }) {
  const [burst, setBurst] = useState(false)

  const handleClick = () => {
    if (burst) return
    setBurst(true)
    setTimeout(() => onComplete(), 1200)
  }

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Ambient particles in dark */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#39FF14' : '#8B5CF6',
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Burst overlay */}
      <AnimatePresence>
        {burst && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: [0, 1, 0], scale: [0.1, 8, 12] }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{
              background: 'radial-gradient(ellipse at center, #ffffff 0%, #39FF14 25%, #8B5CF6 55%, transparent 80%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* The Button */}
      {!burst && (
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 150 }}
        >
          {/* Pre-button cosmic hint */}
          <motion.p
            className="text-white/30 text-sm tracking-[0.3em] uppercase font-['Nunito']"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ a secret awaits ✦
          </motion.p>

          {/* The glowing button */}
          <motion.button
            onClick={handleClick}
            className="relative px-10 py-5 rounded-full font-bold text-xl tracking-wider text-white font-['Cinzel'] cursor-pointer select-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.3) 0%, rgba(57,255,20,0.15) 100%)',
              border: '2px solid rgba(139,92,246,0.7)',
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(57,255,20,0.6), 0 0 40px rgba(57,255,20,0.3)',
                '0 0 30px rgba(139,92,246,0.8), 0 0 60px rgba(139,92,246,0.4)',
                '0 0 20px rgba(57,255,20,0.6), 0 0 40px rgba(57,255,20,0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            ✦ Let there be light ✦
          </motion.button>

          {/* Orbiting sparkles around button */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: i % 2 === 0 ? '#39FF14' : '#8B5CF6' }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 90,
                  Math.cos(((angle + 360) * Math.PI) / 180) * 90,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 90,
                  Math.sin(((angle + 360) * Math.PI) / 180) * 90,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.8,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

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
    <div className="relative w-full min-h-screen bg-[#02000d] flex items-center justify-center overflow-hidden">
      {/* Subtle floating cosmic stardust */}
      {[...Array(28)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${Math.random() * 2.5 + 1}px`,
            height: `${Math.random() * 2.5 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#6ee7b7' : '#c084fc',
          }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5 + Math.random() * 2.5, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Prismatic Anime Supernova Light Burst */}
      <AnimatePresence>
        {burst && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {/* Blinding central flash */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 1, 0], scale: [0.2, 10, 15] }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle at center, #ffffff 0%, #00F0FF 20%, #8B5CF6 50%, transparent 75%)',
              }}
            />
            {/* Cross flare streaks */}
            <motion.div
              className="absolute w-[200vw] h-[3px] bg-white shadow-[0_0_20px_#fff]"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: [1, 0] }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute h-[200vh] w-[3px] bg-white shadow-[0_0_20px_#fff]"
              initial={{ scaleY: 0, opacity: 1 }}
              animate={{ scaleY: 1, opacity: [1, 0] }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mature Anime Celestial Sigil Trigger */}
      {!burst && (
        <motion.div
          className="relative z-10 flex flex-col items-center gap-7 px-4"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, type: 'spring', stiffness: 120 }}
        >
          {/* Header Coordinates */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-violet-400/70">
              ASTRAL ARCHIVE // INITIALIZATION
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
          </div>

          {/* Glowing Geometric Celestial Seal Button */}
          <motion.button
            onClick={handleClick}
            className="group relative px-10 py-5 rounded-xl font-cinzel font-bold text-sm md:text-base tracking-[0.25em] text-white cursor-pointer select-none overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 10, 48, 0.8) 0%, rgba(10, 5, 30, 0.95) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
            whileHover={{
              scale: 1.05,
              borderColor: 'rgba(57, 255, 20, 0.7)',
              boxShadow: '0 0 45px rgba(57, 255, 20, 0.45), 0 0 70px rgba(139, 92, 246, 0.3)',
            }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Corner geometric brackets */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-400 transition-colors group-hover:border-white" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-emerald-400 transition-colors group-hover:border-white" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-emerald-400 transition-colors group-hover:border-white" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-400 transition-colors group-hover:border-white" />

            {/* Glowing Button Text */}
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-emerald-400 text-xs">◆</span>
              <span>IGNITE THE STARS</span>
              <span className="text-emerald-400 text-xs">◆</span>
            </span>

            {/* Subtle internal shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </motion.button>

          {/* Subtext */}
          <p className="text-slate-400/60 text-xs tracking-widest font-mono uppercase">
            ✦ tap to illuminate the cosmos ✦
          </p>
        </motion.div>
      )}
    </div>
  )
}
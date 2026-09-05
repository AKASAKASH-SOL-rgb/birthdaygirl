import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Phase1Preloader from './phases/Phase1Preloader'
import Phase2Spark from './phases/Phase2Spark'
import Phase3CosmicOrigin from './phases/Phase3CosmicOrigin'
import Phase4Journey from './phases/Phase4Journey'
import Phase5SolarSystem from './phases/Phase5SolarSystem'
import Phase6Landing from './phases/Phase6Landing'
import Phase7Shatter from './phases/Phase7Shatter'
import Phase8Finale from './phases/Phase8Finale'

export default function App() {
  const [phase, setPhase] = useState(1)

  const advance = () => setPhase(p => p + 1)

  const pageVariants = {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 1.1, filter: 'blur(4px)', transition: { duration: 0.6, ease: 'easeInOut' } },
  }

  return (
    <div className="relative w-full min-h-screen bg-[#000008] overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div key="phase1" {...pageVariants} className="w-full min-h-screen">
            <Phase1Preloader onComplete={advance} />
          </motion.div>
        )}
        {phase === 2 && (
          <motion.div key="phase2" {...pageVariants} className="w-full min-h-screen">
            <Phase2Spark onComplete={advance} />
          </motion.div>
        )}
        {phase === 3 && (
          <motion.div key="phase3" {...pageVariants} className="w-full min-h-screen">
            <Phase3CosmicOrigin onComplete={advance} />
          </motion.div>
        )}
        {phase === 4 && (
          <motion.div key="phase4" {...pageVariants} className="w-full min-h-screen">
            <Phase4Journey onComplete={advance} />
          </motion.div>
        )}
        {phase === 5 && (
          <motion.div key="phase5" {...pageVariants} className="w-full min-h-screen">
            <Phase5SolarSystem onComplete={advance} />
          </motion.div>
        )}
        {phase === 6 && (
          <motion.div key="phase6" {...pageVariants} className="w-full min-h-screen">
            <Phase6Landing onComplete={advance} />
          </motion.div>
        )}
        {phase === 7 && (
          <motion.div key="phase7" {...pageVariants} className="w-full min-h-screen">
            <Phase7Shatter onComplete={advance} />
          </motion.div>
        )}
        {phase === 8 && (
          <motion.div key="phase8" {...pageVariants} className="w-full min-h-screen">
            <Phase8Finale />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

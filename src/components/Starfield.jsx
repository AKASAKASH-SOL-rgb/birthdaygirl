import { useEffect, useRef } from 'react'

export default function Starfield({ count = 200, speed = 0.3 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * speed + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.85
        ? (Math.random() > 0.5 ? '#a78bfa' : '#86efac')
        : '#ffffff',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.alpha += s.twinkleSpeed * s.twinkleDir
        if (s.alpha >= 1) { s.alpha = 1; s.twinkleDir = -1 }
        if (s.alpha <= 0.1) { s.alpha = 0.1; s.twinkleDir = 1 }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.alpha
        ctx.fill()
      })
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count, speed])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

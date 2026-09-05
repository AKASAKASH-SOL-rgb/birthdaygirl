import { useEffect, useRef } from 'react'

export default function Starfield({ count = 220, speed = 0.25 }) {
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

    // Layered stars for depth
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.75
        ? (Math.random() > 0.5 ? '#c084fc' : '#6ee7b7')
        : (Math.random() > 0.85 ? '#fde047' : '#ffffff'),
    }))

    // Anime shooting star manager
    let shootingStar = null
    const spawnShootingStar = () => {
      const startX = Math.random() * window.innerWidth * 0.8
      const startY = Math.random() * (window.innerHeight * 0.4)
      const length = 120 + Math.random() * 180
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3
      shootingStar = {
        x: startX,
        y: startY,
        vx: Math.cos(angle) * (14 + Math.random() * 8),
        vy: Math.sin(angle) * (14 + Math.random() * 8),
        length,
        life: 0,
        maxLife: 45,
        color: Math.random() > 0.5 ? '#6ee7b7' : '#c084fc',
      }
    }

    let frameCount = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameCount++

      // Draw background twinkling stars
      stars.forEach(s => {
        s.alpha += s.twinkleSpeed * s.twinkleDir
        if (s.alpha >= 0.95) { s.alpha = 0.95; s.twinkleDir = -1 }
        if (s.alpha <= 0.15) { s.alpha = 0.15; s.twinkleDir = 1 }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.alpha
        ctx.fill()
      })

      // Randomly spawn shooting star every ~200 frames
      if (!shootingStar && Math.random() < 0.008) {
        spawnShootingStar()
      }

      // Draw active anime shooting star
      if (shootingStar) {
        shootingStar.x += shootingStar.vx
        shootingStar.y += shootingStar.vy
        shootingStar.life++

        const progress = shootingStar.life / shootingStar.maxLife
        const alpha = Math.sin(progress * Math.PI)

        if (alpha > 0) {
          const tailX = shootingStar.x - (shootingStar.vx / 14) * shootingStar.length
          const tailY = shootingStar.y - (shootingStar.vy / 14) * shootingStar.length

          const grad = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y,
            tailX, tailY
          )
          grad.addColorStop(0, '#ffffff')
          grad.addColorStop(0.2, shootingStar.color)
          grad.addColorStop(1, 'transparent')

          ctx.beginPath()
          ctx.moveTo(shootingStar.x, shootingStar.y)
          ctx.lineTo(tailX, tailY)
          ctx.strokeStyle = grad
          ctx.lineWidth = 2.2
          ctx.globalAlpha = alpha
          ctx.stroke()

          // Head glow
          ctx.beginPath()
          ctx.arc(shootingStar.x, shootingStar.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.globalAlpha = alpha
          ctx.fill()
        }

        if (shootingStar.life >= shootingStar.maxLife) {
          shootingStar = null
        }
      }

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
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
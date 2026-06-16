import { useEffect, useRef } from 'react'

export default function CloudCanvas({ lightningTrigger }) {
  const canvasRef = useRef(null)
  const lightRef = useRef(null)
  const animRef = useRef(null)
  const cloudsRef = useRef([])
  const tRef = useRef(0)

  /* ── build clouds once ── */
  function makeClouds(w, h) {
    return Array.from({ length: 7 }, (_, i) => ({
      x: (w / 7) * i + Math.random() * 160,
      y: h * 0.12 + Math.random() * h * 0.55,
      bx: 0, by: 0,
      rx: 220 + Math.random() * 200,
      ry: 90  + Math.random() * 80,
      alpha: 0.045 + Math.random() * 0.065,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      ampX: 14 + Math.random() * 18,
      ampY: 8  + Math.random() * 10,
      freqX: 0.00018 + Math.random() * 0.00012,
      freqY: 0.00022 + Math.random() * 0.00014,
      drift: 0.08 + Math.random() * 0.06,
    }))
  }

  /* ── draw one cloud puff ── */
  function drawCloud(ctx, c) {
    ctx.save()
    ctx.globalAlpha = c.alpha
    /* soft radial — two layered ellipses for depth */
    const g1 = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.rx * 0.9)
    g1.addColorStop(0,   'rgba(180,230,255,0.9)')
    g1.addColorStop(0.35,'rgba(126,206,240,0.55)')
    g1.addColorStop(0.7, 'rgba(74,158,196,0.2)')
    g1.addColorStop(1,   'rgba(0,0,0,0)')

    ctx.filter = 'blur(42px)'
    ctx.fillStyle = g1
    ctx.beginPath()
    ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2)
    ctx.fill()

    /* brighter core highlight */
    ctx.filter = 'blur(18px)'
    ctx.globalAlpha = c.alpha * 0.55
    ctx.fillStyle = 'rgba(210,240,255,0.8)'
    ctx.beginPath()
    ctx.ellipse(c.x - c.rx * 0.1, c.y - c.ry * 0.15, c.rx * 0.38, c.ry * 0.38, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.filter = 'none'
    ctx.restore()
  }

  /* ── recursive lightning ── */
  function bolt(ctx, x1, y1, x2, y2, depth) {
    if (depth <= 0) return
    const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * Math.hypot(x2-x1, y2-y1) * 0.4
    const my = (y1 + y2) / 2 + (Math.random() - 0.5) * Math.hypot(x2-x1, y2-y1) * 0.25

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(mx, my)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = `rgba(190,230,255,${0.6 + depth * 0.08})`
    ctx.lineWidth = depth * 0.6
    ctx.shadowColor = '#7ECEF0'
    ctx.shadowBlur = 14
    ctx.stroke()

    bolt(ctx, x1, y1, mx, my, depth - 1)
    bolt(ctx, mx, my, x2, y2, depth - 1)

    /* branch */
    if (depth > 1 && Math.random() > 0.5) {
      const bx = mx + (Math.random() - 0.5) * 90
      const by = my + Math.random() * 80
      bolt(ctx, mx, my, bx, by, depth - 2)
    }
  }

  /* ── flash sequence ── */
  function flash(lc, lctx, count = 0) {
    if (count >= 3) {
      lc.style.opacity = '0'
      return
    }
    lctx.clearRect(0, 0, lc.width, lc.height)
    lc.style.opacity = '1'
    const sx = lc.width * (0.25 + Math.random() * 0.5)
    const ex = sx + (Math.random() - 0.5) * 140
    bolt(lctx, sx, 0, ex, lc.height * (0.35 + Math.random() * 0.3), 5)

    setTimeout(() => {
      lc.style.opacity = '0'
      setTimeout(() => flash(lc, lctx, count + 1), 90 + Math.random() * 80)
    }, 70 + Math.random() * 55)
  }

  useEffect(() => {
    const lc = lightRef.current
    if (!lc) return
    const lctx = lc.getContext('2d')
    lc.width  = window.innerWidth
    lc.height = window.innerHeight
    flash(lc, lctx)
  }, [lightningTrigger])

  useEffect(() => {
    const canvas = canvasRef.current
    const lc = lightRef.current
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      lc.width      = window.innerWidth
      lc.height     = window.innerHeight
      cloudsRef.current = makeClouds(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    function loop() {
      tRef.current++
      const t = tRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      cloudsRef.current.forEach(c => {
        c.x = c.bx + Math.sin(t * c.freqX + c.phaseX) * c.ampX
        c.y = c.by + Math.cos(t * c.freqY + c.phaseY) * c.ampY
        c.bx += c.drift * 0.25
        if (c.bx > canvas.width + 500) c.bx = -500
        drawCloud(ctx, c)
      })
      animRef.current = requestAnimationFrame(loop)
    }
    loop()

    /* ambient lightning every 5–12s */
    let ambientTimer
    function scheduleAmbient() {
      ambientTimer = setTimeout(() => {
        const lctx = lc.getContext('2d')
        flash(lc, lctx)
        scheduleAmbient()
      }, 5000 + Math.random() * 7000)
    }
    scheduleAmbient()

    return () => {
      cancelAnimationFrame(animRef.current)
      clearTimeout(ambientTimer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <canvas
        ref={lightRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2, opacity: 0, transition: 'opacity 0.15s ease' }}
      />
    </>
  )
}

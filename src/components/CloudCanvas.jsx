import { useEffect, useRef } from 'react'

export default function CloudCanvas({ lightningTrigger }) {
  const canvasRef = useRef(null)
  const lightRef = useRef(null)
  const animRef = useRef(null)
  const cloudsRef = useRef([])
  const tRef = useRef(0)
  const visibleRef = useRef(true)

  /* ── pre-render one soft, blurred cloud puff to an offscreen canvas ──
     (done once per cloud instead of every animation frame — blur filters
     are expensive, so we bake the result and just stamp it with drawImage) */
  function buildSprite(rx, ry, alpha) {
    const padX = 220
    const padY = 220
    const w = Math.ceil(rx * 2 + padX)
    const h = Math.ceil(ry * 2 + padY)
    const off = document.createElement('canvas')
    off.width = w
    off.height = h
    const octx = off.getContext('2d')
    const cx = w / 2
    const cy = h / 2

    octx.save()
    octx.globalAlpha = alpha
    const g1 = octx.createRadialGradient(cx, cy, 0, cx, cy, rx * 0.9)
    g1.addColorStop(0,   'rgba(180,230,255,0.9)')
    g1.addColorStop(0.35,'rgba(126,206,240,0.55)')
    g1.addColorStop(0.7, 'rgba(74,158,196,0.2)')
    g1.addColorStop(1,   'rgba(0,0,0,0)')

    octx.filter = 'blur(42px)'
    octx.fillStyle = g1
    octx.beginPath()
    octx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
    octx.fill()

    /* brighter core highlight */
    octx.filter = 'blur(18px)'
    octx.globalAlpha = alpha * 0.55
    octx.fillStyle = 'rgba(210,240,255,0.8)'
    octx.beginPath()
    octx.ellipse(cx - rx * 0.1, cy - ry * 0.15, rx * 0.38, ry * 0.38, 0, 0, Math.PI * 2)
    octx.fill()

    octx.filter = 'none'
    octx.restore()

    return { canvas: off, w, h }
  }

  /* ── build clouds once ── */
  function makeClouds(w, h) {
    return Array.from({ length: 7 }, (_, i) => {
      const rx = 220 + Math.random() * 200
      const ry = 90  + Math.random() * 80
      const alpha = 0.045 + Math.random() * 0.065
      return {
        x: (w / 7) * i + Math.random() * 160,
        y: h * 0.12 + Math.random() * h * 0.55,
        bx: 0, by: 0,
        rx, ry, alpha,
        sprite: buildSprite(rx, ry, alpha),
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        ampX: 14 + Math.random() * 18,
        ampY: 8  + Math.random() * 10,
        freqX: 0.00018 + Math.random() * 0.00012,
        freqY: 0.00022 + Math.random() * 0.00014,
        drift: 0.08 + Math.random() * 0.06,
      }
    })
  }

  /* ── draw one cloud puff (cheap: just stamps the pre-rendered sprite) ── */
  function drawCloud(ctx, c) {
    ctx.drawImage(c.sprite.canvas, c.x - c.sprite.w / 2, c.y - c.sprite.h / 2)
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

    /* debounce resize so dragging the window edge doesn't rebuild
       7 blurred sprites on every single resize tick */
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', onResize)

    function loop() {
      if (!visibleRef.current) { animRef.current = null; return }
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

    /* pause entirely (no rAF, no draws) when the hero scrolls out of view —
       it's invisible work the CPU was doing on every other section too */
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      if (entry.isIntersecting && animRef.current === null) {
        loop()
      }
    }, { threshold: 0 })
    observer.observe(canvas)

    /* ambient lightning every 5–12s */
    let ambientTimer
    function scheduleAmbient() {
      ambientTimer = setTimeout(() => {
        if (visibleRef.current) {
          const lctx = lc.getContext('2d')
          flash(lc, lctx)
        }
        scheduleAmbient()
      }, 5000 + Math.random() * 7000)
    }
    scheduleAmbient()

    return () => {
      cancelAnimationFrame(animRef.current)
      clearTimeout(ambientTimer)
      clearTimeout(resizeTimer)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
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

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const posRef  = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)

  useEffect(() => {
    /* hide on touch devices */
    if (!window.matchMedia('(hover: hover)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    function animate() {
      const { x, y } = posRef.current
      ringPos.current.x += (x - ringPos.current.x) * 0.10
      ringPos.current.y += (y - ringPos.current.y) * 0.10
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top  = ringPos.current.y + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    const addHover = () => ring.classList.add('scale-[1.7]', '!border-[#7ECEF0]', '!opacity-100')
    const rmHover  = () => ring.classList.remove('scale-[1.7]', '!border-[#7ECEF0]', '!opacity-100')

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', rmHover)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full bg-[#7ECEF0] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={ringRef}
        className="fixed w-9 h-9 rounded-full border border-[#7ECEF0]/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 opacity-70 hidden md:block"
      />
    </>
  )
}

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * A cute, soft cloud drawn as a single smooth closed bezier path,
 * scaled to fit the given width and height. Floats gently up and down.
 * Cracks a small yellow lightning bolt on hover.
 */
export default function Cloud({
  children,
  className = '',
  width = 260,
  height = 130,
  floatDuration = 4.5,
  floatDelay = 0,
  onClick,
  href,
}) {
  const [bolt, setBolt] = useState(null)
  const timeoutRef = useRef(null)

  const strikeLightning = useCallback(() => {
    const x = width * 0.32 + Math.random() * width * 0.36
    setBolt({ x, key: Date.now() })
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setBolt(null), 420)
  }, [width])

  const Tag = href ? 'a' : 'div'
  const gradId = `cf-${width}-${height}`.replace('.', '')

  /* a single closed cloud silhouette, normalized to a 100x60 box, then scaled */
  const cloudPath = `
    M 14 42
    C 6 42, 2 36, 4 30
    C 1 26, 4 18, 12 17
    C 13 8, 24 3, 32 9
    C 38 1, 52 1, 57 10
    C 66 6, 78 12, 77 21
    C 86 22, 88 33, 80 39
    C 84 46, 78 54, 69 53
    C 65 58, 54 59, 48 54
    C 42 59, 30 58, 26 52
    C 18 54, 11 49, 14 42
    Z
  `

  return (
    <motion.div
      className={`relative select-none ${className}`}
      style={{ width, height }}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      onMouseEnter={strikeLightning}
      data-hover
    >
      <Tag
        href={href}
        onClick={onClick}
        className="absolute inset-0 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.04]"
        style={{ textDecoration: 'none' }}
      >
        <svg
          viewBox="0 0 90 60"
          width={width}
          height={height}
          preserveAspectRatio="none"
          className="absolute inset-0 drop-shadow-[0_5px_16px_rgba(126,206,240,0.22)]"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A6E3FA" />
              <stop offset="100%" stopColor="#5FB8E0" />
            </linearGradient>
          </defs>
          <path
            d={cloudPath}
            fill={`url(#${gradId})`}
            stroke="#060F1A"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* two small soft cheeks of highlight to read as cute, not flat */}
          <ellipse cx="30" cy="16" rx="8" ry="5" fill="#ffffff" opacity="0.22" />
        </svg>

        <div className="relative z-10 px-6 text-center pointer-events-none">
          {children}
        </div>

        {bolt && (
          <svg
            key={bolt.key}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            className="absolute inset-0 pointer-events-none"
          >
            <polyline
              points={`${bolt.x},${height*0.5} ${bolt.x-7},${height*0.68} ${bolt.x+4},${height*0.74} ${bolt.x-9},${height*1.02}`}
              fill="none"
              stroke="#FFD23F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: 'drop-shadow(0 0 6px #FFD23F)',
                animation: 'boltFlash 0.42s ease-out forwards',
              }}
            />
          </svg>
        )}
      </Tag>
    </motion.div>
  )
}

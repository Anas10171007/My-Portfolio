import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CloudCanvas from './CloudCanvas'
import Cloud from './Cloud'

export default function Hero() {
  const [trigger, setTrigger] = useState(0)
  const heroRef = useRef(null)
  const wasInHero = useRef(true)

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      const bottom = hero.getBoundingClientRect().bottom
      const nowIn = bottom > 0
      if (wasInHero.current !== nowIn) {
        wasInHero.current = nowIn
        setTrigger(t => t + 1)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="full-section relative overflow-hidden bg-black"
    >
      <CloudCanvas lightningTrigger={trigger} />

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '160px', background: 'linear-gradient(to top, #000 0%, transparent 100%)', zIndex: 3 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-[1.25fr_0.85fr] gap-10 items-center">

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* floating cloud tag, positioned just above the name */}
          <div className="mb-3 -ml-2">
            <Cloud width={250} height={92} floatDuration={5}>
              <span className="font-['Titillium_Web'] font-bold text-white text-sm md:text-base tracking-wide whitespace-nowrap">
                Software Engineer
              </span>
            </Cloud>
          </div>

          <h1
            className="font-['Titillium_Web'] font-black text-white leading-[0.95] whitespace-nowrap"
            style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.9rem)' }}
          >
            Muhammad <span style={{ color: '#7ECEF0' }}>Anas</span>
          </h1>

          <p
            className="font-['Titillium_Web'] font-bold text-white mt-5"
            style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
          >
            Builder. Problem Solver. Critical Thinker.
          </p>

          <p className="font-['Inter'] font-light text-white/55 mt-4 leading-[1.85] max-w-md text-[0.92rem]">
            BS Software Engineering at FAST National University, Islamabad.
            I build systems from the ground up: neural networks, 2D game engines, logic circuits.
          </p>

          <div className="flex flex-wrap gap-3 mt-9 -ml-2">
            <Cloud href="#projects" width={205} height={84} floatDuration={4.2}>
              <span className="font-['Titillium_Web'] font-bold text-[#060F1A] text-[0.82rem] tracking-wide whitespace-nowrap">
                View Projects
              </span>
            </Cloud>
            <Cloud href="#contact" width={185} height={84} floatDuration={4.8} floatDelay={0.6}>
              <span className="font-['Titillium_Web'] font-bold text-[#060F1A] text-[0.82rem] tracking-wide whitespace-nowrap">
                Get In Touch
              </span>
            </Cloud>
          </div>
        </motion.div>

        {/* Photo column, isolated so text never collides */}
        <motion.div
          className="justify-self-center md:justify-self-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-56 h-72 md:w-64 md:h-80">
            <div className="absolute -top-3 -right-3 w-full h-full border border-[#7ECEF0]/30" />
            <img
              src="/me.webp"
              alt="Muhammad Anas"
              className="relative w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.92)' }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

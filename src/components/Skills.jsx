import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeIn from './FadeIn'
import Cloud from './Cloud'

const skills = [
  { name: 'C++ Development', desc: 'OOP architecture, virtual inheritance, template metaprogramming, SFML 3 game engine, complex state machines.' },
  { name: 'Python and Machine Learning', desc: 'Neural networks from scratch, Stochastic Gradient Descent, MVC architecture, data pipelines, forward and backpropagation.' },
  { name: 'C# and .NET Backend', desc: 'Structured backend development, service architecture, RESTful design patterns within the .NET ecosystem.' },
  { name: 'Algorithms and Mathematics', desc: 'Discrete mathematics, complexity analysis, sorting and searching, formal proofs, mathematical modeling.' },
  { name: 'Problem Solving', desc: 'Systematic decomposition of hard problems, architectural thinking, debugging across the full stack from hardware to application.' },
  { name: 'Digital Logic Design', desc: '74LS series ICs, encoder and decoder circuits, SR latches, 7 segment display drivers, breadboard prototyping from scratch.' },
]

function SkillCloud({ s, index }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn delay={index * 0.07}>
      <div
        className="flex flex-col items-center"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Cloud width={260} height={110} floatDuration={4 + (index % 3) * 0.6} floatDelay={index * 0.15}>
          <span className="font-['Titillium_Web'] font-bold text-white text-[0.95rem] leading-snug">
            {s.name}
          </span>
        </Cloud>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden"
              style={{ maxWidth: 260 }}
            >
              <p className="font-['Inter'] font-light text-white text-[0.82rem] leading-[1.7] text-center pt-3 px-2">
                {s.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="full-section py-28 px-6 md:px-16 bg-black"
    >
      <div className="max-w-6xl mx-auto w-full">

        <FadeIn className="text-center mb-16">
          <span className="font-['Inter'] text-[#7ECEF0] text-xs font-semibold tracking-[0.35em] uppercase">
            Technical Skills
          </span>
          <h2
            className="font-['Titillium_Web'] font-black text-white mt-3 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
          >
            What I Work With
          </h2>
          <div className="w-12 h-[2px] bg-[#7ECEF0]/60 mt-5 mx-auto" />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-4 justify-items-center">
          {skills.map((s, i) => <SkillCloud key={s.name} s={s} index={i} />)}
        </div>

      </div>
    </section>
  )
}

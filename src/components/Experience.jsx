import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

const experiences = [
  {
    title: 'Tetra Technology',
    tech: 'Backend Intern / C# / .NET',
    img: null,
    icon: 'stack',
    meta: 'Jun 2026 - Aug 2026 · Gulberg Greens, Islamabad · On-site',
    desc: 'A three month on-site backend internship working in C# and .NET. I learned Clean Architecture, the repository pattern, and the Microsoft Identity framework, along with how the backend of a real web application is structured and operated.',
    certificate: null,
  },
  {
    title: 'NASCON Hackathon',
    tech: 'Web Dev / Node.js / Supabase',
    img: null,
    icon: 'code',
    meta: 'FAST NUCES, Islamabad · Team Event',
    desc: 'Took part in the NASCON web development hackathon at FAST NUCES. Our team built a CRM using Node.js and Supabase, and I served as the backend manager, leading the backend side of the project.',
    certificate: null,
  },
]

const icons = {
  stack: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </>
  ),
  code: (
    <>
      <polyline points="8 7 3 12 8 17" />
      <polyline points="16 7 21 12 16 17" />
      <line x1="14" y1="5" x2="10" y2="19" />
    </>
  ),
}

function Placeholder({ icon, hovered }) {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{
        background:
          'radial-gradient(circle at 50% 32%, rgba(126,206,240,0.16) 0%, rgba(11,25,41,0.9) 48%, #060F1A 100%)',
      }}
      animate={{
        scale: hovered ? 1.05 : 1,
        filter: hovered ? 'brightness(0.5) saturate(0.85)' : 'brightness(0.9) saturate(0.95)',
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(126,206,240,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(126,206,240,0.07) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7ECEF0"
        strokeWidth="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-1/2 top-[30%] w-32 h-32 -translate-x-1/2 -translate-y-1/2 opacity-50"
      >
        {icons[icon]}
      </svg>
    </motion.div>
  )
}

function ExperienceCard({ e, index }) {
  const [hovered, setHovered] = useState(false)
  const isTouch = typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches
  const interactionProps = isTouch
    ? { onClick: () => setHovered(h => !h) }
    : { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }

  return (
    <FadeIn delay={index * 0.12}>
      <div
        data-hover
        className="relative overflow-hidden border border-white/10 group cursor-pointer h-[340px] md:h-[380px]"
        {...interactionProps}
      >
        {e.img ? (
          <motion.img
            src={e.img}
            alt={e.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              scale: hovered ? 1.05 : 1,
              filter: hovered ? 'brightness(0.5) saturate(0.85)' : 'brightness(0.75) saturate(0.95)',
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <Placeholder icon={e.icon} hovered={hovered} />
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)' }}
        />

        <div className="absolute inset-0 p-7 flex flex-col justify-end">
          <p className="font-['Inter'] text-[#7ECEF0] text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2">
            {e.tech}
          </p>
          <h3 className="font-['Titillium_Web'] font-black text-white text-xl leading-tight">
            {e.title}
          </h3>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {e.meta && (
                  <p className="font-['Inter'] text-white/60 text-[0.72rem] font-medium tracking-[0.12em] uppercase mt-3">
                    {e.meta}
                  </p>
                )}
                <p className="font-['Inter'] font-light text-white text-[0.86rem] leading-[1.7] mt-3">
                  {e.desc}
                </p>
                {e.certificate && (
                  <a
                    href={e.certificate}
                    target="_blank"
                    rel="noreferrer"
                    onClick={ev => ev.stopPropagation()}
                    className="inline-block mt-4 font-['Titillium_Web'] font-bold text-[0.78rem] tracking-[0.18em] uppercase text-[#7ECEF0] hover:text-white transition-colors duration-200"
                  >
                    View Certificate
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-[#7ECEF0]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </FadeIn>
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="full-section py-28 px-6 md:px-16 bg-black items-center"
    >
      <div className="max-w-6xl mx-auto w-full">

        <FadeIn className="mb-14">
          <span className="font-['Inter'] text-[#7ECEF0] text-xs font-semibold tracking-[0.35em] uppercase">
            Beyond The Classroom
          </span>
          <h2
            className="font-['Titillium_Web'] font-black text-white mt-3 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
          >
            Experience
          </h2>
          <div className="w-12 h-[2px] bg-[#7ECEF0]/60 mt-5" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5">
          {experiences.map((e, i) => <ExperienceCard key={e.title} e={e} index={i} />)}
        </div>

      </div>
    </section>
  )
}
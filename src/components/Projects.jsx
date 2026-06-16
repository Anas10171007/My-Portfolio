import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

const projects = [
  {
    title: 'Snowbros: Wonderland',
    tech: 'C++ / SFML 3 / Team Project',
    img: '/snowbros.webp',
    github: 'https://github.com/rayyanahmed25i3127/OOP_PROJECT_SP26_SNOWBROS_i253127_i253062',
    desc: 'A 2D platformer built with a 3 person team. Features animated state machines, gem collection systems, and powerup mechanics. I resolved complex Git merge conflicts across multiple files, fixed animation state bugs, gem sync issues, and powerup timing in the SFML 3 engine.',
  },
  {
    title: 'Battleship',
    tech: 'C++ / Console / OOP',
    img: '/battleship.webp',
    github: null,
    desc: 'A classic Battleship game with solid object oriented design. Implements clean grid logic, ship placement validation, and turn based gameplay mechanics. Demonstrates separation of concerns across the game engine, rendering, and player input layers.',
  },
  {
    title: 'Neural Network: MVC + SGD',
    tech: 'Python / Machine Learning',
    img: '/ai-mvc.webp',
    github: 'https://github.com/Anas10171007/mvc-mlp-25i-3062',
    desc: 'A Multi Layer Perceptron trained entirely from scratch using Stochastic Gradient Descent, structured with clean MVC architecture. Pure mathematical implementation of forward pass, backpropagation, and weight updates from first principles.',
  },
]

function ProjectCard({ p, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <FadeIn delay={index * 0.12}>
      <div
        data-hover
        className="relative overflow-hidden border border-white/10 group cursor-pointer h-[340px] md:h-[380px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.img
          src={p.img}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            scale: hovered ? 1.05 : 1,
            filter: hovered ? 'brightness(0.5) saturate(0.85)' : 'brightness(0.75) saturate(0.95)',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)' }}
        />

        <div className="absolute inset-0 p-7 flex flex-col justify-end">
          <p className="font-['Inter'] text-[#7ECEF0] text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2">
            {p.tech}
          </p>
          <h3 className="font-['Titillium_Web'] font-black text-white text-xl leading-tight">
            {p.title}
          </h3>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <p className="font-['Inter'] font-light text-white text-[0.86rem] leading-[1.7] mt-3">
                  {p.desc}
                </p>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-block mt-4 font-['Titillium_Web'] font-bold text-[0.78rem] tracking-[0.18em] uppercase text-[#7ECEF0] hover:text-white transition-colors duration-200"
                  >
                    View on GitHub
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

export default function Projects() {
  return (
    <section
      id="projects"
      className="full-section py-28 px-6 md:px-16 bg-black"
    >
      <div className="max-w-6xl mx-auto w-full">

        <FadeIn className="mb-14">
          <span className="font-['Inter'] text-[#7ECEF0] text-xs font-semibold tracking-[0.35em] uppercase">
            Selected Work
          </span>
          <h2
            className="font-['Titillium_Web'] font-black text-white mt-3 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
          >
            Projects
          </h2>
          <div className="w-12 h-[2px] bg-[#7ECEF0]/60 mt-5" />
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
        </div>

      </div>
    </section>
  )
}

import FadeIn from './FadeIn'

const facts = [
  { label: 'University', value: 'FAST National University', sub: 'BS Software Engineering, Islamabad' },
  { label: 'Intermediate', value: 'FSc Pre Engineering', sub: 'Grade A' },
  { label: 'Matriculation', value: 'Secondary School', sub: 'Grade A+' },
  { label: 'Achievement', value: 'Hafiz e Quran', sub: 'Memorized the complete Holy Quran' },
]

export default function About() {
  return (
    <section
      id="about"
      className="full-section py-28 px-6 md:px-16 bg-black"
    >
      <div className="max-w-6xl mx-auto w-full">

        <FadeIn className="mb-14">
          <span className="font-['Inter'] text-[#7ECEF0] text-xs font-semibold tracking-[0.35em] uppercase">
            About Me
          </span>
          <h2
            className="font-['Titillium_Web'] font-black text-white mt-3 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
          >
            Who I Am
          </h2>
          <div className="w-12 h-[2px] bg-[#7ECEF0]/60 mt-5" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          <FadeIn direction="left">
            <p className="font-['Inter'] font-light text-white/55 leading-[1.95] text-[0.97rem] mb-5">
              I am a Software Engineering student at FAST National University, Islamabad, drawn to problems that require both precision and creativity. Whether it is designing a neural network from scratch, debugging a real time SFML game, or assembling a logic circuit on a breadboard, I care about understanding systems at their core.
            </p>
            <p className="font-['Inter'] font-light text-white/55 leading-[1.95] text-[0.97rem]">
              I bring the same discipline that made me a Hafiz e Quran into every line of code I write. Consistency, focus, and doing things right the first time.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-9">
            {facts.map((f, i) => (
              <FadeIn key={f.label} delay={i * 0.08} direction="right">
                <p className="font-['Titillium_Web'] font-bold text-[#7ECEF0] text-[0.72rem] tracking-[0.2em] uppercase mb-2">
                  {f.label}
                </p>
                <p className="font-['Titillium_Web'] font-bold text-white text-[1.1rem] leading-snug">
                  {f.value}
                </p>
                <p className="font-['Inter'] text-white/60 text-sm mt-1 font-light">
                  {f.sub}
                </p>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

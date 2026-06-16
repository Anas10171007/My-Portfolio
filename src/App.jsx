import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-16">
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(126,206,240,0.18), transparent)' }} />
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-black">
      <Cursor />
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
    </div>
  )
}

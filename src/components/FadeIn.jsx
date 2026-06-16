import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function FadeIn({ children, delay = 0, className = '', direction = 'up' }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })

  const dirs = {
    up:    { y: 36, x: 0 },
    left:  { y: 0,  x: -36 },
    right: { y: 0,  x: 36 },
    none:  { y: 0,  x: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

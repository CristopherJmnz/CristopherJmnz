import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import "./Section.css"

const Section = ({ 
  children, 
  className = '', 
  animationType = 'fadeIn',
  delay = 0,
  ...props 
}) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className={`section ${animationType} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ '--animation-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </section>
  )
}

export default Section
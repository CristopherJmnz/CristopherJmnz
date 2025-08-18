import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import './Section.css';

const Section = ({
  children,
  className = '',
  animationType = 'fadeIn',
  delay = 0,
  threshold = 0.4,
  thresholdEnter,
  thresholdExit,
  exitDelayMs,
  rootMargin,
  repeatAnimation = true,
  ...props
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold,
    thresholdEnter,
    thresholdExit,
    exitDelayMs,
    rootMargin,
    repeat: repeatAnimation,
  });

  return (
    <section
      ref={ref}
      className={`section ${animationType} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ '--animation-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;

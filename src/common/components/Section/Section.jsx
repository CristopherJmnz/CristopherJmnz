import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import './Section.css';

const Section = ({
  children,
  className = '',
  animationType = 'fadeIn',
  delay = 0,
  threshold = 0.4,
  ...props
}) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold });

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

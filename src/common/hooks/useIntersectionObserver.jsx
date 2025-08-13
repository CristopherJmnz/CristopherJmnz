import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true);
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin, hasAnimated]);

  return [ref, isIntersecting];
};

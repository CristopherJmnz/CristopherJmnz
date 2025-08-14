import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { threshold = 0.1, rootMargin = '0px', repeat = true } = options || {};

    const observerOptions = { threshold, rootMargin };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (repeat) {
          // Toggle visibility on enter/leave so animations can replay
          setIsIntersecting(entry.isIntersecting);
          return;
        }
        // Once-only behavior (legacy)
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true);
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      try {
        observer.disconnect();
      } catch {
        // no-op
      }
    };
  }, [options, hasAnimated]);

  return [ref, isIntersecting];
};

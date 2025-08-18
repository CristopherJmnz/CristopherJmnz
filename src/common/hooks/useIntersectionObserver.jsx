import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      threshold = 0.4, // default higher threshold to reduce flapping
      rootMargin = '0px',
      repeat = true,
      // Hysteresis: require a higher ratio to "enter" than to "exit"
      thresholdEnter = undefined, // fallback to threshold
      thresholdExit = undefined, // fallback computed from threshold
      exitDelayMs = 150, // small delay before marking as not visible
    } = options || {};

    const enterRatio = typeof thresholdEnter === 'number' ? thresholdEnter : threshold;
    const computedExit =
      typeof thresholdExit === 'number'
        ? thresholdExit
        : Math.max(0, Math.min(enterRatio - 0.15, enterRatio * 0.6));

    // Ensure observer fires around both relevant ratios
    const observerThresholds = Array.isArray(threshold)
      ? threshold
      : [computedExit, enterRatio].sort((a, b) => a - b);

    const clearLeaveTimer = () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio ?? 0;

          if (repeat) {
            // Enter: require meeting the higher threshold, clear any pending exit
            if (entry.isIntersecting && ratio >= enterRatio) {
              clearLeaveTimer();
              setIsIntersecting(true);
              return;
            }

            // Exit: only mark hidden after a short delay and when clearly below exit threshold
            if (!entry.isIntersecting || ratio <= computedExit) {
              clearLeaveTimer();
              leaveTimerRef.current = setTimeout(
                () => {
                  setIsIntersecting(false);
                  leaveTimerRef.current = null;
                },
                Math.max(0, exitDelayMs)
              );
            }
            return;
          }

          // Once-only behavior: trigger then unobserve
          if (entry.isIntersecting && ratio >= enterRatio && !hasAnimated) {
            setIsIntersecting(true);
            setHasAnimated(true);
            try {
              observer.unobserve(entry.target);
            } catch {
              /* no-op */
            }
          }
        });
      },
      { threshold: observerThresholds, rootMargin }
    );

    observer.observe(element);

    return () => {
      clearLeaveTimer();
      try {
        observer.disconnect();
      } catch {
        // no-op
      }
    };
  }, [options, hasAnimated]);

  return [ref, isIntersecting];
};

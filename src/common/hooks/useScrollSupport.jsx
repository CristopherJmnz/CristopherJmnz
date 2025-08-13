import { useEffect, useRef } from 'react';

export const useScrollSupport = (isActive) => {
  const containerRef = useRef(null);
  const touchDataRef = useRef({
    isTouching: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isActive) return;

    // Manejo del scroll con rueda del mouse
    const handleWheel = (event) => {
      if (container.scrollWidth > container.clientWidth) {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      }
    };

    // Manejo de eventos táctiles
    const handleTouchStart = (event) => {
      touchDataRef.current.isTouching = true;
      touchDataRef.current.startX = event.touches[0].pageX;
      touchDataRef.current.scrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (event) => {
      if (!touchDataRef.current.isTouching) return;
      const x = event.touches[0].pageX;
      const walk = touchDataRef.current.startX - x;
      container.scrollLeft = touchDataRef.current.scrollLeft + walk;
    };

    const handleTouchEnd = () => {
      touchDataRef.current.isTouching = false;
    };

    // Agregar event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isActive]);

  return containerRef;
};

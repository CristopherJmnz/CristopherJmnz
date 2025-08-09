import { useEffect, useRef } from 'react';

export const useThumbnailAlignment = (thumbnailsCount, isActive) => {
  const containerRef = useRef(null);

  const adjustAlignment = () => {
    const container = containerRef.current;
    if (!container) return;

    const isDesktop = window.innerWidth >= 1024;
    container.style.justifyContent = 
      isDesktop || thumbnailsCount <= 2 ? "center" : "flex-start";
  };

  useEffect(() => {
    if (!isActive) return;

    adjustAlignment();

    const handleResize = () => adjustAlignment();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [thumbnailsCount, isActive]);

  return containerRef;
};
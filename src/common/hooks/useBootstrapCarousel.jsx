import { useState, useEffect, useCallback } from 'react';

export const useBootstrapCarousel = (isOpen, carouselId) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Resetear activeSlide cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setActiveSlide(0);
    }
  }, [isOpen]);

  // Solo escuchar eventos de Bootstrap para sincronizar thumbnails
  useEffect(() => {
    if (!isOpen) return;

    const carouselElement = document.getElementById(carouselId);
    if (!carouselElement) return;

    const handleSlideEvent = (event) => {
      setActiveSlide(event.to);
    };

    // Escuchar cuando Bootstrap cambie de slide
    carouselElement.addEventListener('slide.bs.carousel', handleSlideEvent);

    return () => {
      carouselElement.removeEventListener('slide.bs.carousel', handleSlideEvent);
    };
  }, [isOpen, carouselId]);

  // Función para ir a un slide específico (para thumbnails)
  const goToSlide = useCallback(
    (index) => {
      setActiveSlide(index);

      const carouselElement = document.getElementById(carouselId);
      if (carouselElement && window.bootstrap) {
        const carousel = window.bootstrap.Carousel.getOrCreateInstance(carouselElement);
        if (carousel) {
          carousel.to(index);
        }
      }
    },
    [carouselId]
  );

  // Cleanup al cerrar
  const cleanupCarousel = useCallback(() => {
    const carouselElement = document.getElementById(carouselId);
    if (carouselElement && window.bootstrap) {
      const carousel = window.bootstrap.Carousel.getInstance(carouselElement);
      if (carousel) {
        carousel.dispose();
      }
    }
    setActiveSlide(0);
  }, [carouselId]);

  return {
    activeSlide,
    goToSlide,
    cleanupCarousel,
  };
};

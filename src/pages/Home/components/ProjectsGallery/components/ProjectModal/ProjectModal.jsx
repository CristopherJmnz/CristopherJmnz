import { useEffect, useState, useCallback } from 'react';
import GlassLiquid from '@common/components/Visuals/GlassLiquid/GlassLiquid';
import { useBootstrapCarousel } from '@hooks/useBootstrapCarousel';
import { useModal } from '@hooks/useModal';
import { useScrollSupport } from '@hooks/useScrollSupport';
import { useThumbnailAlignment } from '@hooks/useThumbnailAlignment';
import { ProjectCarousel } from '../ProjectCarousel/ProjectCarousel';
import { ProjectThumbnails } from '../ProjectThumbnails/ProjectThumbnails';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [closeVars, setCloseVars] = useState({ dx: 0, dy: 0, scale: 0.4 });
  const scrollContainerRef = useScrollSupport(isOpen);
  const { activeSlide, goToSlide, cleanupCarousel } = useBootstrapCarousel(
    isOpen,
    'carouselProjects'
  );
  const alignmentContainerRef = useThumbnailAlignment(project?.images?.length || 0, isOpen);

  const requestClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    // Calcular vector hacia la tarjeta de origen (gallery-item del proyecto)
    try {
      const origin = document.querySelector(`.gallery-item[data-project-id="${project?.id}"]`);
      const modalEl = document.getElementById('modal-content');
      if (origin && modalEl) {
        const o = origin.getBoundingClientRect();
        const m = modalEl.getBoundingClientRect();
        // Centro de ambos rectángulos
        const ox = o.left + o.width / 2;
        const oy = o.top + o.height / 2;
        const mx = m.left + m.width / 2;
        const my = m.top + m.height / 2;
        const dx = ox - mx;
        const dy = oy - my;
        const dist = Math.hypot(dx, dy);
        const rot = Math.atan2(dy, dx);
        // Escala objetivo aproximada al tamaño de thumbnail
        const scale = Math.max(0.25, Math.min(0.5, o.width / m.width));
        setCloseVars({ dx, dy, scale, dist, rot });
      }
    } catch {
      void 0;
    }
    // Play exit animation, then cleanup + unmount
    const EXIT_MS = 100; // match CSS genieToOrigin duration
    // Clean Bootstrap carousel before unmount to avoid leaks
    try {
      cleanupCarousel?.();
    } catch {
      void 0;
    }
    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
    }, EXIT_MS);
  }, [isClosing, onClose, cleanupCarousel, project?.id]);

  const { handleModalClick } = useModal(isOpen, requestClose);

  const thumbnailsRef = (element) => {
    scrollContainerRef.current = element;
    alignmentContainerRef.current = element;
  };

  useEffect(() => {
    if (!isOpen) {
      cleanupCarousel();
    }
  }, [isOpen, cleanupCarousel]);

  if (!isOpen || !project) return null;

  return (
    <div className={`modal ${isClosing ? 'closing' : ''}`} id="modal" onClick={handleModalClick}>
      <div
        id="modal-content"
        className={`modal-content ${isClosing ? 'closing' : ''}`}
        style={
          isClosing
            ? {
                '--close-dx': `${closeVars.dx}px`,
                '--close-dy': `${closeVars.dy}px`,
                '--close-dist': `${closeVars.dist || 0}px`,
                '--close-rot': `${closeVars.rot || 0}rad`,
                '--close-scale': closeVars.scale,
              }
            : undefined
        }
      >
        <GlassLiquid />
        <button
          type="button"
          id="closeModalBtn"
          className="modal-close-btn"
          aria-label="Cerrar"
          title="Cerrar"
          onClick={requestClose}
        >
          &times;
        </button>
        <div className="modal-container">
          <ProjectCarousel
            images={project.images}
            isOpen={isOpen}
            activeSlide={activeSlide}
            carouselId="carouselProjects"
          />

          <div id="project-info" className="project-info">
            <div className="tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-links">
              <a
                href={project.links.project}
                target="_blank"
                rel="noopener noreferrer"
                title="Visitar sitio web del proyecto"
              >
                <i className="fa-solid fa-up-right-from-square icons"></i>
              </a>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                title="Visitar GitHub del proyecto"
              >
                <i className="fa-brands fa-github icons"></i>
              </a>
            </div>
          </div>
        </div>

        <ProjectThumbnails
          images={project.images}
          activeSlide={activeSlide}
          onThumbnailClick={goToSlide}
          isOpen={isOpen}
          thumbnailsRef={thumbnailsRef}
        />
      </div>
    </div>
  );
};

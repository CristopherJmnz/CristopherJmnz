import { useEffect } from "react";
import { useBootstrapCarousel } from "@hooks/useBootstrapCarousel";
import { useModal } from "@hooks/useModal";
import { useScrollSupport } from "@hooks/useScrollSupport";
import { useThumbnailAlignment } from "@hooks/useThumbnailAlignment";
import { ProjectCarousel } from "../ProjectCarousel/ProjectCarousel";
import { ProjectThumbnails } from "../ProjectThumbnails/ProjectThumbnails";

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const scrollContainerRef = useScrollSupport(isOpen);
  const alignmentContainerRef = useThumbnailAlignment(
    project?.images?.length || 0,
    isOpen
  );
  
  const { handleModalClick } = useModal(isOpen, onClose);
  const { 
    activeSlide, 
    goToSlide, 
    cleanupCarousel
  } = useBootstrapCarousel(isOpen, "carouselProjects");


  const thumbnailsRef = (element) => {
    scrollContainerRef.current = element;
    alignmentContainerRef.current = element;
  };

  // Resetear slide al cambiar de proyecto (antes de que se vea)
  useEffect(() => {
    if (!isOpen) {
      cleanupCarousel();
    }
  }, [isOpen, cleanupCarousel]);

  if (!isOpen || !project) return null;

  return (
    <div className="modal" id="modal" onClick={handleModalClick}>
      <div id="modal-content" className="modal-content">
        <span id="closeModalBtn" className="close" onClick={onClose}>
          &times;
        </span>
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
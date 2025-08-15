import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

export const ProjectCard = ({ project, index, onClick }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3,
    repeat: true,
  });

  return (
    <div
      ref={ref}
      className={`gallery-item reveal-up ${isVisible ? 'visible' : ''}`}
      data-project-id={project.id}
      onClick={onClick}
      style={{ '--stagger': `${index * 80}ms` }}
    >
      <img
        src={`/src/assets/img/${project.images[0]}`}
        alt={project.id}
        className="gallery-image"
        loading="lazy"
      />
      <div className="gallery-title">{project.name}</div>
    </div>
  );
};

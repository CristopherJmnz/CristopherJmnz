import { useState } from 'react';
import Section from '@commonComponents/Section/Section';
import './ProjectsGallery.css';
import { PROJECT_DATA } from '@common/constants/projectsData';
import './ProjectsGallery.css';
import { ProjectModal } from './components/ProjectModal/ProjectModal';
import { ProjectCard } from './components/ProjectCard/ProjectCard';

export const ProjectsGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (projectId) => {
    const project = PROJECT_DATA[projectId];
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    } else {
      console.error(`Project ID "${projectId}" not found.`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Section id="projects" className="projects" repeatAnimation={false}>
        <h2>Proyectos</h2>
        <div className="gallery">
          {Object.values(PROJECT_DATA)?.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              threshold={0.4}
              onClick={() => openModal(project.id)}
            />
          ))}
        </div>
      </Section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        enableCssFilter={false}
      />
    </>
  );
};

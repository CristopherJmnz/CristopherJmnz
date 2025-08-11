import { useState } from "react";
import Section from "@commonComponents/Section/Section";
import "./ProjectsGallery.css";
import { PROJECT_DATA } from "@common/constants/projectsData";
import "./ProjectsGallery.css";
import { ProjectModal } from "./components/ProjectModal/ProjectModal";

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
      <Section id="projects" className="projects">
        <h2>Proyectos</h2>
        <div className="gallery">
          {Object.values(PROJECT_DATA)?.map((project) => {
            return (
              <div
                key={project.id}
                className="gallery-item"
                onClick={() => openModal(project.id)}
              >
                <img
                  src={`/src/assets/img/${project.images[0]}`}
                  alt={project.id}
                  className="gallery-image"
                />
                <div className="gallery-title">{project.name}</div>
              </div>
            );
          })}
        </div>
      </Section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

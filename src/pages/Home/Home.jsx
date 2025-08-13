import { AboutMe } from './components/AboutMe/AboutMe';
import { ProjectsGallery } from './components/ProjectsGallery/ProjectsGallery';
import { Hero } from './components/Hero/Hero';
import { Skills } from './components/Skills/Skills';
import { WorkExperience } from './components/WorkExperience/WorkExperience';
import { Certifications } from './components/Certifications/Certifications';
import { ContactMe } from './components/ContactMe/ContactMe';
import { BackToTop } from '@commonComponents/BackToTop/BackToTop';

export const Home = () => {
  return (
    <>
      <Hero />
      <main className="container">
        <AboutMe />

        <Skills />

        <ProjectsGallery />

        <WorkExperience />

        <Certifications />

        <ContactMe />
      </main>

      <BackToTop />
    </>
  );
};

import Section from '@commonComponents/Section/Section';
import './WorkExperience.css';
import { WORK_EXPERIENCE } from '../../../../common/constants/workExperience';
export const WorkExperience = () => {
  return (
    <Section className="experience" id="experience">
      <h2>Experiencia</h2>
      <ul>
        {WORK_EXPERIENCE.map((job) => (
          <li key={job.id} className="animate">
            <div className="experience-header">
              <img src={`/src/assets/img/${job.logo}`} alt={job.company} className="company-logo" />
              <h3>{job.company}</h3>
            </div>
            <p>
              <b>{job.position}</b> | {job.period}
            </p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
};

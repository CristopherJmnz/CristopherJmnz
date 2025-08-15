import Section from '@commonComponents/Section/Section';
import './WorkExperience.css';
import { WORK_EXPERIENCE } from '../../../../common/constants/workExperience';
export const WorkExperience = () => {
  return (
    <Section className="experience" id="experience">
      <h2>Experiencia</h2>
      <ul>
        {WORK_EXPERIENCE.map((job) => {
          const paragraphs = job.description.split('. ');
          return (
            <li key={job.id} className="animate">
              <div className="experience-header">
                <img
                  src={`/src/assets/img/${job.logo}`}
                  alt={job.company}
                  className="company-logo"
                />
                <h3>{job.company}</h3>
              </div>
              <p>
                <span>
                  <b>{job.position}</b>
                </span>
                <br />
                <span>{job.period}</span>
              </p>
              {paragraphs.map((paragraph, index) => (
                <p style={{ textAlign: 'left' }} key={index}>
                  {paragraph}
                </p>
              ))}
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

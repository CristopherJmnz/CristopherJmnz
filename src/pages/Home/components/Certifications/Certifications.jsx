import Section from '@commonComponents/Section/Section';
import './Certifications.css';
import { CERTIFICATIONS } from '@common/constants/certifications';
export const Certifications = () => {
  return (
    <Section className="certifications" id="certifications" threshold={0.7}>
      <h2>Certificaciones</h2>
      <div className="certifications-list">
        {CERTIFICATIONS.map((certification) => (
          <div className="certification-card" key={certification.id}>
            <img
              src={`/img/${certification.image}`}
              alt={certification.alt}
              className="certification-badge"
              height="230"
              width="230"
            />
          </div>
        ))}
      </div>
    </Section>
  );
};

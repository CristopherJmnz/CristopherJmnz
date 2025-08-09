import Section from "@commonComponents/Section/Section";
import CvLink from "@documents/CV CRISTOPHER.pdf";
import "./ContactMe.css";

export const ContactMe = () => {
  return (
    <Section id="contact" className="contact">
      <div className="contact__shell" aria-labelledby="contact-title">

        <h2 id="contact-title" className="contact__title">Hablemos</h2>
        <p className="contact__lead">
          ¿Tienes una idea o un reto técnico? Me apasiona construir experiencias
          de alto rendimiento y calidad.
        </p>

        <div className="contact__grid">
          <a href="mailto:crisjimenez19@gmail.com" className="cta cta--email">
            <i className="fas fa-paper-plane" aria-hidden="true"></i>
            <div className="cta__content">
              <span className="cta__title">Enviar email</span>
              <span className="cta__desc">Responderé lo antes posible</span>
            </div>
          </a>

          <a href={CvLink} download className="cta cta--cv">
            <i className="fas fa-download" aria-hidden="true"></i>
            <div className="cta__content">
              <span className="cta__title">Descargar CV</span>
              <span className="cta__desc">PDF actualizado</span>
            </div>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default ContactMe;

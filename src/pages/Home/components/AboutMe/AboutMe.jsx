import aboutMeImg from "../../../../assets/img/aboutme.webp"
import Section from "@commonComponents/Section/Section";
import "./AboutMe.css";
export const AboutMe = () => {
  return (
    <Section id="about" className="about">
      <h2>Sobre mí</h2>
      <div className="about-content">
        <div>
          <p>
            Soy un desarrollador web apasionado por la tecnología y la creación
            de soluciones innovadoras.
          </p>
          <p>
            Una de mis fortalezas clave es la capacidad de trabajar bien en
            equipo, he colaborado estrechamente con diseñadores, otros
            desarrolladores y el equipo de marketing para transformar ideas en
            interfaces de usuario funcionales, atractivas y rentables.
          </p>
          <p>
            Además de mis habilidades técnicas, me destaco por mi atención al
            detalle y mi enfoque en la calidad. Soy meticuloso en la revisión de
            código y la implementación de buenas prácticas de desarrollo. Estoy
            comprometido con el aprendizaje continuo y siempre busco formas de
            mejorar y crecer como profesional.
          </p>
        </div>
        <img
          src={aboutMeImg}
          height="266"
          width="400"
          alt="Sobre mí"
          style={{ borderRadius: "8px" }}
        />
      </div>
    </Section>
  );
};

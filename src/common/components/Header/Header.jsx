import "./Header.css";
import Logo from "@images/JmnzLogoNoBackgroundSquare.webp";
import CvLink from "@documents/CV CRISTOPHER.pdf";
export const Header = () => {
  return (
    <>
      <nav
        id="mainNavbar"
        className="navbar navbar-expand-lg sticky-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={Logo}
              alt="Logo"
              width="50"
              height="50"
              className="d-inline-block align-text-top"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  Sobre mí
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#skills">
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">
                  Proyectos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#certifications">
                  Certificaciones
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#experience">
                  Experiencia
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contacto
                </a>
              </li>
            </ul>
            <div className="d-flex gap-3">
              <a
                href="https://www.linkedin.com/in/cristopher-jimenez-jimenez/"
                className="icons"
                target="_blank"
                aria-label="Visita mi LinkedIn"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/CristopherJmnz"
                target="_blank"
                className="icons"
                aria-label="Visita mi GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                className="cv"
                href={CvLink}
                download
              >
                Descargar CV
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;

import Logo from "@images/JmnzLogoNoBackgroundSquare.webp";
import "./NavLogo.css";

export function NavLogo({ onClick }) {
  return (
    <div className="floating-nav__logo">
      <button
        onClick={onClick}
        className="floating-nav__home"
        title="Inicio"
        data-tooltip="Inicio"
      >
        <img src={Logo} alt="Logo" />
      </button>
    </div>
  );
}

export default NavLogo;

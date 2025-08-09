import "./NavMore.css";

export function NavMore({ isOpen, setOpen, actions, moreRef }) {
  return (
    <div className="floating-nav__more" ref={moreRef}>
      <button
        className="floating-nav__more-btn"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="floating-actions-menu"
        title="Más"
        data-tooltip="Más"
        onClick={() => setOpen((v) => !v)}
      >
        <i className="fas fa-ellipsis-h"></i>
      </button>

      <div
        id="floating-actions-menu"
        className={`floating-nav__menu ${isOpen ? "open" : ""}`}
        role="menu"
      >
        {actions.map((a, idx) =>
          a.kind === "download" ? (
            <a
              key={idx}
              role="menuitem"
              href={a.href}
              download
              className="floating-nav__menu-item"
            >
              <i className={a.icon}></i>
              <span>{a.label}</span>
            </a>
          ) : (
            <a
              key={idx}
              role="menuitem"
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="floating-nav__menu-item"
            >
              <i className={a.icon}></i>
              <span>{a.label}</span>
            </a>
          )
        )}
      </div>
    </div>
  );
}

export default NavMore;

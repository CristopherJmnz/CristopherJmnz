import "./NavActions.css";

export function NavActions({ actions }) {
  return (
    <div className="floating-nav__actions" aria-hidden={false}>
      {actions.map((a, idx) =>
        a.kind === "download" ? (
          <a
            key={idx}
            href={a.href}
            download
            className="floating-nav__cv"
            title={a.label}
            data-tooltip={a.label}
          >
            <i className={a.icon}></i>
          </a>
        ) : (
          <a
            key={idx}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-nav__social"
            title={a.label}
            data-tooltip={a.label}
          >
            <i className={a.icon}></i>
          </a>
        )
      )}
    </div>
  );
}

export default NavActions;

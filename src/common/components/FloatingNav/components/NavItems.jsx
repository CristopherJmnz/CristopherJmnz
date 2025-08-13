import './NavItems.css';

export function NavItems({ items, activeId, onSelect }) {
  return (
    <div className="floating-nav__items">
      {items.map((it) => (
        <button
          key={it.id}
          className={`floating-nav__item ${activeId === it.id ? 'active' : ''}`}
          onClick={() => onSelect(it.id)}
          title={it.label}
          data-tooltip={it.label}
        >
          <i className={`fas ${it.icon}`}></i>
        </button>
      ))}
    </div>
  );
}

export default NavItems;

import './NavItems.css';
import { useNavBubble } from '../hooks/useNavBubble';

export function NavItems({ items, activeId, onSelect }) {
  const {
    containerRef,
    registerBtnRef,
    bubbleVisible,
    bubbleStyle,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  } = useNavBubble({ items, activeId });

  return (
    <div className="floating-nav__items" ref={containerRef}>
      {bubbleVisible && <span className="floating-nav__bubble" style={bubbleStyle} aria-hidden />}
      {items.map((it) => (
        <button
          key={it.id}
          ref={registerBtnRef(it.id)}
          className={`floating-nav__item ${activeId === it.id ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter(it.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(it.id, onSelect)}
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

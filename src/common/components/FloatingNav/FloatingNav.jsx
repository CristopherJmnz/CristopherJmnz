import { useRef, useState } from 'react';
import { useActiveSection } from './hooks/useActiveSection';
import { useClickOutside } from './hooks/useClickOutside';
import { NAV_ITEMS, ACTIONS } from './data';
import { NavLogo } from './components/NavLogo';
import { NavItems } from './components/NavItems';
import { NavActions } from './components/NavActions';
import { NavMore } from './components/NavMore';
import './FloatingNav.css';

export const FloatingNav = () => {
  const activeSection = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const [isMenuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef(null);
  useClickOutside(moreRef, () => setMenuOpen(false));

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav className="floating-nav-bottom">
      <div className="floating-nav__container">
        <NavLogo onClick={scrollToTop} />
        <NavItems items={NAV_ITEMS} activeId={activeSection} onSelect={scrollToId} />
        <NavActions actions={ACTIONS} />
        <NavMore isOpen={isMenuOpen} setOpen={setMenuOpen} actions={ACTIONS} moreRef={moreRef} />
      </div>
    </nav>
  );
};

export default FloatingNav;

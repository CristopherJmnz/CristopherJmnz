import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Logo from '@images/JmnzLogoNoBackgroundSquare.webp'
import CvLink from '@documents/CV CRISTOPHER.pdf'
import './FloatingNav.css'

export const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('')
  // Nuevo: control del submenú de acciones (RRSS + CV)
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false)
  const moreRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Detectar sección activa
      const sections = ['about', 'skills', 'projects', 'certifications', 'experience', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const onDocClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsActionsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
  }

  const navItems = [
    { id: 'about', label: 'Sobre mí', icon: 'fa-user' },
    { id: 'skills', label: 'Skills', icon: 'fa-code' },
    { id: 'projects', label: 'Proyectos', icon: 'fa-folder-open' },
    { id: 'certifications', label: 'Certs', icon: 'fa-certificate' },
    { id: 'experience', label: 'Experiencia', icon: 'fa-briefcase' },
    { id: 'contact', label: 'Contacto', icon: 'fa-envelope' }
  ]

  return (
    <nav className="floating-nav-bottom">
      <div className="floating-nav__container">
        {/* Logo - Home */}
        <div className="floating-nav__logo">
          <button 
            onClick={scrollToTop} 
            className="floating-nav__home" 
            title="Inicio"
            data-tooltip="Inicio"
          >
            <img src={Logo} alt="Logo" />
          </button>
        </div>

        {/* Navigation Items (siempre visibles) */}
        <div className="floating-nav__items">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`floating-nav__item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              title={item.label}
              data-tooltip={item.label}
            >
              <i className={`fas ${item.icon}`}></i>
            </button>
          ))}
        </div>

        {/* Acciones inline (visibles en desktop/tablet) */}
        <div className="floating-nav__actions" aria-hidden={false}>
          <a
            href="https://www.linkedin.com/in/cristopher-jimenez-jimenez/"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-nav__social"
            title="LinkedIn"
            data-tooltip="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/CristopherJmnz"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-nav__social"
            title="GitHub"
            data-tooltip="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href={CvLink}
            download
            className="floating-nav__cv"
            title="Descargar CV"
            data-tooltip="Descargar CV"
          >
            <i className="fas fa-download"></i>
          </a>
        </div>

        {/* Botón "más" y menú (solo móvil vía CSS) */}
        <div className="floating-nav__more" ref={moreRef}>
          <button
            className="floating-nav__more-btn"
            aria-haspopup="menu"
            aria-expanded={isActionsMenuOpen}
            aria-controls="floating-actions-menu"
            title="Más"
            data-tooltip="Más"
            onClick={() => setIsActionsMenuOpen(v => !v)}
          >
            <i className="fas fa-ellipsis-h"></i>
          </button>

          <div
            id="floating-actions-menu"
            className={`floating-nav__menu ${isActionsMenuOpen ? 'open' : ''}`}
            role="menu"
          >
            <a
              role="menuitem"
              href="https://www.linkedin.com/in/cristopher-jimenez-jimenez/"
              target="_blank"
              rel="noopener noreferrer"
              className="floating-nav__menu-item"
            >
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a
              role="menuitem"
              href="https://github.com/CristopherJmnz"
              target="_blank"
              rel="noopener noreferrer"
              className="floating-nav__menu-item"
            >
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a
              role="menuitem"
              href={CvLink}
              download
              className="floating-nav__menu-item"
            >
              <i className="fas fa-download"></i>
              <span>Descargar CV</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default FloatingNav
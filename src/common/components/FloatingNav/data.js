const CvLink = '/documents/CV CRISTOPHER.pdf';

export const NAV_ITEMS = [
  { id: 'about', label: 'Sobre mí', icon: 'fa-user' },
  { id: 'skills', label: 'Skills', icon: 'fa-code' },
  { id: 'projects', label: 'Proyectos', icon: 'fa-folder-open' },
  { id: 'experience', label: 'Experiencia', icon: 'fa-briefcase' },
  { id: 'certifications', label: 'Certificaciones', icon: 'fa-medal' },
  { id: 'contact', label: 'Contacto', icon: 'fa-envelope' },
];

export const ACTIONS = [
  {
    kind: 'link',
    href: 'https://www.linkedin.com/in/cristopher-jimenez-jimenez/',
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
  },
  {
    kind: 'link',
    href: 'https://github.com/CristopherJmnz',
    icon: 'fab fa-github',
    label: 'GitHub',
  },
  {
    kind: 'download',
    href: CvLink,
    icon: 'fas fa-download',
    label: 'Descargar CV',
    download: true,
  },
];

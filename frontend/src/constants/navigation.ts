export const NAVIGATION_LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Start Project',
    href: '/start-project',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
] as const

export const FOOTER_NAVIGATION = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'For Experts', href: '/experts' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Web Development', href: '/services#web-development' },
    { label: 'UI/UX Design', href: '/services#ui-ux' },
    { label: 'Cloud & DevOps', href: '/services#cloud-devops' },
    { label: 'Project Management', href: '/services#project-management' },
  ],
  resources: [
    { label: 'Start Project', href: '/start-project' },
    { label: 'Client Portal', href: '/client-login' },
    { label: 'Expert Portal', href: '/expert-login' },
    { label: 'Escrow System', href: '/escrow' },
    { label: 'Support', href: '/support' },
  ],
} as const 
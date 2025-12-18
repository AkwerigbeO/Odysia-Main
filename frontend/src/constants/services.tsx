import { Service } from '@/types/service'
import {
  CodeBracketIcon,
  PaintBrushIcon,
  CloudArrowUpIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'

export const SERVICES_DATA: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Full-stack web applications built with modern technologies and best practices.',
    features: [
      'Frontend & Backend Development',
      'React, Vue, Angular, Node.js',
      'Database Design & API Integration',
      'Performance Optimization & Testing'
    ],
    icon: <CodeBracketIcon className="w-6 h-6" />
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that create engaging and intuitive experiences.',
    features: [
      'User Research & Personas',
      'Wireframing & Prototyping',
      'Visual Design & Branding',
      'Usability Testing & Iteration'
    ],
    icon: <PaintBrushIcon className="w-6 h-6" />
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and automated deployment pipelines.',
    features: [
      'AWS, Azure, GCP Implementation',
      'CI/CD Pipeline Setup',
      'Infrastructure as Code',
      'Monitoring & Security'
    ],
    icon: <CloudArrowUpIcon className="w-6 h-6" />
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'End-to-end project management with escrow-based execution for security.',
    features: [
      'Project Scoping & Planning',
      'Expert Matching & Vetting',
      'Escrow Payment Protection',
      'Progress Tracking & Delivery'
    ],
    icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />
  }
] 
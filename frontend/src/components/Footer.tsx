import Link from 'next/link'
import Image from 'next/image'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/constants/footer'
import Logo from '@/components/Logo'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Logo
                width={120}
                height={40}
                className="h-12 w-auto"
                alt="Odysia Logo"
              />
            </div>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-6 max-w-md leading-relaxed">
              Connecting clients with vetted tech experts through our managed platform. 
              Secure escrow-based payments and professional project management.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 dark:text-dark-text-secondary hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-dark-text-secondary hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-dark-text-secondary hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-dark-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-dark-text-secondary text-sm">
              © 2024 Odysia. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 dark:text-dark-text-secondary hover:text-primary-400 dark:hover:text-primary-300 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 dark:text-dark-text-secondary hover:text-primary-400 dark:hover:text-primary-300 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/escrow" className="text-gray-500 dark:text-dark-text-secondary hover:text-primary-400 dark:hover:text-primary-300 text-sm transition-colors duration-200">
                Escrow System
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 
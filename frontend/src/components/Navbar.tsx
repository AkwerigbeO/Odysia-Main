'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAVIGATION_LINKS } from '@/constants/navigation'
import Logo from '@/components/Logo'
import { fadeInDown, staggerContainer, staggerItem, hoverScale } from '@/lib/animations'
import ThemeToggle from './ThemeToggle'


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Handle scroll to shrink navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50'
          : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md'
        }`}
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
    >
      {/* Gradient border at bottom when scrolled */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
            }`}
          layout
        >
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            variants={hoverScale}
            whileHover="hover"
            layout
          >
            <Link href="/" className="flex items-center">
              <Logo
                width={120}
                height={40}
                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-10 md:h-12'}`}
                alt="Odysia Logo"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:block"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="ml-6 xl:ml-10 flex items-baseline space-x-2 xl:space-x-4">
              {NAVIGATION_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-2 xl:px-3 py-2 rounded-md text-sm xl:text-base font-medium transition-colors relative group mobile-touch-target whitespace-nowrap"
                  >
                    {link.label}
                    {/* Gradient underline on hover */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons and Theme Toggle - Desktop */}
          <motion.div
            className="hidden lg:flex items-center space-x-3 xl:space-x-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/start-project"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 px-3 py-2 text-sm xl:text-base font-medium transition-colors mobile-touch-target whitespace-nowrap"
              >
                Start a Project
              </Link>
            </motion.div>
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Link
                href="/expert-application"
                className="btn-gradient px-3 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-medium transition-all duration-300 mobile-touch-target whitespace-nowrap glow-primary-hover"
              >
                Apply as Expert
              </Link>
            </motion.div>
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/expert-login"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm xl:text-base font-medium transition-colors mobile-touch-target whitespace-nowrap"
              >
                Expert Login
              </Link>
            </motion.div>
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/client-login"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm xl:text-base font-medium transition-colors mobile-touch-target whitespace-nowrap"
              >
                Client Login
              </Link>
            </motion.div>



            {/* Theme Toggle */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>

          {/* Mobile menu button and theme toggle */}
          <motion.div
            className="lg:hidden flex items-center space-x-2 sm:space-x-3"
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:text-primary-600 relative mobile-touch-target p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  className="w-6 h-0.5 bg-current transform transition-all duration-300"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current transform transition-all duration-300 mt-1"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current transform transition-all duration-300 mt-1"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="px-4 pt-4 pb-6 space-y-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {NAVIGATION_LINKS.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={staggerItem}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-base font-medium transition-colors mobile-touch-target"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA Buttons */}
                <motion.div
                  className="pt-4 space-y-3"
                  variants={staggerContainer}
                >
                  <motion.div variants={staggerItem}>
                    <Link
                      href="/start-project"
                      className="block w-full text-center btn-gradient px-4 py-3 rounded-xl text-base font-medium transition-colors mobile-touch-target"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Start a Project
                    </Link>
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <Link
                      href="/expert-application"
                      className="block w-full text-center border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 px-4 py-3 rounded-xl text-base font-medium hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white dark:hover:text-white transition-colors mobile-touch-target"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Apply as Expert
                    </Link>
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <Link
                      href="/expert-login"
                      className="block w-full text-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-3 rounded-xl text-base font-medium transition-colors mobile-touch-target"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Expert Login
                    </Link>
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <Link
                      href="/client-login"
                      className="block w-full text-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-3 rounded-xl text-base font-medium transition-colors mobile-touch-target"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Client Login
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
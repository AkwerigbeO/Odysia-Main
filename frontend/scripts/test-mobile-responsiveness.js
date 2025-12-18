#!/usr/bin/env node

/**
 * Mobile Responsiveness Test Script
 * 
 * This script tests various aspects of mobile responsiveness:
 * - Viewport meta tag
 * - Touch target sizes
 * - Responsive breakpoints
 * - Mobile-specific CSS classes
 * - Performance optimizations
 */

const fs = require('fs')
const path = require('path')

// Test configuration
const TEST_CONFIG = {
  minTouchTargetSize: 44, // pixels
  requiredBreakpoints: ['sm', 'md', 'lg', 'xl'],
  mobileSpecificClasses: [
    'mobile-touch-target',
    'mobile-only',
    'mobile-safe-area',
    'mobile-spacing',
    'mobile-padding'
  ],
  performanceClasses: [
    'touch-manipulation',
    '-webkit-overflow-scrolling',
    'transform: translateZ(0)'
  ]
}

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logHeader(message) {
  log(`\n${colors.bold}${colors.blue}${'='.repeat(50)}${colors.reset}`)
  log(`${colors.bold}${colors.blue}${message}${colors.reset}`)
  log(`${colors.bold}${colors.blue}${'='.repeat(50)}${colors.reset}`)
}

function logTest(testName, passed, details = '') {
  const status = passed ? `${colors.green}✓ PASS${colors.reset}` : `${colors.red}✗ FAIL${colors.reset}`
  log(`${status} ${testName}`)
  if (details) {
    log(`   ${details}`, 'yellow')
  }
}

// Test 1: Check viewport meta tag
function testViewportMetaTag() {
  logHeader('Testing Viewport Meta Tag')
  
  try {
    const layoutPath = path.join(__dirname, '../src/app/layout.tsx')
    const layoutContent = fs.readFileSync(layoutPath, 'utf8')
    
    const viewportPattern = /viewport.*Viewport/m
    const hasViewport = viewportPattern.test(layoutContent)
    
    logTest('Viewport meta tag exists', hasViewport)
    
    if (hasViewport) {
      logTest('Viewport width set to device-width', layoutContent.includes('device-width'))
      logTest('Initial scale set to 1', layoutContent.includes('initialScale: 1'))
      logTest('Maximum scale defined', layoutContent.includes('maximumScale'))
    }
  } catch (error) {
    logTest('Viewport meta tag exists', false, error.message)
  }
}

// Test 2: Check mobile-specific CSS classes
function testMobileCSSClasses() {
  logHeader('Testing Mobile CSS Classes')
  
  try {
    const cssPath = path.join(__dirname, '../src/styles/globals.css')
    const cssContent = fs.readFileSync(cssPath, 'utf8')
    
    TEST_CONFIG.mobileSpecificClasses.forEach(className => {
      const hasClass = cssContent.includes(className)
      logTest(`Mobile class "${className}" exists`, hasClass)
    })
    
    // Check for mobile media queries
    const hasMobileMediaQuery = /@media.*max-width.*768px/m.test(cssContent)
    logTest('Mobile media queries exist', hasMobileMediaQuery)
    
    // Check for touch target sizing
    const hasTouchTargetSizing = cssContent.includes('min-h-[44px]') || cssContent.includes('min-h-[48px]')
    logTest('Touch target sizing defined', hasTouchTargetSizing)
    
  } catch (error) {
    logTest('Mobile CSS classes exist', false, error.message)
  }
}

// Test 3: Check responsive breakpoints in Tailwind config
function testTailwindBreakpoints() {
  logHeader('Testing Tailwind Breakpoints')
  
  try {
    const tailwindConfigPath = path.join(__dirname, '../tailwind.config.js')
    const configContent = fs.readFileSync(tailwindConfigPath, 'utf8')
    
    // Check if Tailwind is configured
    const hasTailwind = configContent.includes('tailwindcss')
    logTest('Tailwind CSS configured', hasTailwind)
    
    // Check for responsive utilities
    const hasResponsiveUtils = configContent.includes('content') && configContent.includes('src')
    logTest('Responsive utilities configured', hasResponsiveUtils)
    
  } catch (error) {
    logTest('Tailwind breakpoints configured', false, error.message)
  }
}

// Test 4: Check mobile components
function testMobileComponents() {
  logHeader('Testing Mobile Components')
  
  const mobileComponents = [
    'MobileTouchTarget.tsx',
    'MobileLoadingSpinner.tsx',
    'ResponsiveImage.tsx',
    'MobileTestingUtils.tsx'
  ]
  
  mobileComponents.forEach(component => {
    const componentPath = path.join(__dirname, `../src/components/${component}`)
    const exists = fs.existsSync(componentPath)
    logTest(`Mobile component "${component}" exists`, exists)
  })
}

// Test 5: Check mobile hooks
function testMobileHooks() {
  logHeader('Testing Mobile Hooks')
  
  try {
    const hooksPath = path.join(__dirname, '../src/lib/hooks.ts')
    const hooksContent = fs.readFileSync(hooksPath, 'utf8')
    
    const mobileHooks = [
      'useIsMobile',
      'useTouchGestures',
      'useMobileViewportHeight',
      'useMobileScroll'
    ]
    
    mobileHooks.forEach(hook => {
      const hasHook = hooksContent.includes(`export const ${hook}`)
      logTest(`Mobile hook "${hook}" exists`, hasHook)
    })
    
  } catch (error) {
    logTest('Mobile hooks exist', false, error.message)
  }
}

// Test 6: Check package.json for mobile-related dependencies
function testDependencies() {
  logHeader('Testing Dependencies')
  
  try {
    const packagePath = path.join(__dirname, '../package.json')
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    
    const requiredDeps = [
      'framer-motion',
      'react-intersection-observer',
      'tailwindcss'
    ]
    
    requiredDeps.forEach(dep => {
      const hasDep = packageContent.dependencies?.[dep] || packageContent.devDependencies?.[dep]
      logTest(`Dependency "${dep}" installed`, !!hasDep)
    })
    
  } catch (error) {
    logTest('Dependencies check', false, error.message)
  }
}

// Test 7: Check for accessibility features
function testAccessibility() {
  logHeader('Testing Accessibility Features')
  
  try {
    const cssPath = path.join(__dirname, '../src/styles/globals.css')
    const cssContent = fs.readFileSync(cssPath, 'utf8')
    
    // Check for focus styles
    const hasFocusStyles = cssContent.includes('focus:outline-none') || cssContent.includes('focus:ring')
    logTest('Focus styles defined', hasFocusStyles)
    
    // Check for reduced motion support
    const hasReducedMotion = cssContent.includes('prefers-reduced-motion')
    logTest('Reduced motion support', hasReducedMotion)
    
    // Check for high contrast support
    const hasHighContrast = cssContent.includes('prefers-contrast')
    logTest('High contrast support', hasHighContrast)
    
  } catch (error) {
    logTest('Accessibility features', false, error.message)
  }
}

// Test 8: Check for performance optimizations
function testPerformanceOptimizations() {
  logHeader('Testing Performance Optimizations')
  
  try {
    const cssPath = path.join(__dirname, '../src/styles/globals.css')
    const cssContent = fs.readFileSync(cssPath, 'utf8')
    
    // Check for hardware acceleration
    const hasHardwareAcceleration = cssContent.includes('translateZ(0)') || cssContent.includes('backface-visibility')
    logTest('Hardware acceleration enabled', hasHardwareAcceleration)
    
    // Check for touch scrolling optimization
    const hasTouchScrolling = cssContent.includes('-webkit-overflow-scrolling: touch')
    logTest('Touch scrolling optimized', hasTouchScrolling)
    
    // Check for mobile animation optimizations
    const hasMobileAnimations = cssContent.includes('@media (max-width: 768px)') && cssContent.includes('animation-duration')
    logTest('Mobile animation optimizations', hasMobileAnimations)
    
  } catch (error) {
    logTest('Performance optimizations', false, error.message)
  }
}

// Main test runner
function runAllTests() {
  logHeader('MOBILE RESPONSIVENESS TEST SUITE')
  log(`Running tests for Odysia platform...\n`)
  
  testViewportMetaTag()
  testMobileCSSClasses()
  testTailwindBreakpoints()
  testMobileComponents()
  testMobileHooks()
  testDependencies()
  testAccessibility()
  testPerformanceOptimizations()
  
  logHeader('TEST SUMMARY')
  log('Mobile responsiveness testing completed!', 'green')
  log('\nTo manually test mobile responsiveness:', 'yellow')
  log('1. Open the application in a browser', 'yellow')
  log('2. Use browser dev tools to simulate mobile devices', 'yellow')
  log('3. Test touch interactions and navigation', 'yellow')
  log('4. Verify proper scaling and spacing', 'yellow')
  log('5. Check performance on mobile devices', 'yellow')
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests()
}

module.exports = {
  runAllTests,
  testViewportMetaTag,
  testMobileCSSClasses,
  testTailwindBreakpoints,
  testMobileComponents,
  testMobileHooks,
  testDependencies,
  testAccessibility,
  testPerformanceOptimizations
}

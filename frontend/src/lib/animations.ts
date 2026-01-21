import { Variants } from 'framer-motion'

// Animation variants for consistent animations
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// Hover animations
export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

export const hoverLift: Variants = {
  initial: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

// Button animations
export const buttonTap: Variants = {
  initial: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

// Text reveal animations
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// Parallax effect
export const parallax: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Floating animation
export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Pulse animation
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Slide in from sides
export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// Card flip animation
export const cardFlip: Variants = {
  initial: { rotateY: 0 },
  hover: {
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
}

// Gradient animation
export const gradientShift: Variants = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// ============================================
// PREMIUM ANIMATIONS
// ============================================

// Glow pulse animation for buttons and cards
export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 0 rgba(147, 51, 234, 0)"
  },
  animate: {
    boxShadow: [
      "0 0 0 rgba(147, 51, 234, 0)",
      "0 0 20px rgba(147, 51, 234, 0.4)",
      "0 0 0 rgba(147, 51, 234, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Enhanced floating with multiple speeds
export const floatingSlow: Variants = {
  initial: { y: 0, x: 0 },
  animate: {
    y: [-15, 15, -15],
    x: [-5, 5, -5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const floatingFast: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const floatingRotate: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Shimmer effect for text and cards
export const shimmer: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "linear"
    }
  }
}

// Scroll-reveal with blur
export const revealBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// Scale up reveal
export const scaleReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// Rotate in
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
    y: 30
  },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// Stagger with more dramatic effect
export const staggerDramatic: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

export const staggerItemDramatic: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// Border glow animation
export const borderGlow: Variants = {
  initial: {
    boxShadow: "inset 0 0 0 1px rgba(147, 51, 234, 0.2)"
  },
  hover: {
    boxShadow: "inset 0 0 0 2px rgba(147, 51, 234, 0.8), 0 0 30px rgba(147, 51, 234, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

// Bounce in animation
export const bounceIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
} 
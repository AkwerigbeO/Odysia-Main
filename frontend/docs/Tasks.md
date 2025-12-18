# Tasks for Building the Odysia Landing Page

These tasks are based on the generated folder structure for a Next.js 14 (App Router) project using TypeScript and Tailwind CSS. Ensure the final landing page is **responsive**, **visually beautiful**, and includes **animations** and smooth transitions where applicable.

---

## 🔧 Project Setup

- [ ] Ensure Next.js 14 is correctly installed with the App Router.
- [ ] Tailwind CSS is configured and working.
- [ ] TypeScript is enabled and working with strict settings.
- [ ] Create a `layout.tsx` file in `/src/app/` with base layout including `<Navbar />` and `<Footer />`.

---

## 🌐 Pages

- [ ] **Homepage (`/src/app/page.tsx`)**: 
  - Hero Section (with headline, subtext, CTA button, and smooth entry animation)
  - Services Preview Section (icons or cards with animations on hover)
  - Testimonials or Client Logos Section
  - CTA Section (another call to action with parallax or animation)
  - Footer

- [ ] **Services Page (`/src/app/services/page.tsx`)**:
  - Grid of services (Web Dev, Cloud/DevOps, UI/UX, etc.)
  - Animated icons or illustrations
  - Descriptions and possible pricing tiers

- [ ] **Contact Page (`/src/app/contact/page.tsx`)**:
  - Responsive contact form with validation
  - Contact info and map (optional)
  - Smooth entrance animations

---

## 🧩 Components

- [ ] `Navbar.tsx`: Responsive with logo, nav links, and sticky effect on scroll
- [ ] `Hero.tsx`: Full-screen section with animated text and CTA button
- [ ] `ServiceCard.tsx`: Reusable cards for service previews
- [ ] `CTA.tsx`: Large call to action banner with animated background
- [ ] `Footer.tsx`: Socials, copyright, and navigation

---

## 🎨 Styling and Animation

- [ ] Apply Tailwind CSS utilities for spacing, layout, typography
- [ ] Add scroll animations using Framer Motion or AOS
- [ ] Ensure responsiveness for mobile, tablet, and desktop
- [ ] Apply hover/active/focus states to buttons and links
- [ ] Use transitions for smooth section reveals and interactive elements

---

## 🛠️ Utility and Support

- [ ] Use `/src/constants/` to store navigation links, hero content, CTA text, etc.
- [ ] Use `/src/lib/` for form submission logic (if backend or API integration is added later)
- [ ] Keep reusable types and interfaces in a separate file in `/src/types/` (optional)
- [ ] Use `head.tsx` or equivalent metadata support for SEO

---

## ✅ Final Checks

- [ ] Cross-browser compatibility
- [ ] Lighthouse score >90 on Performance, Accessibility, SEO
- [ ] Deploy preview on Vercel (or other hosting)
- [ ] Ensure all animations are performant and do not block interactivity

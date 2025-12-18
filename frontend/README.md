# Odysia - Freelance Platform

<!-- Latest deployment: Fixed TypeScript errors for Vercel deployment -->

A modern freelance platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **SEO Optimized**: Built-in SEO with metadata and structured content
- **Performance**: Optimized for speed and Core Web Vitals
- **Scalable Architecture**: Well-organized folder structure for maintainability
- **Type Safety**: Full TypeScript support with proper type definitions

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navbar/footer
│   ├── page.tsx           # Homepage
│   ├── services/          # Services page
│   └── contact/           # Contact page
├── components/            # Reusable UI components
│   ├── Navbar.tsx        # Navigation component
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero section
│   ├── Services.tsx      # Services showcase
│   ├── About.tsx         # About section
│   ├── CTA.tsx           # Call-to-action
│   ├── ServiceCard.tsx   # Service card component
│   └── ContactForm.tsx   # Contact form
├── styles/               # Global styles and Tailwind config
│   └── globals.css       # Global CSS with Tailwind
├── lib/                  # Utility functions and API
│   ├── api.ts           # API functions
│   └── utils.ts         # Utility functions
├── constants/            # Static content and configuration
│   ├── navigation.ts    # Navigation links
│   ├── services.ts      # Services data
│   ├── hero.ts          # Hero content
│   ├── about.ts         # About content
│   ├── cta.ts           # CTA content
│   └── footer.ts        # Footer links
├── types/               # TypeScript type definitions
│   └── service.ts       # Service-related types
└── assets/              # Images, logos, and other assets
    └── index.ts         # Asset exports
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd odysia
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Colors and Theme

The project uses a custom Tailwind CSS theme with primary and secondary color palettes. You can modify the colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        // ... other shades
        900: '#0c4a6e',
      },
      secondary: {
        // ... secondary colors
      },
    },
  },
}
```

### Content Management

All static content is organized in the `src/constants/` directory:

- `navigation.ts` - Navigation menu items
- `services.ts` - Service offerings and descriptions
- `hero.ts` - Homepage hero section content
- `about.ts` - About section content
- `cta.ts` - Call-to-action content
- `footer.ts` - Footer links and social media

### Adding New Pages

1. Create a new directory in `src/app/` (e.g., `src/app/about/`)
2. Add a `page.tsx` file with your page component
3. Update navigation links in `src/constants/navigation.ts`

### Adding New Components

1. Create your component in `src/components/`
2. Export it from the components directory
3. Import and use it in your pages

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run type checking
npm run type-check
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support, email support@odysia.com or create an issue in the repository.

---

Built with ❤️ by the Odysia team

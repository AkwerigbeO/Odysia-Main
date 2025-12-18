# Expert Dashboard

A comprehensive, responsive dashboard for experts on the Odysia platform, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

### 🏠 Dashboard Home
- **Project Progress Overview**: Cards showing ongoing projects, monthly earnings, and pending tasks
- **Notifications**: Real-time alerts for deadlines, approvals, and payments
- **Earnings Summary**: Recent earnings breakdown with status indicators
- **Quick Actions**: Easy access to common tasks

### 📁 Projects Management
- **Project Cards**: Visual representation of projects with progress bars
- **Filter System**: Filter projects by status (All, In Progress, Completed, Pending)
- **Project Details**: Client information, milestones, deadlines, and budgets
- **Status Tracking**: Real-time project status with visual indicators

### ⏰ Milestones & Submissions
- **Milestone Tracking**: Detailed view of project milestones with due dates
- **File Management**: Upload and manage project files
- **Escrow Status**: Visual indicators for payment status (Held, Released, Under Review)
- **Submission Workflow**: Submit work for review with status updates

### 💬 Messages
- **Chat Interface**: Real-time messaging with clients
- **Conversation List**: Project-based message threads
- **File Attachments**: Support for file sharing in conversations
- **Message Status**: Read receipts and delivery confirmations

### 💰 Earnings
- **Earnings Overview**: Total earnings, monthly breakdown, and trends
- **Project-based Earnings**: Detailed table of earnings by project
- **Escrow Management**: Track held vs. available funds
- **Withdrawal System**: Request payments and view transaction history

### 👤 Profile & Portfolio
- **Editable Profile**: Update personal information, bio, and skills
- **Portfolio Management**: Upload and showcase project work
- **Availability Status**: Set availability (Available, Busy, Unavailable)
- **Badges & Achievements**: Display verification status and ratings
- **Profile Statistics**: Show project completion rates and client satisfaction

### 🆘 Support & Help
- **FAQ Section**: Expandable frequently asked questions
- **Contact Support**: Multiple support channels (Live Chat, Email, Phone)
- **Contact Form**: Submit detailed support requests with priority levels
- **Dispute Reporting**: Report problems and raise disputes
- **Quick Actions**: Easy access to common support tasks

## Technical Implementation

### Architecture
- **Component-Based**: Modular, reusable components
- **TypeScript**: Full type safety and better development experience
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Dark Mode**: Complete dark mode support with smooth transitions

### Key Technologies
- **Next.js 14**: App Router with server-side rendering
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom design system
- **Framer Motion**: Smooth animations and transitions
- **Heroicons**: Beautiful, consistent iconography

### Design System
- **Color Palette**: Primary purple theme with muted accents
- **Typography**: Inter font family with responsive sizing
- **Spacing**: Consistent spacing system using Tailwind utilities
- **Components**: Reusable card, button, and form components

### Responsive Features
- **Mobile Navigation**: Collapsible sidebar with hamburger menu
- **Touch-Friendly**: Optimized touch targets for mobile devices
- **Adaptive Layout**: Grid systems that adapt to screen size
- **Progressive Enhancement**: Core functionality works without JavaScript

## File Structure

```
src/components/dashboard/
├── DashboardLayout.tsx      # Main layout with navigation
├── DashboardHome.tsx        # Dashboard overview page
├── Projects.tsx            # Project management
├── Milestones.tsx          # Milestone tracking
├── Messages.tsx            # Chat interface
├── Earnings.tsx            # Financial management
├── Profile.tsx             # Profile and portfolio
├── Support.tsx             # Help and support
├── index.ts               # Component exports
└── README.md              # This documentation
```

## Usage

### Basic Implementation
```tsx
import { DashboardLayout, DashboardHome } from '@/components/dashboard'

export default function DashboardPage() {
  return (
    <DashboardLayout activeSection="dashboard">
      <DashboardHome />
    </DashboardLayout>
  )
}
```

### Navigation
The dashboard uses a sidebar navigation system with:
- **Desktop**: Fixed sidebar with full navigation
- **Mobile**: Collapsible sidebar with overlay
- **Active States**: Visual indicators for current section
- **Smooth Transitions**: Animated navigation changes

### State Management
- **Local State**: Component-level state for UI interactions
- **Form Handling**: Controlled inputs with validation
- **Data Flow**: Props-based communication between components

## Customization

### Theming
The dashboard uses a consistent design system that can be customized:
- **Colors**: Modify the primary color palette in `tailwind.config.js`
- **Typography**: Update font families and sizing
- **Spacing**: Adjust the spacing scale as needed

### Adding New Sections
1. Create a new component in the dashboard directory
2. Add the component to the sidebar navigation in `DashboardLayout.tsx`
3. Create a corresponding page in `src/app/dashboard/`
4. Export the component from `index.ts`

### Data Integration
The dashboard is designed to work with various data sources:
- **API Integration**: Replace mock data with real API calls
- **Real-time Updates**: Add WebSocket connections for live data
- **Caching**: Implement data caching for better performance

## Performance Considerations

- **Code Splitting**: Components are lazy-loaded when possible
- **Image Optimization**: Next.js Image component for optimized images
- **Animation Performance**: Hardware-accelerated animations with Framer Motion
- **Bundle Size**: Tree-shaking and minimal dependencies

## Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Core functionality works in older browsers

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Next.js 14
- TypeScript 5+

### Installation
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for all new components
3. Include responsive design considerations
4. Test on multiple devices and screen sizes
5. Ensure accessibility compliance

## License

This dashboard is part of the Odysia platform and follows the project's licensing terms. 
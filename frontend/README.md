# Frontend React Application

## Overview

Modern React SPA deployed via AWS CloudFront CDN. Built with TypeScript, Vite, and Tailwind CSS for optimal performance and developer experience.

## Tech Stack

### Core
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server

### UI & Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Next Themes**: Dark/light mode support

### Routing & Testing
- **React Router DOM 7**: Client-side routing
- **Vitest**: Unit testing framework
- **ESLint**: Code linting

## Project Structure
```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Route components
│   ├── api/             # API integration
│   ├── lib/             # Utility functions
│   └── assets/          # Static assets
├── public/              # Public assets
└── dist/                # Build output
```

## Key Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: System preference detection
- **API Integration**: Dynamic content from serverless backend
- **Performance Optimized**: Code splitting and lazy loading

## Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Testing
```bash
npm run test
npm run lint
```

## Deployment

Automated deployment via GitHub Actions:

1. **Build**: `npm run build` creates optimized bundle
2. **Upload**: Sync to S3 bucket
3. **Invalidate**: CloudFront cache invalidation
4. **SSL**: Automatic HTTPS via ACM certificate

## Performance

### Optimization Features
- **CloudFront CDN**: Global edge locations
- **Gzip Compression**: Reduced transfer sizes
- **HTTP/2**: Modern protocol support
- **Caching Strategy**: Optimized cache headers

### Target Metrics
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Bundle Size**: <100KB gzipped

## Configuration

### Environment Variables
```bash
VITE_API_BASE_URL=https://api.ghaith-magherbi.com
VITE_SITE_URL=https://ghaith-magherbi.com
```

### Build Configuration
- **Vite Config**: `vite.config.ts`
- **TypeScript**: `tsconfig.json`
- **Tailwind**: `tailwind.config.js`

---

*Modern React application with production-ready deployment pipeline.*
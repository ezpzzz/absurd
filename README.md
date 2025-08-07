# Absurd

[![CI](https://github.com/ezpzzz/absurd/actions/workflows/ci.yml/badge.svg)](https://github.com/ezpzzz/absurd/actions/workflows/ci.yml) ![Coverage](./coverage/badges/lines.svg)

A React 19 + TypeScript application with routing, theme management, and prompt-based site generation features. Built with Vite, Material-UI, and comprehensive testing.

## Features

- ⚡ **React 19** with TypeScript for modern development
- 🎨 **Material-UI** with dark/light theme toggle and persistence 
- 🧭 **React Router** for navigation and URL management
- 💾 **localStorage Integration** with error handling and custom hooks
  - 🧪 **Comprehensive Testing** with Jest, Testing Library, and Playwright
- 🔧 **Development Tools** - ESLint, Prettier, Husky pre-commit hooks
- 🚀 **CI/CD Pipeline** with GitHub Actions

## Architecture

```
src/
├── components/         # Reusable UI components
│   └── PromptForm.tsx  # Main prompt input form
├── pages/              # Route-based page components
│   ├── PromptPage.tsx  # Home page with prompt form
│   └── SitePage.tsx    # Generated site display page
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts  # localStorage management with error handling
├── utils/              # Utility functions
│   └── id.ts          # UUID generation utilities
└── App.tsx            # Main app with routing and theme provider
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```sh
npm install
```

### Development

```sh
# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## Available Scripts

- `npm run dev` - Start Vite development server with HMR
- `npm run build` - Type-check and build optimized production bundle
- `npm run lint` - Run ESLint with TypeScript support
  - `npm test` - Run Jest unit tests with coverage
  - `npm run test:e2e` - Run Playwright end-to-end tests

## Project Structure

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Material-UI v6 with Emotion styling
- **Routing**: React Router v7 for client-side navigation
  - **Testing**: Jest + Testing Library for units and Playwright for e2e

### Backend  
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with CORS support
  - **Testing**: Jest + Supertest for API testing

### Development Workflow
- **Code Quality**: ESLint + Prettier with consistent formatting
- **Git Hooks**: Husky runs lint and tests on every commit
- **CI/CD**: GitHub Actions for automated testing and building

## Testing

Unit tests use Jest with React Testing Library while Playwright covers the end-to-end flow.

```sh
# Run unit tests with coverage
npm test

# Run e2e tests
npm run test:e2e

# Generate coverage badge
npm run coverage:badge
```

## Deployment

The application is configured for deployment with:

- Production-optimized Vite build
- Type checking during build process  
- Automated CI/CD pipeline via GitHub Actions
- Static asset optimization and bundling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with tests
4. Run `npm run lint` and `npm test` to ensure quality
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License.

# Absurd

[![CI](https://github.com/ezpzzz/absurd/actions/workflows/ci.yml/badge.svg)](https://github.com/ezpzzz/absurd/actions/workflows/ci.yml)

A React 19 + TypeScript application with routing, theme management, and prompt-based site generation features. Built with Vite, Material-UI, and comprehensive testing.

## Features

- ⚡ **React 19** with TypeScript for modern development
- 🎨 **Material-UI** with dark/light theme toggle and persistence 
- 🧭 **React Router** for navigation and URL management
- 💾 **localStorage Integration** with error handling and custom hooks
- 🧪 **Comprehensive Testing** with Vitest and Testing Library
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
- `npm test` - Run test suite with Vitest in watch mode
- `npm test -- --run` - Run tests once (used in CI)

## Project Structure

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Material-UI v6 with Emotion styling
- **Routing**: React Router v7 for client-side navigation
- **Testing**: Vitest + Testing Library + jsdom environment

### Backend  
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with CORS support
- **Testing**: Supertest for API testing

### Development Workflow
- **Code Quality**: ESLint + Prettier with consistent formatting
- **Git Hooks**: Husky runs lint and tests on every commit
- **CI/CD**: GitHub Actions for automated testing and building

## Testing

The project includes comprehensive test coverage:

- **Navigation Tests** - Verify routing and form submission flows
- **Theme Toggle** - Test dark/light mode persistence
- **Error Handling** - localStorage failures and edge cases
- **User Interactions** - Form validation and button states

```sh
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in CI mode
npm test -- --run
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

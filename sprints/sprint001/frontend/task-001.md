# Frontend Task 001: Project Foundation & Build Setup

## Metadata
- **Task**: 1 of 15
- **Area**: Frontend
- **Feature**: Project Scaffold & Build Configuration
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Set up the complete project foundation including Vite build configuration, TypeScript setup, package dependencies, HTML entry point, and main React entry file. This task establishes the build system and development environment for the entire application.

---

## Subtasks

### Subtask 001.1: Package.json Configuration

#### Status
status: pending

#### Objective
Create package.json with all required dependencies for React 18+, TypeScript, Vite, Jotai, Three.js, and i18n.

#### Context
This is the foundation of the project - all dependencies must be specified correctly with compatible versions to avoid conflicts. Must include Jotai for state management (NO useState), Three.js for 3D globe, and i18next for multi-language support.

#### Files to Create/Modify (Exclusive Ownership)
- `package.json` - Project dependencies and scripts

#### Implementation

```json
{
  "name": "brand-calculator",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "jotai": "^2.6.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "i18next": "^23.7.0",
    "react-i18next": "^14.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/three": "^0.160.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vitest": "^1.1.0",
    "@vitest/ui": "^1.1.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

#### Acceptance Criteria
- [ ] All dependencies are specified with compatible versions
- [ ] Jotai is included for state management
- [ ] Three.js and react-three-fiber included for 3D globe
- [ ] i18next included for internationalization
- [ ] TypeScript and Vite properly configured
- [ ] Dev, build, and type-check scripts present
- [ ] Node 18+ requirement specified

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm install
npm run type-check
```

---

### Subtask 001.2: TypeScript Configuration

#### Status
status: pending

#### Objective
Configure TypeScript with strict mode and React JSX support for optimal type safety.

#### Context
Strict TypeScript configuration ensures type safety across the application, catching errors at compile time. Must support React 18+ JSX transform and module resolution for Vite.

#### Files to Create/Modify (Exclusive Ownership)
- `tsconfig.json` - TypeScript compiler configuration
- `tsconfig.node.json` - TypeScript config for Vite config files

#### Implementation

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/atoms/*": ["./src/atoms/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/data/*": ["./src/data/*"],
      "@/i18n/*": ["./src/i18n/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**tsconfig.node.json**:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

#### Acceptance Criteria
- [ ] Strict mode enabled
- [ ] React JSX transform configured
- [ ] Path aliases configured for cleaner imports
- [ ] Node config separates Vite config compilation
- [ ] ES2020 target for modern features
- [ ] Type checking passes

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
```

---

### Subtask 001.3: Vite Build Configuration

#### Status
status: pending

#### Objective
Configure Vite with React plugin, path resolution, and optimized build settings.

#### Context
Vite provides fast development server and optimized production builds. Must configure path aliases to match TypeScript config and set up React plugin with Fast Refresh.

#### Files to Create/Modify (Exclusive Ownership)
- `vite.config.ts` - Vite build configuration

#### Implementation

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/atoms': path.resolve(__dirname, './src/atoms'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@/i18n': path.resolve(__dirname, './src/i18n'),
      '@/styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'state-vendor': ['jotai'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'jotai', 'three', '@react-three/fiber'],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
```

#### Acceptance Criteria
- [ ] React plugin configured with Fast Refresh
- [ ] Path aliases match TypeScript configuration
- [ ] Development server on port 3000
- [ ] Production build optimized with code splitting
- [ ] CSS modules configured with camelCase convention
- [ ] Vendor chunks separated for better caching

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run dev
npm run build
```

---

### Subtask 001.4: HTML Entry Point

#### Status
status: pending

#### Objective
Create index.html with proper meta tags, viewport configuration, and responsive design support.

#### Context
The HTML entry point must support responsive design from 200px to 3000px width, proper charset, viewport meta tags, and a root div for React mounting.

#### Files to Create/Modify (Exclusive Ownership)
- `index.html` - HTML entry point

#### Implementation

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta name="description" content="Brand Registration Calculator - Calculate brand registration costs across European countries" />
    <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

    <!-- Responsive Design Support -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />

    <title>Brand Registration Calculator</title>

    <style>
      /* Critical CSS for initial load */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      #root {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      /* Loading state */
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        font-size: 1.25rem;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading">Loading...</div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### Acceptance Criteria
- [ ] Proper DOCTYPE and charset
- [ ] Viewport meta tag supports 200px-3000px width
- [ ] Theme color meta tags for dark/light modes
- [ ] Critical CSS prevents layout shift
- [ ] Root div for React mounting
- [ ] Loading state displayed before React hydrates
- [ ] Script tag references main.tsx

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run dev
# Open browser and verify HTML structure
```

---

### Subtask 001.5: React Main Entry Point

#### Status
status: pending

#### Objective
Create main.tsx as the React application entry point with StrictMode.

#### Context
This file initializes the React application, mounts it to the DOM, and wraps it in StrictMode for development warnings. Must import and render the root App component.

#### Files to Create/Modify (Exclusive Ownership)
- `src/main.tsx` - React entry point

#### Implementation

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// StrictMode helps identify potential problems
// It activates additional checks and warnings for its descendants
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Type-safe DOM access
if (!document.getElementById('root')) {
  throw new Error('Root element not found. Make sure index.html has <div id="root"></div>');
}

// Enable Hot Module Replacement in development
if (import.meta.hot) {
  import.meta.hot.accept();
}
```

#### Acceptance Criteria
- [ ] React 18+ createRoot API used
- [ ] StrictMode enabled for development checks
- [ ] Type-safe DOM element access
- [ ] Error handling if root element missing
- [ ] HMR (Hot Module Replacement) enabled
- [ ] Imports App component (will be created in task 15)

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run dev
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `package.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `index.html`
- `src/main.tsx`

### Imports From Existing Code
- None (this is the foundation task)

### Exports For Other Code
- Build system configuration
- TypeScript compiler settings
- Path aliases for all other tasks
- Development server configuration

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm install
npm run type-check
npm run lint
npm run dev
npm run build
```

---

## Parallelization Notes
- All subtasks in this task can run in parallel
- Each subtask owns exclusive configuration files
- No subtask depends on another subtask's output
- Files can be created in any order
- This task must complete before running `npm install`, but file creation is parallelizable

# Frontend Analyst Task

## Context
Analyze requirements for a React+TypeScript+Vite web application with 3D world map and brand registration calculator.

## Project Root
/home/jaime/Documents/projects/saas/saas/brand-calculator

## Requirements

### Core Tech Stack:
- React 18+ with TypeScript
- Vite as build tool
- **Jotai atoms ONLY for state management** - NO useState allowed anywhere
- All state must be managed through Jotai atoms

### Responsive Design:
- Must be fully optimized for screen sizes from 200px to 3000px width
- Mobile-first approach with fluid typography and spacing
- Use CSS container queries and media queries

### Theme System:
- Dark and Light theme support
- Theme toggle component
- CSS custom properties for theming

### Main Feature - 3D World Map:
- Interactive 3D globe/world map that can be rotated
- Users can click on countries to select them
- Use Three.js or react-three-fiber for 3D rendering
- Smooth rotation and zoom controls

### Navigation Tabs:
1. **World Map Tab**: Contains the 3D interactive globe
2. **Country List Tab**: Contains country cards with search functionality
   - Search input field to filter countries
   - Country cards showing flag, name, and basic info
   - Click on card to select country

### Brand Registration Calculator:
- After selecting a country, show options to create a brand registration price calculator
- Multiple configurable options (trademark classes, filing types, etc.)
- Real-time price calculation
- Summary view of selected options and total price

### Internationalization (i18n):
- Support for 10 European languages:
  1. English (en), 2. Spanish (es), 3. French (fr), 4. German (de), 5. Italian (it)
  6. Portuguese (pt), 7. Dutch (nl), 8. Polish (pl), 9. Swedish (sv), 10. Greek (el)
- Language selector component
- All UI text must be translatable

## Task Breakdown Strategy

### CRITICAL: ALL tasks MUST be fully independent
- Each task owns unique files - no shared file editing
- No dependencies between tasks
- Each task includes ALL code needed
- Tasks can run in ANY order

### Recommended Task Categories (25-35 tasks total):

1. **Project Setup & Configuration** (3-5 tasks)
   - Vite + TypeScript setup with Jotai
   - ESLint/Prettier configuration
   - Path aliases and build optimization
   - Environment configuration
   - Package.json with all dependencies

2. **Type Definitions & Constants** (3-4 tasks)
   - Country data types
   - Calculator types
   - Theme types
   - i18n types and constants

3. **Jotai Atoms** (4-6 tasks)
   - Theme atoms
   - Language/i18n atoms
   - Country selection atoms
   - Calculator state atoms
   - UI state atoms
   - 3D globe interaction atoms

4. **i18n System** (11 tasks - one per language + setup)
   - i18n setup and configuration
   - English translations
   - Spanish translations
   - French translations
   - German translations
   - Italian translations
   - Portuguese translations
   - Dutch translations
   - Polish translations
   - Swedish translations
   - Greek translations

5. **Theme System** (2 tasks)
   - CSS custom properties and theme definitions
   - Theme toggle component

6. **3D Globe Components** (2-3 tasks)
   - Globe scene setup with Three.js/react-three-fiber
   - Country meshes and click detection
   - Globe controls (rotation, zoom)

7. **UI Components** (5-7 tasks)
   - Layout and navigation tabs
   - Language selector component
   - Country search input
   - Country card component
   - Calculator form component
   - Calculator summary component
   - Loading states and error boundaries

8. **Responsive Styling** (2-3 tasks)
   - Global styles with responsive utilities
   - Container queries implementation
   - Fluid typography system

9. **Custom Hooks** (2-3 tasks)
   - useCountryData hook
   - useCalculator hook
   - useResponsive hook

10. **Data & Assets** (2 tasks)
    - Country data JSON (flags, names, codes)
    - Calculator pricing data

## Output Format

Create: /home/jaime/Documents/projects/saas/saas/brand-calculator/sprints/sprint001/frontend/analysis.json

```json
{
  "area": "frontend",
  "tasks": [
    {
      "id": 1,
      "title": "Vite + TypeScript + Jotai Project Setup",
      "estimatedSubtasks": 5,
      "independent": true,
      "files": ["package.json", "vite.config.ts", "tsconfig.json", "index.html", "src/main.tsx"]
    },
    {
      "id": 2,
      "title": "ESLint + Prettier Configuration",
      "estimatedSubtasks": 3,
      "independent": true,
      "files": [".eslintrc.cjs", ".prettierrc", ".eslintignore"]
    }
    // ... more tasks
  ],
  "recommendedTaskCount": 30,
  "parallelizationStrategy": "Each task owns unique files - no overlap. All tasks can run simultaneously.",
  "dependencyLevels": "none"
}
```

## Rules
- NO cross-task dependencies
- Each task = complete feature with unique files
- Use existing libraries, not task-created utilities
- 3-8 subtasks per task
- Each subtask < 400 lines

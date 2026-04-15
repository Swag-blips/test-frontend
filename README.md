# Nexus

A premium, feature-rich React application built with TypeScript and Vite that displays articles and discussions from the JSONPlaceholder API. It includes a mock authentication system, dynamic Light/Dark mode support, and persistent client-side caching with TanStack Query.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- `pnpm` package manager (or npm/yarn)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Initialize Cypress (required for E2E tests):
   ```bash
   npx cypress install
   ```
4. Start the development server:
   ```bash
   pnpm run dev
   ```

### Running Tests

#### Unit & Integration Tests (Vitest)

To run the automated suite for components and services:

```bash
pnpm test
```

#### End-to-End Tests (Cypress)

To open the interactive Test Runner:

```bash
pnpm run cypress:open
```

To run tests headlessly (CI mode):

```bash
pnpm run cypress:run
```

## Decisions & Tradeoffs

1. **Branding (Nexus)**: Chose a premium "Nexus" identity to move away from generic "Post" terminology, focusing on a clean, centralized experience.
2. **Theme Management (ThemeProvider)**: Implemented a robust theme context that manages light/dark states and persists preference to `localStorage`. Used CSS variables in `index.css` for a "theme-first" design approach.
3. **Data Caching & Persistence**:
   - Used `@tanstack/react-query` for memory caching.
   - Added `@tanstack/query-sync-storage-persister` to sync data to `localStorage`, ensuring an instant "offline-first" feel.
4. **Debounced Search**: Implemented a custom `useDebounce` hook to optimize API calls by delaying search requests until the user finishes typing (500ms).
5. **Testing Architecture**:
   - **Unit**: Vitest + Testing Library for individual component logic.
   - **E2E**: Cypress for testing critical user journeys (Auth, Navigation, Theme).

## CI/CD Pipeline

- Pre-configured `.github/workflows/ci.yml` runs Lint, Vitest, and a production build constraint check automatically on PRs and pushes to `main`.

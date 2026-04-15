# PostApp

A simple, feature-rich React application built with TypeScript and Vite that displays posts and comments from the JSONPlaceholder API. It includes a mock authentication system, dark mode support via TailwindCSS, and client-side caching with TanStack Query.

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
3. Start the development server:
   ```bash
   pnpm run dev
   ```

### Running Tests

To run the automated test suite (Vitest + MSW for API mocking + Testing Library for components):

```bash
pnpm test
```

### Building for Production

```bash
pnpm run build
```

## Decisions & Tradeoffs

1. **Routing Strategy**: Chose `react-router-dom` v7 using `createBrowserRouter`. This allows for nesting routes cleanly and sharing layout logic (`RootLayout.tsx`).

2. **Fetching & Caching Strategy (TanStack Query)**:
   - Used `@tanstack/react-query` to manage server state.
   - It provides automatic caching, background fetching, and loading/error states without the boilerplate of `useEffect` or complex Redux slices.
   - Chose a default stale time of 5 minutes as the placeholder data doesn't change frequently.

3. **Authentication Strategy (Context + Mock Service)**:
   - Implemented a lightweight mocked Auth service wrapped in standard React Context (`AuthProvider.tsx`).
   - Mocked a slight delay (setTimeout) to simulate an actual network request.
   - Using local storage to persist the pseudo user session across refreshes.
   - _Tradeoff_: Kept auth simple with a single context instead of a global state lib (like Zustand) to minimize heavy dependencies.

4. **Testing Strategy**:
   - Swapped Jest out for `vitest` since Vite is used. This allows identical module resolution matching dev environment.
   - Used Mock Service Worker (`msw`) for intercepted backend requests rather than relying on global `fetch` mocking. It's much more robust and guarantees actual code paths remain unmodified.

5. **Styling Approach**:
   - Used Tailwind CSS v4 for utility-first class naming.
   - Set up standard Dark Mode toggling using Tailwind's `dark:` classes (`bg-slate-900`, `text-slate-50`).

## CI/CD Pipeline

- Pre-configured `.github/workflows/ci.yml` runs Lint, tests, and a production build constraint check automatically on PRs and pushes to `main`.

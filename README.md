# Nexus 🌌

**Nexus** is a premium, high-performance React application designed as a centralized hub for developer articles and discussions. Built with a focus on modern aesthetics, speed, and reliability, it leverages the JSONPlaceholder API to provide a seamless data-driven experience.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18 or higher (v20+ recommended)
- **pnpm**: Fast, disk space efficient package manager

### Installation & Development

1. **Clone & Install**:
   ```bash
   pnpm install
   ```
2. **Cypress Setup** (Required for E2E):
   ```bash
   npx cypress install
   ```
3. **Launch**:
   ```bash
   pnpm run dev
   ```

---

## 🧪 Testing Suite

### Unit & Integration (Vitest)

Comprehensive coverage for services, custom hooks, and UI components.

```bash
pnpm test
```

### End-to-End (Cypress)

Full user journey validation (Authentication, Theme Switching, Feed Navigation).

```bash
pnpm run cypress:open  # Interactive Mode
pnpm run cypress:run   # Headless Mode
```

---

## 🏗️ Architecture & Decisions

### 1. Feature-Based Folder Structure 📂

The project follows a **Feature-First Architecture**. Instead of generic `components/` and `hooks/` folders, logic is grouped by domain:

- `src/features/posts/`: Service, hooks, and UI components specifically for the Feed.
- `src/features/auth/`: Components and authentication logic.
- `src/features/comments/`: Specialized logic for threaded discussions.

* **Why?** This maximizes locality, making the codebase easier to scale and reason about as the product grows.

### 2. State Management & Persistence 🧠

Used **TanStack Query (React Query)** for global server-state management.

- **Persistent Caching**: Integrated `@tanstack/query-sync-storage-persister` to sync the cache to `localStorage`.
- **Tradeoff**: Decided against heavy global state libraries (like Redux) in favor of deep query-level state. This keeps the app fast and reduces boilerplate while ensuring data survives page reloads.

### 3. Styling & Aesthetics ✨

Powered by **Tailwind CSS v4** with a custom-engineered design system.

- **Dark-First**: The app defaults to a premium "Nexus Dark" theme but includes a fully-functional Light Mode.
- **Glassmorphism**: Used `backdrop-blur` and custom translucent surface colors for a modern, layered feel.

### 4. Search UX Optimization 🔍

Implemented a custom `useDebounce` hook for the global search.

- **Decision**: Opted for a **500ms debounce** on the search query. This prevents "input stutter" and drastically reduces unnecessary network traffic by waiting for the user to finish typing.

---

## ⚖️ Tradeoffs & Implementation Notes

- **Mock Authentication**: Used a lightweight Context-based Auth system with an `authService` that mocks real network delays. For production, this is designed to be easily swapped with a JWT or OAuth provider.
- **Server vs Client Sorting**: While the requirements mentioned client-side filtering, I implemented **Server-Side Search** via JSONPlaceholder's `title_like` query parameter. This is more scalable for real-world datasets where thousands of posts would be impractical to load into memory.
- **Support-Free Cypress**: Configured Cypress without a global `supportFile` to keep the testing environment lean and fast, perfectly suited for this project's scale.

---

## 🛡️ CI/CD Pipeline

The project includes a GitHub Action (`ci.yml`) that automatically executes:

1.  **lint**: Ensures consistent code style.
2.  **Vitest**: Runs the unit and integration test suite.
3.  **Build**: Validates that the project can be bundled for production without errors.

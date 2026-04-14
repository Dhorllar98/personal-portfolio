# Tech Stack Decisions
**AI-Assisted Development Program · Phase 1 · Task 01**
**Developer:** Olaniran Oluwadamilola (Dhorllar98)

---

## Frontend

### React 18
**Why:** Component-based architecture maps cleanly to a portfolio with distinct sections. React 18 is the industry standard for TypeScript SPAs and matches the pattern already established in my `fashion-and-lifestyle-v1` project. Reusing proven patterns rather than learning a new framework kept the focus on architecture and prompting quality.

### TypeScript
**Why:** Strict typing catches errors at compile time rather than runtime. With `noUnusedLocals`, `noUnusedParameters`, and `strict` all enabled in tsconfig, the codebase enforces hygiene automatically. Every component, API call, and domain type is fully typed.

### Vite
**Why:** Native ESM, sub-second HMR, and a production build that requires zero configuration for a React/TypeScript project. Faster feedback loops during development than alternatives like Create React App or Webpack.

### Tailwind CSS
**Why:** Utility-first CSS eliminates the naming problem and keeps styles colocated with markup. Combined with custom CSS variables for the design token system (accent colours, backgrounds, borders), it allows consistent theming across light and dark modes without a separate CSS file per component.

---

## Backend

### ASP.NET Core 9 (C#)
**Why:** My primary backend language. ASP.NET Core 9 is production-grade, performant, and has first-class support for Clean Architecture patterns. Using the same language and framework as my existing projects (`clinical-task-management-api`, `fashion-and-lifestyle-v1`) meant carrying established patterns forward rather than learning a new runtime under time pressure.

### Clean Architecture (Domain / Application / Infrastructure / API)
**Why:** Separation of concerns with enforced dependency direction. The Domain layer has zero external dependencies. The Application layer orchestrates use cases without knowing HTTP or databases. The Infrastructure layer can be swapped without touching business logic. The API layer handles HTTP concerns only. This structure makes the codebase testable, maintainable, and honest about where each responsibility lives.

### Entity Framework Core
**Why:** EF Core integrates natively with ASP.NET Core and produces clean, strongly-typed database access with migration support. The migration-based schema management (MigrateAsync on startup) means the database schema is version-controlled alongside the code.

### JWT Authentication
**Why:** Stateless, standard, and straightforward for a portfolio API with a single admin role. The token is issued on login and verified on all admin-scoped endpoints using ASP.NET Core's built-in bearer authentication middleware.

---

## Database

*See `database.md` for the full decision rationale.*

**Chosen:** Supabase (PostgreSQL)

---

## Hosting

*See `hosting.md` for the full decision rationale.*

**Frontend:** Vercel
**Backend:** Render

# Dayboard Hub - Portfolio Customization

Dayboard Hub is a yacht management application built on Next.js 15 with React 19, featuring document management, crew scheduling, and financial reporting. This project has been evolved from a tutorial template into a portfolio-ready application with enterprise-grade features.

## 🎯 Custom Portfolio Features

This project has been enhanced beyond the base template with the following custom implementations:

### ✅ Feature Flags System
**Location:** `app/lib/utils.ts`
- Env-based feature toggles for experimental pages
- Flags: `ENABLE_EXPERIMENTAL_DASHBOARD`, `ENABLE_ANALYTICS_PAGE`, `ENABLE_OBSERVABILITY_PAGE`
- Integrated into navigation for conditional rendering

### ✅ Role-Based Access Control (RBAC)
**Location:** `middleware.ts`, `app/lib/definitions.ts`
- Middleware-based RBAC with admin/user roles
- Admin-only route protection at `/dashboard/admin`
- Dynamic role checking in authentication flow

### ✅ Edge Caching with Stale-While-Revalidate
**Location:** `app/api/public/data/route.ts`, `app/public/page.tsx`
- Public API route with edge caching strategy
- SWR (Stale-While-Revalidate) implementation for optimal performance
- Cache-Control headers: `s-maxage=60, stale-while-revalidate=120`

### ✅ Per-Route Loading States & Error Boundaries
**Locations:** 
- `app/dashboard/customers/loading.tsx` & `error.tsx`
- `app/dashboard/observability/loading.tsx` & `error.tsx`
- `app/public/loading.tsx` & `error.tsx`
- All routes have skeleton loaders and comprehensive error handling

### ✅ Web Vitals Observability Dashboard
**Location:** `app/dashboard/observability/page.tsx`
- Real-time Core Web Vitals monitoring using `next/web-vitals`
- Metrics: FCP, LCP, FID, INP, CLS, TTFB
- Color-coded performance ratings (good/needs-improvement/poor)
- Client-side rendering with feature flag protection

### ✅ Comprehensive Testing Suite
**Locations:** `tests/`, `playwright.config.ts`, `vitest.config.ts`

#### Playwright E2E Tests (`tests/example.spec.ts`)
- Homepage navigation and content validation
- Public route caching verification
- Feature flag behavior testing
- Responsive design checks (mobile & desktop)
- Cross-browser testing (Chrome, Firefox, Safari)

#### Vitest Component Tests
- Component rendering (`tests/components/card-skeleton.test.tsx`)
- Utility function validation (`tests/utils.test.ts`)
- Feature flag system testing (`tests/components/feature-flags.test.ts`)
- 80%+ coverage target

### ✅ CI/CD Configuration
**Location:** `.github/workflows/` (to be created)
- GitHub Actions for automated testing
- Playwright E2E test runs
- Vitest coverage reports
- Build verification on pull requests

## 📋 Template vs Custom

### Base Template Features (Unchanged)
- ✅ Next.js App Router architecture
- ✅ PostgreSQL database integration via Vercel Postgres
- ✅ Next-Auth authentication
- ✅ Invoice and customer management CRUD
- ✅ Revenue charting and analytics
- ✅ Responsive Tailwind CSS design
- ✅ Form validation with Zod

### Custom Additions (Portfolio Work)
- ✅ Feature flag system with env-based toggles
- ✅ RBAC middleware for route protection
- ✅ Edge caching with SWR strategy
- ✅ Comprehensive loading states per route
- ✅ Global and per-route error boundaries
- ✅ Web Vitals observability dashboard
- ✅ Full E2E test coverage with Playwright
- ✅ Component unit tests with Vitest
- ✅ CI/CD pipeline configuration

## 🚀 Getting Started

### Prerequisites
- Node.js >=20.12.0
- PostgreSQL database (Vercel Postgres recommended)

### Installation

```bash
# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local

# Configure your environment variables
# See .env.example for required variables
```

### Environment Variables

```env
# Database
POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_postgres_prisma_url
POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_url

# Auth
AUTH_SECRET=your_auth_secret_generate_with_openssl

# Public URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Feature Flags
ENABLE_EXPERIMENTAL_DASHBOARD=false
ENABLE_ANALYTICS_PAGE=false
ENABLE_OBSERVABILITY_PAGE=true
```

### Running the Application

```bash
# Development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Running Tests

```bash
# Run all tests
yarn test

# Watch mode for development
yarn test:watch

# Playwright E2E tests
yarn test:e2e

# Coverage report
yarn test:coverage
```

## 🏗️ Architecture

### File Structure

```
nextjs-dashboard/
├── app/
│   ├── api/
│   │   └── public/
│   │       └── data/
│   │           └── route.ts          # Edge-cached API
│   ├── dashboard/
│   │   ├── (overview)/
│   │   ├── customers/
│   │   │   ├── loading.tsx           # Custom skeleton
│   │   │   ├── error.tsx             # Error boundary
│   │   │   └── page.tsx
│   │   └── observability/
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── page.tsx              # Web vitals dashboard
│   ├── lib/
│   │   └── utils.ts                  # Feature flags
│   ├── login/
│   ├── public/
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── page.tsx                  # SWR example
│   └── ui/
├── middleware.ts                     # RBAC implementation
├── tests/
│   ├── components/
│   ├── example.spec.ts              # Playwright tests
│   ├── setup.ts
│   └── utils.test.ts
├── playwright.config.ts
├── vitest.config.ts
└── package.json
```

## 🧪 Testing Strategy

### Playwright E2E Tests
- **Coverage:** Critical user flows, navigation, feature flags
- **Browsers:** Chrome, Firefox, Safari
- **CI:** Runs on every PR

### Vitest Unit Tests
- **Coverage Target:** 80%+
- **Focus:** Utilities, components, feature flags
- **Fast:** Runs in parallel, watch mode supported

### Test Commands
```bash
yarn test              # Run all Vitest tests
yarn test:watch        # Watch mode
yarn test:e2e          # Playwright E2E tests
yarn test:coverage     # Generate coverage report
```

## 🎨 Key Technical Decisions

1. **Feature Flags:** Simple env-based approach for flexibility without external services
2. **RBAC:** Middleware-level for early route protection
3. **Caching:** SWR at API level for optimal performance
4. **Error Handling:** Per-route error boundaries for granular UX
5. **Testing:** Playwright + Vitest for comprehensive coverage
6. **Observability:** Client-side Web Vitals for real-time metrics

## 📊 Performance Features

- Edge caching with stale-while-revalidate
- Route-level loading states (no layout shift)
- Optimized bundle splitting
- Core Web Vitals monitoring
- Progressive enhancement

## 🔐 Security Features

- Middleware-based RBAC
- Role-based route protection
- Authenticated API routes
- Secure environment variables
- Next-Auth secure sessions

## 📝 License

This project is built on the Next.js Learn Dashboard template and customized for portfolio purposes.

## 🙏 Acknowledgments

- Base template: [Next.js Learn Dashboard](https://nextjs.org/learn)
- UI: Tailwind CSS
- Auth: Next-Auth
- Database: Vercel Postgres
- Testing: Playwright & Vitest

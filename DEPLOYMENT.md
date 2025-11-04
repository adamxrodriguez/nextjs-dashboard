# Deployment Guide

This guide covers deployment, environment setup, and production considerations for Dayboard Hub.

## Environment Setup

### Required Environment Variables

Create a `.env.local` file (never commit this) with the following:

```env
# Database (Vercel Postgres recommended)
POSTGRES_URL=postgresql://user:password@host:port/database
POSTGRES_PRISMA_URL=postgresql://user:password@host:port/database?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://user:password@host:port/database

# Authentication (generate with: openssl rand -base64 32)
AUTH_SECRET=your_secret_key_here

# Public URL (production domain)
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Feature Flags
ENABLE_EXPERIMENTAL_DASHBOARD=false
ENABLE_ANALYTICS_PAGE=false
ENABLE_OBSERVABILITY_PAGE=true
```

### Database Setup

1. **Vercel Postgres (Recommended)**
   ```bash
   vercel postgres create
   vercel env pull .env.local
   ```

2. **Manual PostgreSQL**
   - Create database and user
   - Run migration scripts
   - Update connection strings

### Generating Auth Secret

```bash
openssl rand -base64 32
```

## Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   - Link GitHub repo to Vercel
   - Configure environment variables

2. **Build Settings**
   - Framework: Next.js
   - Build Command: `yarn build`
   - Output Directory: `.next`

3. **Environment Variables**
   - Add all required variables in Vercel dashboard
   - Enable environment-specific variables

### Netlify

1. **Build Settings**
   ```toml
   [build]
     command = "yarn build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Environment Variables**
   - Add in Netlify dashboard
   - Or via CLI: `netlify env:set KEY=value`

### Docker

```dockerfile
FROM node:20-alpine AS base

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
```

Build and run:
```bash
docker build -t dayboard-hub .
docker run -p 3000:3000 --env-file .env.local dayboard-hub
```

## Testing in Production

### Smoke Tests

```bash
# Run Playwright tests against production
NEXT_PUBLIC_BASE_URL=https://your-domain.com yarn test:e2e
```

### Monitoring

- Enable observability page: `ENABLE_OBSERVABILITY_PAGE=true`
- Monitor Core Web Vitals in production
- Set up error tracking (Sentry, LogRocket, etc.)

## Performance Optimization

### Edge Caching

- Public routes cached at edge with SWR
- Configure CDN headers for static assets
- Enable Next.js Image Optimization

### Database Optimization

- Use connection pooling (Prisma URL)
- Implement query optimization
- Set up database indexes

### Bundle Optimization

```javascript
// next.config.mjs
export default {
  experimental: {
    optimizeCss: true,
  },
  compress: true,
};
```

## Security Checklist

- ✅ Environment variables secured
- ✅ RBAC middleware enabled
- ✅ HTTPS enforced
- ✅ CORS configured
- ✅ Auth secret rotated regularly
- ✅ Database credentials secured
- ✅ Rate limiting implemented (recommended)
- ✅ DDoS protection enabled (platform)

## CI/CD Pipeline

The GitHub Actions workflow runs on every PR:
- Linting
- Unit tests (Vitest)
- E2E tests (Playwright)
- Build verification
- Coverage reporting

### Pre-deployment Checklist

1. ✅ All tests passing
2. ✅ 80%+ coverage maintained
3. ✅ Environment variables configured
4. ✅ Database migrated
5. ✅ Domain configured
6. ✅ SSL/TLS enabled
7. ✅ Monitoring set up
8. ✅ Backup strategy in place

## Rollback Procedure

### Vercel
```bash
vercel rollback [deployment-url]
```

### Manual
```bash
# Revert to previous commit
git revert HEAD
git push
# Trigger redeployment
```

## Scaling

### Horizontal Scaling
- Use Vercel Edge Network (automatic)
- Scale database read replicas
- Implement Redis caching (recommended)

### Vertical Scaling
- Upgrade database instance
- Increase Vercel plan limits
- Optimize queries

## Troubleshooting

### Common Issues

**Database Connection**
- Verify connection strings
- Check network access
- Verify credentials

**Build Failures**
- Check environment variables
- Verify Node.js version (20.x)
- Clear .next cache

**Authentication Issues**
- Verify AUTH_SECRET
- Check callback URLs
- Verify session config

## Support

For issues or questions:
- Check logs in deployment platform
- Review observability dashboard
- Consult test suite for expected behavior


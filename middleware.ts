import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  
  // Allow public routes without authentication
  if (pathname.startsWith('/public') || pathname.startsWith('/api/public')) {
    return;
  }
  
  // Admin-only routes
  if (pathname.startsWith('/dashboard/admin')) {
    const user = req.auth?.user;
    // Type assertion needed due to NextAuth typing
    const userRole = (user as any)?.role;
    
    if (userRole !== 'admin') {
      // Redirect non-admin users to dashboard
      const dashboardUrl = new URL('/dashboard', req.url);
      return Response.redirect(dashboardUrl);
    }
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

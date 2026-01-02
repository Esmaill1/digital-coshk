import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', 
  '/forum(.*)',
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const isAdminRoute = createRouteMatcher(['/admin(.*)']);

  if (isAdminRoute(req)) {
    await auth.protect();
    
    // Only allow the owner. 
    // You will need to add your Clerk User ID to Vercel/Local env as ADMIN_USER_ID
    if (userId !== process.env.ADMIN_USER_ID) {
      return Response.redirect(new URL('/', req.url));
    }
  }

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

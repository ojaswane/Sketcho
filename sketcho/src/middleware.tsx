// import { convexAuthNextjsMiddleware , createRouteMatcher , nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
// import { BypassRoutes, ProtectedRoutes, PublicRoutes } from "./lib/permission";
 
// const bypassRoutes = createRouteMatcher(BypassRoutes);
// const PublicMatcher = createRouteMatcher(PublicRoutes);
// const ProtectedMatcher = createRouteMatcher(ProtectedRoutes);

// export default convexAuthNextjsMiddleware( async (request , { convexAuth }) => {
//   if (bypassRoutes(request)){
//     return ;
//   }
//   const authed = await convexAuth.isAuthenticated();
//   if (PublicMatcher(request) && authed){
//     return nextjsMiddlewareRedirect(request , "/dashboard");
//   }

//   if(ProtectedMatcher(request) && !authed){
//     return nextjsMiddlewareRedirect(request , "/auth/sign-in");
//   }
//   return
// }, 
// {
//   cookieConfig: { maxAge : 60 * 60 * 24 * 30},
// }
// );
 
// export const config = {
//   // The following matcher runs middleware on all routes
//   // except static assets.
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


// only for nooww!!!
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BypassRoutes, PublicRoutes, ProtectedRoutes } from "./lib/permission";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // 🚀 1. Skip auth in dev mode
  if (process.env.DEV_AUTH === "true") {
    return NextResponse.next();
  }

  // 2. Bypass routes (auth endpoints, webhooks, etc.)
  if (BypassRoutes.some((pattern: string) => new RegExp(pattern).test(url))) {
    return NextResponse.next();
  }

  // 3. Public routes (always accessible)
  if (PublicRoutes.some((pattern: string) => new RegExp(pattern).test(url))) {
    return NextResponse.next();
  }

  // 4. Protected routes (require session)
  if (ProtectedRoutes.some((pattern: string) => new RegExp(pattern).test(url))) {
    const token =
      req.cookies.get("next-auth.session-token") ||
      req.cookies.get("__Secure-next-auth.session-token");

    if (!token) {
      // Not logged in → redirect to sign-in
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // apply middleware everywhere except static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

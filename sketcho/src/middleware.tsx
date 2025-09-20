import { convexAuthNextjsMiddleware , createRouteMatcher , nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
import { BypassRoutes, ProtectedRoutes, PublicRoutes } from "./lib/permission";
 
const bypassRoutes = createRouteMatcher(BypassRoutes);
const PublicMatcher = createRouteMatcher(PublicRoutes);
const ProtectedMatcher = createRouteMatcher(ProtectedRoutes);

export default convexAuthNextjsMiddleware( async (request , { convexAuth }) => {
  if (bypassRoutes(request)){
    return ;
  }
  const authed = await convexAuth.isAuthenticated();
  if (PublicMatcher(request) && authed){
    return nextjsMiddlewareRedirect(request , "/dashboard");
  }

  if(ProtectedMatcher(request) && !authed){
    return nextjsMiddlewareRedirect(request , "/auth/sign-in");
  }
  return
}, 
{
  cookieConfig: { maxAge : 60 * 60 * 24 * 30},
}
);
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
export const BypassRoutes = [
    "/api/auth(.*)",
    "/convex(.*)",
    "/api/polar/webhook",
    "/api/inngest(.*)",
]

export const PublicRoutes = [
    '/auth(.*)', '/'
]

export const ProtectedRoutes = ['/dashboard(.*)']

import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes"

//export const runtime = "nodejs" // <-- currently deployment fails without this

// This is the instance of Auth.js that DOES NOT include the
// prisma adapter or the 'jwt' session strategy, only what's in the config object
// from 'auth.config.ts'
const {auth: middleware} = NextAuth(authConfig)
  
export default middleware((req) => {
  // Here's the magic. In this middleware, req.auth.user will contain our logged in user data

  // console.log("In middleware. req.auth:")
  // console.log(req.auth)

  const {nextUrl} = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null // All API 'auth' routes allowed
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)) // <-- Add nextUrl turns the URL into an *absolute* path
    }
    return null // Not logged in, all Auth Routes allowed
  }

  if (!isLoggedIn && !isPublicRoute) {  // <-- Trying to access private route when not logged in
    return Response.redirect(new URL("/auth/login" ,nextUrl)) // Attempting to access private route when not logged in
  }

  return null
})

// Any path that is NOT matched will invoke the middleware above
// This will match things like favicon, everything else goes through the middleware
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // <-- This matcher comes from Clerk, presenter says it is best matcher
  runtime: 'nodejs'
}
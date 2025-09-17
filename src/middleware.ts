import NextAuth from "next-auth"
// import { auth } from "./auth"
import authConfig from "./auth.config"

// export default auth((req) => { // Here's the magic. In this middleware, req.auth.user will contain our logged in user data
// 	const isLoggedIn = !!req.auth
//   console.log(isLoggedIn)
// 	// do stuff here
// })

export const runtime = "nodejs"

// This is the instance of Auth.js that DOES NOT include the
// prisma adapter or the 'jwt' session strategy, only what's in the config object
// from 'auth.config.ts'

const {auth: middleware} = NextAuth(authConfig)

export default middleware((req) => {
  const {nextUrl} = req
  console.log("***MIDDLEWARE***   nextUrl = "+ nextUrl)
  console.log("req.auth" + req.auth)
  return null
})
// Any path that is NOT matched will invoke the middleware above
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // <-- This matcher comes from Clerk, presenter says it is best matcher
}
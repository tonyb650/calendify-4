import NextAuth from "next-auth"
import { auth } from "./auth"
import authConfig from "./auth.config"

// export default auth((req) => { // Here's the magic. In this middleware, req.auth.user will contain our logged in user data
// 	const isLoggedIn = !!req.auth
//   console.log(isLoggedIn)
// 	// do stuff here
// })

export const {auth: middleware} = NextAuth(authConfig)
// Any path that is NOT matched will invoke the middleware above

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // <-- This matcher comes from Clerk, presenter says it is best matcher
}
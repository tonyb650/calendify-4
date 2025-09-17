import { auth } from "./auth"

export default auth((req) => { // Here's the magic. In this middleware, req.auth.user will contain our logged in user data
	const isLoggedIn = !!req.auth
  console.log(isLoggedIn)
	// do stuff here
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // <-- This matcher comes from Clerk, presenter says it is best matcher
}
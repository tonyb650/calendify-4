import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import bcryptjs from "bcryptjs"
import prisma from "../lib/prisma"

// This is a configuration object to be used everywhere.
// This does not include the database adapter
// This is only an object, not a full Auth.js instance

export default { providers: [
  GitHub({
    clientId : process.env.GITHUB_CLIENT_ID,
    clientSecret : process.env.GITHUB_CLIENT_SECRET,
  }),
  Google({
    clientId : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  }),
  Credentials({
    async authorize(credentials){
      const validatedFields = LoginSchema.safeParse(credentials)
      
      if(validatedFields.success) {
        const {email, password, guestId} = validatedFields.data
        if (guestId) {
          return await prisma.user.findUnique({where:{id: guestId}})
        } else if (email && password) {
          const user = await prisma.user.findUnique({where:{email}}) 
          if (!user || !user.password) return null
          const passwordsMatch = await bcryptjs.compare(password, user.password)
          if (passwordsMatch) return user
        }
      }
      return null
    }
  })
] } satisfies NextAuthConfig
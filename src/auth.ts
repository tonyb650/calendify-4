import NextAuth, { NextAuthConfig } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../lib/prisma";
import { getUserById } from "./db/users";

// This is the full instance of Auth.js that *uses* the config object
// from auth.config.ts
// This adds the edge-compatible properties to the config object

const edgeConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({user}) {
      await prisma.user.update({
        where: { id: user.id},
        data: { emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async jwt({token}) {
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      token.earliest = existingUser.earliest
      token.latest = existingUser.latest
      return token
    },
    async session({ token, session}) {
      if (!session.user) return session
      if (token.sub) session.user.id = token.sub
      if (token.earliest) session.user.earliest = token.earliest as number
      if (token.earliest ) session.user.latest = token.latest as number
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt"},
  ...authConfig
}

export const { handlers: { GET, POST}, auth} = NextAuth(edgeConfig)
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";

// const prisma = new PrismaClient()

// This is the full instance of Auth.js that *uses* the  config object
// from auth.config.ts
// This adds the adapter and the 'jwt' session strategy to the config object
export const { handlers: { GET, POST}, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt"},
  ...authConfig
})
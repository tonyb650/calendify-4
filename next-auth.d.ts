import NextAuth, { DefaultSession } from "next-auth"

export type AppUser = {
  id: string;
  earliest?: number;
  latest?: number;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: AppUser;
  }
}
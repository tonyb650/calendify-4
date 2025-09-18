import NextAuth, { DefaultSession } from "next-auth"

/* Look up NextAuth "Module Augmentation" for an explanation of this process */

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
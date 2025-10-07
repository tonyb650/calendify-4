"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import prisma from "../../lib/prisma";

export const registerGuest = async () => {
  try {
    const guestEmail = `${crypto.randomUUID()}@example.com`;
    const guestUser = await prisma.user.create({
      data: {
        email: guestEmail,
        name: "temp guest",
        isGuest: true
      }
    });

    await signIn("credentials", {
      guestId: guestUser.id,
      email: guestUser.email,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });

    return { success: "Registered as guest", id: guestUser.id };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error; // must re-throw error
  }
};

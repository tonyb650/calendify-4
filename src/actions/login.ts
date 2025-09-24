'use server'

import { signIn } from "@/auth"
import { getUserByEmail } from "@/db/users"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import z from "zod"
// import { revalidatePath, revalidateTag } from "next/cache"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!"}
  }

  const { email, password} = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials"}
  }

  // TODO account for grace period
  if(!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token )
    return { success: "Email confirmation needed. Check your inbox"}
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials"}
        default:
          return { error: "Something went wrong"}
      }
    }
    throw error // must re-throw error 
  }


  return { success: "completed"}
}
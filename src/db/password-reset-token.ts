import prisma from "../../lib/prisma";


export const getPasswordResetTokenByToken = async (token: string  ) => {
  try {
    const passwordResetToken = prisma.passwordResetToken.findUnique({where: {token}})
    
    return passwordResetToken
  } catch {
    return null
  }
}


export const getPasswordResetTokenByEmail = async (email: string  ) => {
  try {
    const passwordResetToken = prisma.passwordResetToken.findFirst({where: {email}})
    
    return passwordResetToken
  } catch {
    return null
  }
}
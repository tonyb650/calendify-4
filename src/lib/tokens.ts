import { v4 as uuidv4 } from "uuid";
import prisma from "../../lib/prisma";
import { getVerificationTokenByEmail } from "@/db/verification-token";
import { EMAIL_VERIFICATION_GRACE_PERIOD, PASSWORD_RESET_EXPIRES_TIME } from "@/constants";
import { getPasswordResetTokenByEmail } from "@/db/password-reset-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + EMAIL_VERIFICATION_GRACE_PERIOD);

  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await prisma.verificationToken.delete({where: {id: existingToken.id}})
  }

  return await prisma.verificationToken.create({
    data: { token, expires, email }
  });
};


export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + PASSWORD_RESET_EXPIRES_TIME);

  const existingToken = await getPasswordResetTokenByEmail(email)
  if (existingToken) {
    await prisma.passwordResetToken.delete({where: {id: existingToken.id}})
  }

  return await prisma.passwordResetToken.create({
    data: { token, expires, email }
  });
}
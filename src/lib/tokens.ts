import { v4 as uuidv4 } from "uuid";
import prisma from "../../lib/prisma";
import { getVerificationTokenByEmail } from "@/db/verification-token";
import { EMAIL_VERIFICATION_GRACE_PERIOD } from "@/constants";

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

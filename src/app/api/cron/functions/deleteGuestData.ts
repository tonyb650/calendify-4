import prisma from "../../../../../lib/prisma";

export const deleteGuestData = async () => {
  const cutoff = new Date(Date.now() - 1 * 60 * 60 * 1000); //! 24 hours ago

  const result = await prisma.user.deleteMany({
    where: {
      isGuest: true,
      createdAt: { lt: cutoff }
    }
  });

  return result;
};

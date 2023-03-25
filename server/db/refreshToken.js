import { prisma } from ".";

export const createRefreshToken = (refreshToken) => {
  // const createdRefreshToken = prisma.refreshToken.create({
  //   data: refreshToken,
  // });
  const createdRefreshToken = prisma.refreshToken.create({
    data: {
      token: refreshToken.token,
      createdAt: refreshToken.createdAt,
      updatedAt: refreshToken.updatedAt,
      userId: refreshToken.userId, // замените на правильный идентификатор пользователя
    },
  });
  return createdRefreshToken;
};

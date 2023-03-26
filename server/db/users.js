import { prisma } from ".";
import bcrypt from "bcrypt";

export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };
  //hashing password

  return prisma.user.create({
    data: finalUserData,
  });
};

export const getUserByUsername = (username) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};
//search username in database
export const getUserById = (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

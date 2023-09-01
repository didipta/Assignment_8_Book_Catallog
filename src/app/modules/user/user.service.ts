import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: User): Promise<User> => {
  const emailexit = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (emailexit) {
    throw new Error('Email already exist');
  }

  const result = await prisma.user.create({
    data,
    include: {
      orders: true,
      reviews: true,
    },
  });
  return result;
};

const getuserFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({
    include: {
      orders: true,
      reviews: true,
    },
  });
  return result;
};


export const userservice = {
  insertIntoDB,
  getuserFromDB,
};

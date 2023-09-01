import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
    include: {
      orders: true,
      reviews: true,
    },
  });

  console.log('🐱‍🏍 insertIntoDB ~~', { result });
  return result;
};

export const userservice = {
  insertIntoDB,
};

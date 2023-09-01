import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { Iuser } from './user.interface';

const insertIntoDB = async (data: User): Promise<Iuser> => {
  const emailexit = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (emailexit) {
    throw new Error('Email already exist');
  }

  //password file not show in response
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
      reviews: true,
      orders: true,
    },
  });
  return result;
};

const getuserFromDB = async (): Promise<Iuser[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
      reviews: true,
      orders: true,
    },
  });
  return result;
};

export const userservice = {
  insertIntoDB,
  getuserFromDB,
};

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

const sigleuser = async (id: string): Promise<Iuser | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
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

const userupdate = async (id: string, data: User): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const userdelete = async (id: string): Promise<User> => {
  const orders = await prisma.order.findMany({
    where: {
      userId: id,
    },
  });

  await Promise.all(
    orders.map(async order => {
      await prisma.orderedBooks.deleteMany({
        where: {
          orderId: order.id,
        },
      });
    })
  );

  await Promise.all(
    orders.map(async order => {
      await prisma.order.delete({
        where: {
          id: order.id,
        },
      });
    })
  );

  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const profile = async (id: string): Promise<Iuser | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
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
  sigleuser,
  userupdate,
  userdelete,
  profile,
};

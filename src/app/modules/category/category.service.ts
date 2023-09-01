import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const titlefind = await prisma.category.findFirst({
    where: {
      title: data.title,
    },
  });
  if (titlefind) {
    throw new Error('title already exist');
  }

  const result = await prisma.category.create({
    data,
    include: {
      books: true,
    },
  });

  return result;
};

const getuserFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return result;
};


export const Categoryservice = {
  insertIntoDB,
  getuserFromDB,
};

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

const categoryupdate = async (id:string, data: Category): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data
  });
  return result;
};

const categorydelete = async (id:string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const categorygetbyid = async (id:string): Promise<Category|null> => {
  const result = await prisma.category.findFirst({
    where: {
      id: id,
    },

  });
  return result;
};


export const Categoryservice = {
  insertIntoDB,
  getuserFromDB,
  categorygetbyid,
  categoryupdate,
  categorydelete
};

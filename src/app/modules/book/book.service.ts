import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IBookfilter, bookSearchableFields } from './book.interface';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const titlefind = await prisma.book.findFirst({
    where: {
      title: data.title,
    },
  });
  if (titlefind) {
    throw new Error('title already exist');
  }

  data.publicationDate = new Date(data.publicationDate);
  const result = await prisma.book.create({
    data,

    include: {
      reviews: true,
    },
  });

  return result;
};

const getuserFromDB = async (
  filters: IBookfilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    include: {
      reviews: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const singlebook = async (id: string): Promise<Iuser> => {
  const result = await prisma.book.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: true,
    },
  });
  return result;
};

const bookupdate = async (id: string, data: Book): Promise<Book> => {
  data.publicationDate = new Date(data.publicationDate);
  const result = await prisma.book.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const bookdelete = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const Bookservice = {
  insertIntoDB,
  getuserFromDB,
  singlebook,
  bookupdate,
  bookdelete,
};

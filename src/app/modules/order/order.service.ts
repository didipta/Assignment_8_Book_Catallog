import { Order, OrderedBooks } from '@prisma/client';
import prisma from '../../../shared/prisma';

const ordercreate = async (
  data: OrderedBooks[],
  userId: string
): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks: {
        create: data.map(book => ({
          bookId: book.bookId,
          quantity: book.quantity,
        })),
      },
    },
  });
  return result;
};

const allgetorder = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });
  return result;
};

const singleorder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id: id,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

export const Orderservice = {
  ordercreate,
  allgetorder,
  singleorder,
};

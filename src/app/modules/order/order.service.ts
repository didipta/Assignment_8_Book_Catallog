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

const allgetorder = async (user: any): Promise<Order[]> => {
  if (user.role === 'admin') {
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
  }
  if (user.role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
    return result;
  } else {
    return [];
  }
};

const singleorder = async (id: string, user: any): Promise<Order | null> => {
  if (user.role === 'admin') {
    const result = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        orderedBooks: true,
      },
    });
    return result;
  } else if (user.role === 'customer') {
    const result = await prisma.order.findUnique({
      where: {
        id: id,
        userId: user.userId,
      },
      include: {
        orderedBooks: true,
      },
    });
    return result;
  } else {
    return null;
  }
};

export const Orderservice = {
  ordercreate,
  allgetorder,
  singleorder,
};

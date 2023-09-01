import { z } from 'zod';

export const BookSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3)
      .max(255),
    author: z
      .string({
        required_error: 'Author is required',
      })
      .min(3)
      .max(255),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(1)
      .max(100000),
    genre: z
      .string({
        required_error: 'Genre is required',
      })
      .min(3)
      .max(255),
    publicationDate: z
      .string({
        required_error: 'Publication Date is required',
      })
      .min(3)
      .max(255),
    categoryId: z
      .string({
        required_error: 'Category Id is required',
      })
      .min(3)
      .max(255),
  }),
});

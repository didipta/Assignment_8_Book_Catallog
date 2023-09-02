"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const zod_1 = require("zod");
exports.BookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required',
        })
            .min(3)
            .max(255),
        author: zod_1.z
            .string({
            required_error: 'Author is required',
        })
            .min(3)
            .max(255),
        price: zod_1.z
            .number({
            required_error: 'Price is required',
        })
            .min(1)
            .max(100000),
        genre: zod_1.z
            .string({
            required_error: 'Genre is required',
        })
            .min(3)
            .max(255),
        publicationDate: zod_1.z
            .string({
            required_error: 'Publication Date is required',
        })
            .min(3)
            .max(255),
        categoryId: zod_1.z
            .string({
            required_error: 'Category Id is required',
        })
            .min(3)
            .max(255),
    }),
});

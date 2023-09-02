"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orderservice = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ordercreate = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
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
});
const allgetorder = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const result = yield prisma_1.default.order.findMany({
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
        const result = yield prisma_1.default.order.findMany({
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
    }
    else {
        return [];
    }
});
const singleorder = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: id,
            },
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    else if (user.role === 'customer') {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: id,
                userId: user.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    else {
        return null;
    }
});
exports.Orderservice = {
    ordercreate,
    allgetorder,
    singleorder,
};

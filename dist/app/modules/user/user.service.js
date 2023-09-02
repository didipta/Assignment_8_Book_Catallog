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
exports.userservice = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const emailexit = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (emailexit) {
        throw new Error('Email already exist');
    }
    //password file not show in response
    const result = yield prisma_1.default.user.create({
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
});
const getuserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
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
});
const sigleuser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
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
});
const userupdate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
const userdelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prisma_1.default.order.findMany({
        where: {
            userId: id,
        },
    });
    yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.orderedBooks.deleteMany({
            where: {
                orderId: order.id,
            },
        });
    })));
    yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.order.delete({
            where: {
                id: order.id,
            },
        });
    })));
    const result = yield prisma_1.default.user.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const profile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
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
});
exports.userservice = {
    insertIntoDB,
    getuserFromDB,
    sigleuser,
    userupdate,
    userdelete,
    profile,
};

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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const signup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const emailexit = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (emailexit) {
        throw new Error('Email already exist');
    }
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
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isuserExist = yield prisma_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    console.log(isuserExist);
    if (!isuserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isuserExist.password !== password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: isuserExist.id,
        role: isuserExist.role,
    }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    // const refreshToken = jwtHelpers.createToken(
    //   { email, role: isuserExist.role },
    //   config.jwt_refresh_secret as Secret,
    //   config.jwt_refresh_expires_in as string
    // );
    return {
        accessToken,
    };
});
exports.authService = {
    signup,
    loginAdmin,
};

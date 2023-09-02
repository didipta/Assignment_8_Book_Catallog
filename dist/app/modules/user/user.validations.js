"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        })
            .min(2)
            .max(255),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(6)
            .max(255),
        role: zod_1.z.enum([...user_constants_1.Role]),
        contactNo: zod_1.z
            .string({
            required_error: 'Contact No is required',
        })
            .min(2)
            .max(255),
        address: zod_1.z
            .string({
            required_error: 'Address is required',
        })
            .min(2)
            .max(255),
        profileImg: zod_1.z
            .string({
            required_error: 'Profile Image is required',
        })
            .min(2)
            .max(255),
    }),
});
const loging = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(6)
            .max(255),
    }),
});
exports.userValidations = {
    create,
    loging,
};

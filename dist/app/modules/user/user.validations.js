"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
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
        role: zod_1.z
            .string({
            required_error: 'Role is required',
        })
            .min(2)
            .max(255),
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
        reviews: zod_1.z.object({
            syncId: zod_1.z
                .string({
                required_error: 'Sync Id is required',
            })
                .min(2)
                .max(255),
        }),
        orders: zod_1.z.object({
            syncId: zod_1.z.string().min(2).max(255),
        }),
    }),
});

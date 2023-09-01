import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(2)
      .max(255),
      

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6)
      .max(255),
    role: z
      .string({
        required_error: 'Role is required',
      })
      .min(2)
      .max(255),
    contactNo: z
      .string({
        required_error: 'Contact No is required',
      })
      .min(2)
      .max(255),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .min(2)
      .max(255),
    profileImg: z
      .string({
        required_error: 'Profile Image is required',
      })
      .min(2)
      .max(255),
    reviews: z.object({
      syncId: z
        .string({
          required_error: 'Sync Id is required',
        })
        .min(2)
        .max(255),
    }),
    orders: z.object({
      syncId: z.string().min(2).max(255),
    }),
  }),
});

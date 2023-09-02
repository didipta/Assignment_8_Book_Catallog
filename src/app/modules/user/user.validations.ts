import { z } from 'zod';
import { Role } from './user.constants';

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
    role: z.enum([...Role] as [string, ...string[]]),
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
  }),
});


const loging= z.object({
  body: z.object({
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
  }),
});


export const userValidations = {
  create,
  loging,
};


import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { Iuser } from '../user/user.interface';

const signup = async (data: User): Promise<Iuser> => {
  const emailexit = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (emailexit) {
    throw new Error('Email already exist');
  }

  const result = await prisma.user.create({
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
};

const loginAdmin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isuserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log(isuserExist);

  if (!isuserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isuserExist.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const accessToken = jwtHelpers.createToken(
    { email, role: isuserExist.role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  );

  // const refreshToken = jwtHelpers.createToken(
  //   { email, role: isuserExist.role },
  //   config.jwt_refresh_secret as Secret,
  //   config.jwt_refresh_expires_in as string
  // );

  return {
    accessToken,
  };
};

//   const { phoneNumber, password } = payload;

//   const isuserExist = await User.isUserExist(phoneNumber);

//   if (!isuserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   if (
//     isuserExist.password &&
//     !(await User.isPasswordMatched(password, isuserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }

//   const { phoneNumber: phone, role } = isuserExist;
//   const accessToken = jwtHelpers.createToken(
//     { phone, role },
//     config.jwt_secret as Secret,
//     config.jwt_expires_in as string
//   );

//   const refreshToken = jwtHelpers.createToken(
//     { phone, role },
//     config.jwt_refresh_secret as Secret,
//     config.jwt_refresh_expires_in as string
//   );

//   return {
//     accessToken,
//     refreshToken,
//   };
// };

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt_refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { phone } = verifiedToken;

//   // tumi delete hye gso  kintu tumar refresh token ase
//   // checking deleted user's refresh token

//   const isUserExist = await User.isUserExist(phone);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: isUserExist.phoneNumber,
//       role: isUserExist.role,
//     },
//     config.jwt_secret as Secret,
//     config.jwt_expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

export const authService = {
  signup,
  loginAdmin,
};

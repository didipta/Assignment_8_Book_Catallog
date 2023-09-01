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
    {
      userId: isuserExist.id,
      role: isuserExist.role,
         },
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




export const authService = {
  signup,
  loginAdmin,
};

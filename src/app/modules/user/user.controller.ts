import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userservice } from './user.service';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const insertFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await userservice.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Insert Successfully',
    data: result,
  });
});

const getuserFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await userservice.getuserFromDB();

  console.log('🐱‍🏍 getuserFromDB ~~', { data });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user data',
    data,
  });
});

const sigleuser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userservice.sigleuser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user get Successfully',
    data: result,
  });
});

const userupdate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userservice.userupdate(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user update Successfully',
    data: result,
  });
});

const userdelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userservice.userdelete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user delete Successfully',
    data: result,
  });
});

const profile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // verify token
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);
    const id = verifiedUser.userId;
  const result = await userservice.profile(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user get Successfully',
    data: result,
  });
});

export const usercontroller = {
  getuserFromDB,
  insertFromDB,
  sigleuser,
  userupdate,
  userdelete,
  profile
};

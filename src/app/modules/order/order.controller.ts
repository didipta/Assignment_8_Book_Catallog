import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Orderservice } from './order.service';

const createoder = catchAsync(async (req: Request, res: Response) => {
  const { userId, orderedBooks } = req.body;
  let id;
  const token = req.headers.authorization;

  if (userId !== undefined) {
    id = userId;
  } else {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // verify token
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);
    id = verifiedUser.userId;
  }
  const result = await Orderservice.ordercreate(orderedBooks, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order Insert Successfully',
    data: result,
  });
});

const allgetorder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  // verify token
  let verifiedUser = null;
  verifiedUser = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);
  const result = await Orderservice.allgetorder(verifiedUser);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order get Successfully',
    data: result,
  });
});

const singleorder = catchAsync(async (req: Request, res: Response) => {
   const token = req.headers.authorization;
   if (!token) {
     throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
   }
   // verify token
   let verifiedUser = null;
   verifiedUser = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);
  const { id } = req.params;
  
  const result = await Orderservice.singleorder(id, verifiedUser);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order get Successfully',
    data: result,
  });
});

export const Ordercontroller = {
  createoder,
  allgetorder,
  singleorder,
};

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userservice } from './user.service';

const insertFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = userservice.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Insert Successfully',
    data:result,
  });
});

const getuserFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = 'all user data';
  console.log('🐱‍🏍 getuserFromDB ~~', { data });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user data',
    data,
  });
});

export const usercontroller = {
  getuserFromDB,
  insertFromDB,
};

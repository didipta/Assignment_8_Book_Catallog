import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Categoryservice } from './category.service';

const insertFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await Categoryservice.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category Insert Successfully',
    data: result,
  });
});

const getuserFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await Categoryservice.getuserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category data',
    data,
  });
});

const categoryupdate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Categoryservice.categoryupdate(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category updated successfully',
    data: result,
  });
});

const categorydelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Categoryservice.categorydelete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category deleted successfully',
    data: result,
  });
});

const categorygetbyid = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Categoryservice.categorygetbyid(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category fetched successfully',
    data: result,
  });
});

export const Categorycontroller = {
  insertFromDB,
  getuserFromDB,
  categorygetbyid,
  categoryupdate,
  categorydelete,
};

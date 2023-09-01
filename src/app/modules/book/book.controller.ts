import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookSearchableFields } from './book.interface';
import { Bookservice } from './book.service';

const insertFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await Bookservice.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Insert Successfully',
    data: result,
  });
});

const getuserFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookSearchableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  console.log('🐱‍🏍 getuserFromDB ~~', { filters, options });
  const data = await Bookservice.getuserFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category data',
    data,
  });
});

const getcategorybookFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const filters = { categoryId: id };
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const results = await Bookservice.getuserFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books with associated category data fetched successfully',
      data: results,
    });
  }
);

export const Bookcontroller = {
  insertFromDB,
  getuserFromDB,
  getcategorybookFromDB,
};

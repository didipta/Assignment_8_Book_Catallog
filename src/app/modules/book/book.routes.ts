import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { Bookcontroller } from './book.controller';
import { BookSchema } from './book.validations';

const router = express.Router();

router.get('/', Bookcontroller.getuserFromDB);
router.post(
  '/create-book',
  validateRequest(BookSchema),
  Bookcontroller.insertFromDB
);
router.get('/:id/category', Bookcontroller.getcategorybookFromDB);
router.get('/:id', Bookcontroller.singlebook);
router.put('/:id', Bookcontroller.bookupdate);
router.delete('/:id', Bookcontroller.bookdelete);

export const bookroutes = router;

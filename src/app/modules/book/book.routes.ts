import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Bookcontroller } from './book.controller';
import { BookSchema } from './book.validations';

const router = express.Router();

router.get('/', Bookcontroller.getbookFromDB);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.admin),
  validateRequest(BookSchema),
  Bookcontroller.insertFromDB
);
router.get('/:id/category', Bookcontroller.getcategorybookFromDB);
router.get('/:id', Bookcontroller.singlebook);
router.patch('/:id', auth(ENUM_USER_ROLE.admin), Bookcontroller.bookupdate);
router.delete('/:id', auth(ENUM_USER_ROLE.admin), Bookcontroller.bookdelete);

export const bookroutes = router;

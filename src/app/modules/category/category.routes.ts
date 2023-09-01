import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { Categorycontroller } from './category.controller';
import { create } from './category.validations';

const router = express.Router();

router.get('/', Categorycontroller.getuserFromDB);
router.post(
  '/create-category',
  validateRequest(create),
  Categorycontroller.insertFromDB
);
router.get('/:id', Categorycontroller.categorygetbyid);
router.patch('/:id', Categorycontroller.categoryupdate);
router.delete('/:id', Categorycontroller.categorydelete);

export const categoryroutes = router;

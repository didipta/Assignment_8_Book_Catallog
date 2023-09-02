import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Categorycontroller } from './category.controller';
import { create } from './category.validations';

const router = express.Router();

router.get('/', Categorycontroller.getuserFromDB);
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.admin),
  validateRequest(create),
  Categorycontroller.insertFromDB
);
router.get('/:id', Categorycontroller.categorygetbyid);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.admin),
  Categorycontroller.categoryupdate
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.admin),
  Categorycontroller.categorydelete
);

export const categoryroutes = router;

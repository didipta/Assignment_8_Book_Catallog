import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Ordercontroller } from './order.controller';
const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.customer),
  Ordercontroller.createoder
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.admin, ENUM_USER_ROLE.customer),
  Ordercontroller.allgetorder
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.admin, ENUM_USER_ROLE.customer),
  Ordercontroller.singleorder
);

export const orderroutes = router;

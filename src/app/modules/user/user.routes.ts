import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from './../../../enums/user';
import { usercontroller } from './user.controller';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.admin), usercontroller.getuserFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.admin), usercontroller.sigleuser);
router.patch('/:id', auth(ENUM_USER_ROLE.admin), usercontroller.userupdate);
router.delete('/:id', auth(ENUM_USER_ROLE.admin), usercontroller.userdelete);

export const userRoutes = router;

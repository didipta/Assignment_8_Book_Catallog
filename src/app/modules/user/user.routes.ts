import express from 'express';
import { usercontroller } from './user.controller';
const router = express.Router();

router.get('/', usercontroller.getuserFromDB);
router.get('/:id', usercontroller.sigleuser);
router.patch('/:id', usercontroller.userupdate);
router.delete('/:id', usercontroller.userdelete);

export const userRoutes = router;

import express from 'express';
import { usercontroller } from './user.controller';
const router = express.Router();

router.get('/', usercontroller.getuserFromDB);
router.post('/', usercontroller.insertFromDB);

export const userRoutes = router;

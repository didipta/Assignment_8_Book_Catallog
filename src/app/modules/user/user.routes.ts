import express from 'express';
import { usercontroller } from './user.controller';
const router = express.Router();

router.get('/', usercontroller.getuserFromDB);

export const userRoutes = router;

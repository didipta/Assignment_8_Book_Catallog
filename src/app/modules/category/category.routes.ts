import express from 'express';
import { Categorycontroller } from './category.controller';

const router = express.Router();

router.get('/', Categorycontroller.getuserFromDB);
router.post('/', Categorycontroller.insertFromDB);

export const categoryroutes = router;

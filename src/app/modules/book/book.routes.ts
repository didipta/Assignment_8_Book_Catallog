import express from 'express';
import { Bookcontroller } from './book.controller';

const router = express.Router();

router.get('/', Bookcontroller.getuserFromDB);
router.post('/', Bookcontroller.insertFromDB);

export const bookroutes = router;

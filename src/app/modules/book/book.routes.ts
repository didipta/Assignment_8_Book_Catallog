import express from 'express';
import { Bookcontroller } from './book.controller';

const router = express.Router();

router.get('/', Bookcontroller.getuserFromDB);
router.post('/create-book', Bookcontroller.insertFromDB);
router.get('/:id/category', Bookcontroller.getcategorybookFromDB);

export const bookroutes = router;

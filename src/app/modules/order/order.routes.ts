import express from 'express';
import { Ordercontroller } from './order.controller';
const router = express.Router();

router.post('/create-order', Ordercontroller.createoder);
router.get('/', Ordercontroller.allgetorder);
router.get('/:id', Ordercontroller.singleorder);

export const orderroutes = router;

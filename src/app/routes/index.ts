import express from 'express';
import { categoryroutes } from '../modules/category/category.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/category',
    route: categoryroutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

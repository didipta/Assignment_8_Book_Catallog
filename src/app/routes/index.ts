import express from 'express';
import { AuthRoute } from '../modules/Auth/auth.router';
import { bookroutes } from '../modules/book/book.routes';
import { categoryroutes } from '../modules/category/category.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoute,
  },

  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/category',
    route: categoryroutes,
  },
  {
    path: '/book',
    route: bookroutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

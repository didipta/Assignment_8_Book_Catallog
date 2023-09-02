import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validations';
import { authController } from './auth.controller';

const router = express.Router();

// router.post(
//   '/signup',
//   validateRequest(uservalidation),
//   UserController.createUser
// );

router.post('/signin', authController.signin);
router.post(
  '/signup',
  validateRequest(userValidations.create),
  authController.signup
);
// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   authController.refreshToken
// );
export const AuthRoute = router;

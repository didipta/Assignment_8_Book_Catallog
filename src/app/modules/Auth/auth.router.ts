import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

// router.post(
//   '/signup',
//   validateRequest(uservalidation),
//   UserController.createUser
// );

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   authController.refreshToken
// );
export const AuthRoute = router;

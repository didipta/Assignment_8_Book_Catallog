"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validations_1 = require("../user/user.validations");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
// router.post(
//   '/signup',
//   validateRequest(uservalidation),
//   UserController.createUser
// );
router.post('/signin', (0, validateRequest_1.default)(user_validations_1.userValidations.loging), auth_controller_1.authController.signin);
router.post('/signup', (0, validateRequest_1.default)(user_validations_1.userValidations.create), auth_controller_1.authController.signup);
// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   authController.refreshToken
// );
exports.AuthRoute = router;

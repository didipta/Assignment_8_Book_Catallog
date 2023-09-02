"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("./../../../enums/user");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), user_controller_1.usercontroller.getuserFromDB);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), user_controller_1.usercontroller.sigleuser);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), user_controller_1.usercontroller.userupdate);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), user_controller_1.usercontroller.userdelete);
exports.userRoutes = router;

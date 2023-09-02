"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("../modules/Auth/auth.router");
const book_routes_1 = require("../modules/book/book.routes");
const category_routes_1 = require("../modules/category/category.routes");
const order_routes_1 = require("../modules/order/order.routes");
const user_controller_1 = require("../modules/user/user.controller");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_router_1.AuthRoute,
    },
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.categoryroutes,
    },
    {
        path: '/books',
        route: book_routes_1.bookroutes,
    },
    {
        path: '/orders',
        route: order_routes_1.orderroutes,
    },
    {
        path: '/profile',
        route: user_controller_1.usercontroller.profile,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;

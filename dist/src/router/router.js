"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_router_1 = require("./user-router");
const product_router_1 = require("./product-router");
const category_router_1 = require("./category-router");
const cart_router_1 = require("./cart-router");
const order_router_1 = require("./order-router");
exports.router = (0, express_1.Router)();
exports.router.use('/users', user_router_1.userRouter);
exports.router.use('/products', product_router_1.productRouter);
exports.router.use('/categories', category_router_1.categoryRouter);
exports.router.use('/carts', cart_router_1.cartRouter);
exports.router.use('/orders', order_router_1.orderRouter);
//# sourceMappingURL=router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const CartController_1 = __importDefault(require("../controller/CartController"));
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.get('/:id', CartController_1.default.getCart);
exports.cartRouter.post('/', CartController_1.default.productAddToCart);
exports.cartRouter.delete('/', CartController_1.default.deleteCart);
//# sourceMappingURL=cart-router.js.map
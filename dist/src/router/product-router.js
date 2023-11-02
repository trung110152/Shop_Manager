"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controller/ProductController"));
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/', ProductController_1.default.getProducts);
exports.productRouter.post('/', ProductController_1.default.createProduct);
exports.productRouter.put('/:id', ProductController_1.default.updateProduct);
exports.productRouter.delete('/:id', ProductController_1.default.deleteProduct);
//# sourceMappingURL=product-router.js.map
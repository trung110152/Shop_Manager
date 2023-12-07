"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const CategoryController_1 = __importDefault(require("../controller/CategoryController"));
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter.get('/', CategoryController_1.default.getCategories);
exports.categoryRouter.post('/', CategoryController_1.default.createCategory);
exports.categoryRouter.put('/:id', CategoryController_1.default.editCategory);
exports.categoryRouter.get('/:id', CategoryController_1.default.findOneByID);
//# sourceMappingURL=category-router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const ReviewController_1 = __importDefault(require("../controller/ReviewController"));
exports.reviewRouter = (0, express_1.Router)();
exports.reviewRouter.get('/:id', ReviewController_1.default.getReviews);
exports.reviewRouter.post('/', ReviewController_1.default.createReview);
exports.reviewRouter.put('/:id', ReviewController_1.default.updateReview);
//# sourceMappingURL=review-router.js.map
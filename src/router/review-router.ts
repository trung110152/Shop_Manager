import {Router} from "express";
import ReviewController from "../controller/ReviewController";

export const reviewRouter = Router();

reviewRouter.get('/:id', ReviewController.getReviews);
reviewRouter.post('/', ReviewController.createReview);
reviewRouter.put('/:id', ReviewController.updateReview);
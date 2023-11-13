import { Request, Response } from "express";
import ReviewService from "../service/ReviewService"; 

class ReviewController {
    private reviewService; 
    constructor() {
        this.reviewService = ReviewService; 
    }

    getReviews = async (req: Request, res: Response) => {
      const productId = req.params.id
        try {
          const reviews = await this.reviewService.getReviews(productId);
          return res.status(200).json(reviews);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
    };

    createReview = async (req: Request, res: Response) => {
        const reviewData = req.body;
        try {
          const review = await this.reviewService.createReview(reviewData);
          return res.status(200).json(review);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

      updateReview = async (req: Request, res: Response) => {
        const reviewId = req.params.id;
        const reviewData = req.body;
        try {
        const review = await this.reviewService.updateReview(reviewId,reviewData);
          return res.status(200).json(review);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };
}

export default new ReviewController();
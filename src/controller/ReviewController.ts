import { Request, Response } from "express";
import ReviewService from "../service/ReviewService"; 

class ReviewController {
    private reviewService; 
    constructor() {
        this.reviewService = ReviewService; 
    }

    getReviews = async (req: Request, res: Response) => {
      const productId = req.params.id;
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

    editReview = async (req: Request, res: Response) => {
      const reviewId = req.body.reviewId;
      const comment = req.body.comment;
      const productId = req.body.productId;
      try {
        const result = await this.reviewService.editReview(reviewId,comment);
        const reviews = await this.reviewService.getReviews(productId);
        return res.status(200).json(reviews);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };

    replyReview = async (req: Request, res: Response) => {
      const reviewId = req.body.reviewId;
      const reply = req.body.reply;
      const productId = req.body.productId;
      try {
      const result = await this.reviewService.replyReview(reviewId,reply);
      const reviews = await this.reviewService.getReviews(productId);
        return res.status(200).json(reviews);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };

    deleteReview = async (req: Request, res: Response) => {
      const reviewId = req.params.id;
      try {
        const message = await this.reviewService.deleteReview(reviewId);
        return res.status(200).json(message);
      } catch (error) {
        return res.status(500).json({ message: error.message});
      }
    };
}

export default new ReviewController();
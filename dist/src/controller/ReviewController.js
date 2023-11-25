"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReviewService_1 = __importDefault(require("../service/ReviewService"));
class ReviewController {
    constructor() {
        this.getReviews = async (req, res) => {
            const productId = req.params.id;
            try {
                const reviews = await this.reviewService.getReviews(productId);
                return res.status(200).json(reviews);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.createReview = async (req, res) => {
            const reviewData = req.body;
            try {
                const review = await this.reviewService.createReview(reviewData);
                return res.status(200).json(review);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.updateReview = async (req, res) => {
            const reviewId = req.params.id;
            const reviewData = req.body;
            try {
                const review = await this.reviewService.updateReview(reviewId, reviewData);
                return res.status(200).json(review);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.reviewService = ReviewService_1.default;
    }
}
exports.default = new ReviewController();
//# sourceMappingURL=ReviewController.js.map
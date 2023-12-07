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
        this.editReview = async (req, res) => {
            const reviewId = req.body.reviewId;
            const comment = req.body.comment;
            const productId = req.body.productId;
            try {
                const result = await this.reviewService.editReview(reviewId, comment);
                const reviews = await this.reviewService.getReviews(productId);
                return res.status(200).json(reviews);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.replyReview = async (req, res) => {
            const reviewId = req.body.reviewId;
            const reply = req.body.reply;
            const productId = req.body.productId;
            try {
                const result = await this.reviewService.replyReview(reviewId, reply);
                const reviews = await this.reviewService.getReviews(productId);
                return res.status(200).json(reviews);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.deleteReview = async (req, res) => {
            const reviewId = req.params.id;
            try {
                const message = await this.reviewService.deleteReview(reviewId);
                return res.status(200).json(message);
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
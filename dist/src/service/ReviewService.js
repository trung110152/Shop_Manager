"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = require("../model/review");
const data_source_1 = require("../data-source");
class ReviewService {
    constructor() {
        this.createReview = async (reviewData) => {
            try {
                const review = await this.reviewRepository.save(reviewData);
                if (review) {
                    const result = await this.findOneById(review.reviewId);
                    return result;
                }
                throw new Error('Lỗi trong quá trình tạo review.');
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình tạo review và lấy review');
            }
        };
        this.getReviews = async (productId) => {
            try {
                const sql = `select u.userName, r.* from review r join user u on r.userId = u.userId where r.productId = ${productId}`;
                const reviews = await this.reviewRepository.query(sql);
                return reviews;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy thông tin danh sách reviews sản phẩm.');
            }
        };
        this.findOneById = async (reviewId) => {
            try {
                const sql = `select u.userName, r.* from review r join user u on r.userId = u.userId where r.reviewId = ${reviewId}`;
                const review = await this.reviewRepository.query(sql);
                return review[0];
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy thông tin review sản phẩm.');
            }
        };
        this.updateReview = async (reviewId, reviewData) => {
            try {
                await this.reviewRepository.update(reviewId, reviewData);
                const review = await this.findOneById(reviewId);
                return review;
            }
            catch (error) {
                throw new Error("Lỗi trong quá trình sửa review");
            }
        };
        this.reviewRepository = data_source_1.AppDataSource.getRepository(review_1.Review);
    }
}
exports.default = new ReviewService();
//# sourceMappingURL=ReviewService.js.map
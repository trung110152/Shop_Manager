"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = require("../model/review");
const data_source_1 = require("../data-source");
class ReviewService {
    constructor() {
        this.createReview = async (reviewData) => {
            try {
                const review = await this.reviewRepository.save(reviewData);
                return review;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình tạo review và lấy review');
            }
        };
        this.getReviews = async (productId) => {
            try {
                const sql = `select u.userName, u.role, r.* from review r join user u on r.userId = u.userId where r.productId = ${productId}`;
                const reviews = await this.reviewRepository.query(sql);
                if (reviews.length > 0) {
                    reviews.map(item => item.reply = JSON.parse(item.reply));
                }
                return reviews;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy thông tin danh sách reviews sản phẩm.' + error.message);
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
        this.editReview = async (reviewId, reviewData) => {
            try {
                await this.reviewRepository.update(reviewId, { comment: reviewData });
                return "Edit comment hoan thanh";
            }
            catch (error) {
                throw new Error("Lỗi trong quá trình sửa review");
            }
        };
        this.replyReview = async (reviewId, reviewData) => {
            try {
                await this.reviewRepository.update(reviewId, { reply: reviewData });
                return "Reply hoan thanh";
            }
            catch (error) {
                throw new Error("Lỗi trong quá trình sửa review");
            }
        };
        this.deleteReview = async (reviewId) => {
            try {
                const result = await this.reviewRepository.delete(reviewId);
                if (result.affected === 1) {
                    return 'Review đã được xóa thành công.';
                }
                throw new Error('Review không tồn tại.');
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.reviewRepository = data_source_1.AppDataSource.getRepository(review_1.Review);
    }
}
exports.default = new ReviewService();
//# sourceMappingURL=ReviewService.js.map

import { Review } from "../model/review";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

class ReviewService {
    private reviewRepository: Repository <Review>;
    constructor() {
        this.reviewRepository = AppDataSource.getRepository(Review);
    }

    createReview = async (reviewData: Review): Promise<Review> => {
        try {
            const review = await this.reviewRepository.save(reviewData);
            if(review) {
                const result = await this.findOneById(review.reviewId);
                return result;
            }
            throw new Error ('Lỗi trong quá trình tạo review.')
        } catch (error) {
           throw new Error('Lỗi trong quá trình tạo review và lấy review');
        }
    }

    getReviews = async (productId: number): Promise<Review> => {
        try {
            const sql = `select u.userName, r.* from review r join user u on r.userId = u.userId where r.productId = ${productId}`;
            const reviews = await this.reviewRepository.query(sql);
            return reviews;
        } catch (error) {
            throw new Error('Lỗi trong quá trình lấy thông tin danh sách reviews sản phẩm.');
        }       
    }

    findOneById = async (reviewId: number): Promise<Review> => {
        try {
            const sql = `select u.userName, r.* from review r join user u on r.userId = u.userId where r.reviewId = ${reviewId}`;
            const review = await this.reviewRepository.query(sql);
            return review[0];
        } catch (error) {
            throw new Error('Lỗi trong quá trình lấy thông tin review sản phẩm.');
        }   
    }

    updateReview = async (reviewId: number, reviewData: any): Promise<Review> => {
        try {
            await this.reviewRepository.update(reviewId,reviewData);
            const review = await this.findOneById(reviewId);
            return review; 
         } catch (error) {
            throw new Error("Lỗi trong quá trình sửa review");
         }
    }
}

export default new ReviewService();
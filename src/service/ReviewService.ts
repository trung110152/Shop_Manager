
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
            return review;
        } catch (error) {
           throw new Error('Lỗi trong quá trình tạo review và lấy review');
        }
    }

    getReviews = async (productId: number): Promise<Review> => {
        try {
            const sql = `select u.userName, u.role, r.* from review r join user u on r.userId = u.userId where r.productId = ${productId}`;
            const reviews = await this.reviewRepository.query(sql);
            if(reviews.length > 0) {
                reviews.map(item => item.reply = JSON.parse(item.reply))
            }
            return reviews;
        } catch (error) {
            throw new Error('Lỗi trong quá trình lấy thông tin danh sách reviews sản phẩm.' + error.message);
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

    editReview = async (reviewId: number, reviewData: any) => {
        try {
            await this.reviewRepository.update(reviewId, { comment:reviewData });
            return "Edit comment hoan thanh"; 
         } catch (error) {
            throw new Error("Lỗi trong quá trình sửa review");
         }
    }

    replyReview = async (reviewId: number, reviewData: any) => {
        try {
            await this.reviewRepository.update(reviewId, { reply:reviewData });
            return "Reply hoan thanh"; 
         } catch (error) {
            throw new Error("Lỗi trong quá trình sửa review");
         }
    }

    deleteReview = async (reviewId)=> {
        try {
          const result = await this.reviewRepository.delete(reviewId);
          if (result.affected === 1) {
            return 'Review đã được xóa thành công.'
          }
            throw new Error('Review không tồn tại.');
        } catch (error) {
          throw new Error(error.message);
        }
    }
}

export default new ReviewService();
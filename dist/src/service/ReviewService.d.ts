import { Review } from "../model/review";
declare class ReviewService {
    private reviewRepository;
    constructor();
    createReview: (reviewData: Review) => Promise<Review>;
    getReviews: (productId: number) => Promise<Review>;
    findOneById: (reviewId: number) => Promise<Review>;
    editReview: (reviewId: number, reviewData: any) => Promise<string>;
    replyReview: (reviewId: number, reviewData: any) => Promise<string>;
    deleteReview: (reviewId: any) => Promise<string>;
}
declare const _default: ReviewService;
export default _default;

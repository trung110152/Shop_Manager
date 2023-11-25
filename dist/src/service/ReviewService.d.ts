import { Review } from "../model/review";
declare class ReviewService {
    private reviewRepository;
    constructor();
    createReview: (reviewData: Review) => Promise<Review>;
    getReviews: (productId: number) => Promise<Review>;
    findOneById: (reviewId: number) => Promise<Review>;
    updateReview: (reviewId: number, reviewData: any) => Promise<Review>;
}
declare const _default: ReviewService;
export default _default;

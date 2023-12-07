import { Request, Response } from "express";
declare class ReviewController {
    private reviewService;
    constructor();
    getReviews: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    editReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    replyReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: ReviewController;
export default _default;

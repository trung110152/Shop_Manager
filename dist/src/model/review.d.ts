interface Reply {
    userId: number;
    userName: string;
    comment: string;
    date: Date;
}
export declare class Review {
    reviewId: number;
    userId: number;
    productId: number;
    reviewDate: Date;
    rating: number;
    comment: string;
    reply: Reply;
}
export {};

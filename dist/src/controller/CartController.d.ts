import { Request, Response } from "express";
declare class CartController {
    private cartService;
    constructor();
    getCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    productAddToCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: CartController;
export default _default;

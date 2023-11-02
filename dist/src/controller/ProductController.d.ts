import { Request, Response } from "express";
declare class ProductController {
    private productService;
    constructor();
    getProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: ProductController;
export default _default;

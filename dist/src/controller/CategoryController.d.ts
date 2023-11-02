import { Request, Response } from "express";
declare class ProductController {
    private categoryService;
    constructor();
    getCategories: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: ProductController;
export default _default;

import { Request, Response } from "express";
declare class CategoryController {
    private categoryService;
    constructor();
    getCategories: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    editCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findOneByID: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: CategoryController;
export default _default;

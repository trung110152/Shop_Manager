import {Request, Response} from "express";
import categoryService from "../service/CategoryService";
class CategoryController {
    private categoryService;
     constructor() {
        this.categoryService = categoryService;
        
    }

    getCategories = async (req: Request, res: Response) => {
        try {
          const categoryList = await this.categoryService.getCategories();
          return res.status(200).json(categoryList);
        } catch (error) {
          return res.status(500).json({ message: 'Lỗi trong quá trình lấy danh sách loại.' });
        }
    };

    createCategory = async (req: Request, res: Response) => {
        const categoryData = req.body;
        try {
          const category = await this.categoryService.createCategory(categoryData);
          return res.status(200).json(category);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };
}

export default new CategoryController();
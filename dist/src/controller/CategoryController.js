"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class ProductController {
    constructor() {
        this.getCategories = async (req, res) => {
            try {
                const categoryList = await CategoryService_1.default.getCategories();
                return res.status(200).json(categoryList);
            }
            catch (error) {
                return res.status(500).json({ message: 'Lỗi trong quá trình lấy danh sách loại.' });
            }
        };
        this.createCategory = async (req, res) => {
            const categoryData = req.body;
            try {
                const category = await CategoryService_1.default.createCategory(categoryData);
                return res.status(200).json({ category });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new ProductController();
//# sourceMappingURL=CategoryController.js.map
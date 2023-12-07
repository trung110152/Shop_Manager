"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class CategoryController {
    constructor() {
        this.getCategories = async (req, res) => {
            try {
                const categoryList = await this.categoryService.getCategories();
                return res.status(200).json(categoryList);
            }
            catch (error) {
                return res.status(500).json({ message: 'Lỗi trong quá trình lấy danh sách loại.' });
            }
        };
        this.createCategory = async (req, res) => {
            const categoryData = req.body;
            try {
                const category = await this.categoryService.createCategory(categoryData);
                return res.status(200).json(category);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.editCategory = async (req, res) => {
            const categoryId = req.params.id;
            const categoryData = req.body;
            try {
                const editCategory = await this.categoryService.editCategory(categoryId, categoryData);
                return res.status(200).json(editCategory);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.findOneByID = async (req, res) => {
            const categoryId = req.params.id;
            try {
                const category = await this.categoryService.findOneByID(categoryId);
                return res.status(200).json(category);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=CategoryController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../model/category");
const data_source_1 = require("../data-source");
class CategoryService {
    constructor() {
        this.getCategories = async () => {
            try {
                const categoryList = await this.categoryRepository.find();
                return categoryList;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy danh sách loại.');
            }
        };
        this.createCategory = async (categoryData) => {
            try {
                const category = await this.categoryRepository.save(categoryData);
                return category;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình tạo loại.');
            }
        };
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=CategoryService.js.map
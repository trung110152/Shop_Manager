
import {Category} from "../model/category";
import {AppDataSource} from "../data-source";

class CategoryService {
    private categoryRepository;
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    getCategories = async () => {
        try {
            const categoryList = await this.categoryRepository.find();
            return categoryList;
        } catch (error) {
            throw new Error('Lỗi trong quá trình lấy danh sách loại.');
        }
        
    }

    createCategory = async (categoryData) => {
        try {
            const category = await this.categoryRepository.save(categoryData);
            return category;
        } catch (error) {
            throw new Error('Lỗi trong quá trình tạo loại.');
        }
    }
}

export default new CategoryService();
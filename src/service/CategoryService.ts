
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

    editCategory = async (categoryId, categoryData) => {
        try {
           const product = await this.categoryRepository.findOneBy({categoryId});
           if (!product) {
             throw new Error('Loại sp không tồn tại.');
           }
           await this.categoryRepository.update({categoryId}, categoryData);
           return 'Loại sp đã được sửa thành công.' 
         } catch (error) {
           throw new Error(error.message);
         }
     }

    findOneByID = async (categoryId) => {
        try {
          let sql =`select * from category where category.categoryId = ${categoryId}`;
          const result = await this.categoryRepository.query(sql);
          if(!result.length){
            throw new Error('Loại sp không tồn tại.')
          }
          return result[0];
        } catch (error) {
          throw new Error(error.message);
        }
      }
}

export default new CategoryService();
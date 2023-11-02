import {Product} from "../model/product";
import {AppDataSource} from "../data-source";

class ProductService {
    private productRepository;
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    getProductList = async () => {
        try {
            let sql =`select p.productId, p.productName, p.price, p.description, p.inventory, p.image, c.categoryName from  product p join category c on p.categoryId = c.categoryId`;
          const productList = await this.productRepository.query(sql);
          return productList;
        } catch (error) {
          throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm.');
        }
      };

    createProduct= async (productData: Object) => {
        try {
            const product = await this.productRepository.save(productData);
          return product;
        } catch (error) {
          throw new Error('Lỗi trong quá trình tạo sản phẩm.');
        }
    }

    editProduct = async (productId, productData) => {
       try {
         const product = await this.productRepository.findOneBy({productId});
         console.log(product);
         
          if (!product) {
            throw new Error('Sản phẩm không tồn tại.');
          }
          await this.productRepository.update({productId}, productData);
          return 'Sản phẩm đã được sửa thành công.' 
        } catch (error) {
          throw new Error(error.message);
        }
      };

    deleteProduct = async (productId)=> {
        try {
          const result = await this.productRepository.delete(productId);
          if (result.affected === 1) {
            return 'Sản phẩm đã được xóa thành công.'
          }
            throw new Error('Sản phẩm không tồn tại.');
          
        } catch (error) {
          throw new Error(error.message);
        }
    }

}

export default new ProductService();
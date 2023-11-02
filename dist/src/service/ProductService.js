"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
const data_source_1 = require("../data-source");
class ProductService {
    constructor() {
        this.getProductList = async () => {
            try {
                let sql = `select p.productId, p.productName, p.price, p.description, p.inventory, p.image, c.categoryName from  product p join category c on p.categoryId = c.categoryId`;
                const productList = await this.productRepository.query(sql);
                return productList;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm.');
            }
        };
        this.createProduct = async (productData) => {
            try {
                const product = await this.productRepository.save(productData);
                return product;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình tạo sản phẩm.');
            }
        };
        this.editProduct = async (productId, productData) => {
            try {
                const product = await this.productRepository.findOneBy({ productId });
                if (!product) {
                    throw new Error('Sản phẩm không tồn tại.');
                }
                await this.productRepository.update({ productId }, productData);
                return 'Sản phẩm đã được sửa thành công.';
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.deleteProduct = async (productId) => {
            try {
                const result = await this.productRepository.delete(productId);
                if (result.affected === 1) {
                    return 'Sản phẩm đã được xóa thành công.';
                }
                throw new Error('Sản phẩm không tồn tại.');
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.findOneByID = async (productId) => {
            try {
                let sql = `select p.productId, p.productName, p.price, p.description, p.inventory, p.image, c.categoryName from  product p join category c on p.categoryId = c.categoryId where p.productId = ${productId}`;
                const products = await this.productRepository.query(sql);
                if (!products.length) {
                    throw new Error('Sản phẩm không tồn tại.');
                }
                return products[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.findByConditions = async (productName, categoryId) => {
            let category = '';
            if (categoryId != 0) {
                category = categoryId;
            }
            try {
                let sql = `select p.productId, p.productName, p.price, p.description, p.inventory, p.image, c.categoryName from  shop_database.product p join shop_database.category c on p.categoryId = c.categoryId where p.productName like '%${productName}%' and p.categoryId${category}`;
                const productList = await this.productRepository.query(sql);
                return productList;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm.');
            }
        };
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map
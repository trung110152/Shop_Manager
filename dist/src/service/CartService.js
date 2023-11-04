"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../model/cart");
const data_source_1 = require("../data-source");
class CartService {
    constructor() {
        this.getCart = async (userId) => {
            try {
                const sql = `select c.cartId, c.userId, c.productId, c.quantity, p.productName, p.price, p.description, p.inventory, p.categoryId, p.image from cart c join product p on c.productId = p.productId where c.userId = ${userId}`;
                const cart = await this.cartRepository.query(sql);
                return cart;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy giỏ hàng.' + error.message);
            }
        };
        this.createCart = async (cartData) => {
            try {
                await this.cartRepository.save(cartData);
                const carts = await this.getCart(cartData.userId);
                return carts;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình tạo giỏ hàng.');
            }
        };
        this.updateCart = async (cartId, cartData) => {
            try {
                await this.cartRepository.update(cartId, cartData);
                const carts = await this.getCart(cartData.userId);
                return carts;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.deleteCart = async (cartId) => {
            try {
                const sql = `delete from cart where cartId in (${cartId})`;
                const result = await this.cartRepository.query(sql);
                console.log(result);
                if (result.affectedRows > 0) {
                    return 'Sản phẩm đã được xóa thành công.';
                }
                throw new Error('Sản phẩm không tồn tại.');
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.cartRepository = data_source_1.AppDataSource.getRepository(cart_1.Cart);
    }
}
exports.default = new CartService();
//# sourceMappingURL=CartService.js.map
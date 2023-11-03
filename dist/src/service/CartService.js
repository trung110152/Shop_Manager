"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../model/cart");
const data_source_1 = require("../data-source");
class CartService {
    constructor() {
        this.getCart = async (userId) => {
            try {
                const cart = await this.cartRepository.query(`select * from cart where userId = ${userId}`);
                return cart;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy giỏ hàng.' + error.message);
            }
        };
        this.createCart = async (cartData) => {
            try {
                const cart = await this.cartRepository.save(cartData);
                return cart;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình tạo giỏ hàng.');
            }
        };
        this.updateCart = async (cartId, cartData) => {
            try {
                let update = await this.cartRepository.update(cartId, cartData);
                return 'Số lượng sản phẩm đã được sửa thành công.';
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
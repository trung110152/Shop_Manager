
import {Cart} from "../model/cart";
import {AppDataSource} from "../data-source";

class CartService {
    private cartRepository;
    constructor() {
        this.cartRepository = AppDataSource.getRepository(Cart);
    }

    getCart = async (userId) => {
        try {
            const sql = `select * from cart c where c.userId = ${userId}`;
            const cart = await this.cartRepository.query(sql);
            return cart;
        } catch (error) {
            throw new Error('Lỗi trong quá trình lấy giỏ hàng.'+ error.message);
        }
        
    }

    createCart = async (cartData) => {
        try {
            await this.cartRepository.save(cartData);
            const carts = await this.getCart(cartData.userId);
            return carts;
        } catch (error) {
           throw new Error('Lỗi trong quá trình tạo giỏ hàng.');
        }
    }

    updateCart = async (cartId, cartData) => {
        try {
            await this.cartRepository.update(cartId,cartData);
            const carts = await this.getCart(cartData.userId);
            return carts; 
         } catch (error) {
            throw new Error(error.message);
         }
    }

    deleteCart = async (cartId)=> {
        
        try {
            const sql = `delete from cart where cartId in (${cartId})`
          const result = await this.cartRepository.query(sql);
          if (result.affectedRows > 0) {
            return 'Sản phẩm đã được xóa thành công.'
          }
            throw new Error('Sản phẩm không tồn tại.');
        } catch (error) {
          throw new Error(error.message);
        }
    } 
}

export default new CartService();
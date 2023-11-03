
import {Cart} from "../model/cart";
import {AppDataSource} from "../data-source";

class CartService {
    private cartRepository;
    constructor() {
        this.cartRepository = AppDataSource.getRepository(Cart);
    }

    getCart = async (userId) => {
        try {
            const cart = await this.cartRepository.query(`select * from cart where userId = ${userId}`);
            return cart;
        } catch (error) {
            throw new Error('Lỗi trong quá trình lấy giỏ hàng.'+ error.message);
        }
        
    }

    createCart = async (cartData) => {
        try {
            const cart = await this.cartRepository.save(cartData);
          return cart;
        } catch (error) {
          throw new Error('Lỗi trong quá trình tạo giỏ hàng.');
        }
    }

    updateCart = async (cartId, cartData) => {
        try {
           let update = await this.cartRepository.update(cartId,cartData)
           return 'Số lượng sản phẩm đã được sửa thành công.' 
         } catch (error) {
           throw new Error(error.message);
         }
       };
}

export default new CartService();
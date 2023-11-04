import {Order} from "../model/order";
import { OrderDetail } from "../model/orderDetail";
import {AppDataSource} from "../data-source";

class OrderService {
    private orderRepository;
    private orderDetailRepository;
    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
    }

    // getCart = async (userId) => {
    //     try {
    //         const sql = `select c.cartId, c.userId, c.productId, c.quantity, p.productName, p.price, p.description, p.inventory, p.categoryId, p.image from cart c join product p on c.productId = p.productId where c.userId = ${userId}`;
    //         const cart = await this.cartRepository.query(sql);
    //         return cart;
    //     } catch (error) {
    //         throw new Error('Lỗi trong quá trình lấy giỏ hàng.'+ error.message);
    //     }
        
    // }

    createOrder = async (orderData) => {
        try {
            const order = await this.orderRepository.save(orderData);
            return order;
        } catch (error) {
           throw new Error('Lỗi trong quá trình tạo đơn hàng.');
        }
    }

    createOrderDetail = async (orderDetailData) => {
        try {
            const values = await orderDetailData.map(element => `(${element.productId}, ${element.orderId}, ${element.quantity})`).join(',');
            const sql = `INSERT INTO order_detail (productId, orderId, quantity) VALUES ${values}`;
            await this.orderDetailRepository.query(sql);
            return 'Tạo chi tiết đơn hàng thành công'
        } catch (error) {
           throw new Error(error.message);
        }
    }

    // updateCart = async (cartId, cartData) => {
    //     try {
    //         await this.cartRepository.update(cartId,cartData);
    //         const carts = await this.getCart(cartData.userId);
    //         return carts; 
    //      } catch (error) {
    //         throw new Error(error.message);
    //      }
    // }
}

export default new OrderService();
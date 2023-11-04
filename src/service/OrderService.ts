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

    getOrders = async (userId) => {
        try {
            const orderList = await this.orderRepository.find({userId: userId});
            return orderList;
        } catch (error) {
            throw new Error('Lỗi trong quá trình lấy danh đơn.');
        }
        
    }

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
    checkOrderDetailData = (arr) => {
        return arr.every(item => 
          item.hasOwnProperty('productId') && 
          item.hasOwnProperty('quantity') &&
          typeof item.productId === 'number' && 
          typeof item.quantity === 'number' && 
          item.productId > 0 && 
          item.quantity > 0
          )
        }
}

export default new OrderService();
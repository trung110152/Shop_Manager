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
        let sql = '';
        try {
            if(userId != 0){
                sql =` o where o.userId = ${userId}`;
            }
           
            const order = await this.orderRepository.query(`select * from shop_database.order ${sql}`);
            return order;
        } catch (error) {
            throw new Error(error.message);
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

    editOrder = async (orderId) => {
        try {
            let sql = `UPDATE shop_database.order o SET status = "moving" WHERE o.orderId = ${orderId}`;
            const res = await this.orderRepository.query(sql);
            if(res.protocol41 === true){
                const order =  await this.orderRepository.query(`select * from shop_database.order o where o.orderId = ${orderId} `)
                return order[0];
            }
            throw new Error('Lỗi trong quá trình chuyển trạng thái đơn hàng.');
        } catch (error) {
           throw new Error('Lỗi trong quá trình chuyển trạng thái đơn hàng.');
        }
    }

    findOrder = async (orderId) => {
        try {
            const order = await this.orderRepository.query(`select * from shop_database.order o where o.orderId = ${orderId}`);
            return order[0];
        } catch (error) {
           throw new Error(error.message);
        }
    }

    findOrderDetail = async (orderId) => {
        try {
            const sql = `select o.orderDetailId, o.quantity, o.productId, p.productName, o.price  from order_detail o join product p on o.productId = p.productId where o.orderId = ${orderId}`
            const orderDetail =  await this.orderDetailRepository.query(sql);
            return orderDetail;
        } catch (error) {
           throw new Error(error.message);
        }
    }

    createOrderDetail = async (orderDetailData) => {
        try {
            const values = await orderDetailData.map(element => `(${element.productId}, ${element.orderId}, ${element.quantity}, ${element.price})`).join(',');
            const sql = `INSERT INTO order_detail (productId, orderId, quantity, price) VALUES ${values}`;
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
          item.hasOwnProperty('price') &&
          typeof item.productId === 'number' && 
          typeof item.quantity === 'number' && 
          item.productId > 0 && 
          item.price >= 0 &&
          item.quantity > 0
          )
    }
}

export default new OrderService();
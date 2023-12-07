"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../model/order");
const orderDetail_1 = require("../model/orderDetail");
const data_source_1 = require("../data-source");
class OrderService {
    constructor() {
        this.getOrders = async (userId) => {
            let sql = '';
            try {
                if (userId != 0) {
                    sql = ` o where o.userId = ${userId}`;
                }
                const order = await this.orderRepository.query(`select * from shop_database.order ${sql}`);
                return order;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.createOrder = async (orderData) => {
            try {
                const order = await this.orderRepository.save(orderData);
                return order;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình tạo đơn hàng.');
            }
        };
        this.editOrder = async (orderId) => {
            try {
                let sql = `UPDATE shop_database.order o SET status = "moving" WHERE o.orderId = ${orderId}`;
                const res = await this.orderRepository.query(sql);
                if (res.protocol41 === true) {
                    const order = await this.orderRepository.query(`select * from shop_database.order o where o.orderId = ${orderId} `);
                    return order[0];
                }
                throw new Error('Lỗi trong quá trình chuyển trạng thái đơn hàng.');
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình chuyển trạng thái đơn hàng.');
            }
        };
        this.findOrder = async (orderId) => {
            try {
                const order = await this.orderRepository.query(`select * from shop_database.order o where o.orderId = ${orderId}`);
                return order[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.findOrderDetail = async (orderId) => {
            try {
                const sql = `select * from order_detail o where o.orderId = ${orderId}`;
                const orderDetail = await this.orderDetailRepository.query(sql);
                return orderDetail;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.createOrderDetail = async (orderDetailData) => {
            try {
                const values = await orderDetailData.map(element => `(${element.orderId}, ${element.productId}, "${element.productName}", ${element.price}, "${element.description}", ${element.inventory}, ${element.categoryId}, "${element.image}", ${element.quantity})`).join(',');
                const sql = `INSERT INTO order_detail (orderId, productId, productName, price, description, inventory, categoryId, image, quantity) VALUES ${values}`;
                await this.orderDetailRepository.query(sql);
                return 'Tạo chi tiết đơn hàng thành công';
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.checkOrderDetailData = (arr) => {
            return arr.every(item => item.hasOwnProperty('quantity') &&
                typeof item.quantity === 'number' &&
                item.quantity > 0);
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map
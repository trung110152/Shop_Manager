"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../model/order");
const orderDetail_1 = require("../model/orderDetail");
const data_source_1 = require("../data-source");
class OrderService {
    constructor() {
        this.getOrders = async (userId) => {
            try {
                const orderList = await this.orderRepository.find({ userId: userId });
                return orderList;
            }
            catch (error) {
                throw new Error('Lỗi trong quá trình lấy danh đơn.');
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
        this.createOrderDetail = async (orderDetailData) => {
            try {
                const values = await orderDetailData.map(element => `(${element.productId}, ${element.orderId}, ${element.quantity})`).join(',');
                const sql = `INSERT INTO order_detail (productId, orderId, quantity) VALUES ${values}`;
                await this.orderDetailRepository.query(sql);
                return 'Tạo chi tiết đơn hàng thành công';
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.checkOrderDetailData = (arr) => {
            return arr.every(item => item.hasOwnProperty('productId') &&
                item.hasOwnProperty('quantity') &&
                typeof item.productId === 'number' &&
                typeof item.quantity === 'number' &&
                item.productId > 0 &&
                item.quantity > 0);
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map
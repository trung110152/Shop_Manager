"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../model/order");
const orderDetail_1 = require("../model/orderDetail");
const data_source_1 = require("../data-source");
class OrderService {
    constructor() {
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
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map
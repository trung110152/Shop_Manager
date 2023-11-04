"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderService_1 = __importDefault(require("../service/OrderService"));
class OrderController {
    constructor() {
        this.getOrders = async (req, res) => {
            try {
                const userId = req.params.id || 0;
                const orderList = await this.orderService.getOrders(userId);
                return res.status(200).json(orderList);
            }
            catch (error) {
                return res.status(500).json({ message: 'Lỗi trong quá trình lấy danh đơn hàng.' });
            }
        };
        this.createOrder = async (req, res) => {
            const orderData = req.body.order;
            const orderDetailData = req.body.orderDetail;
            try {
                if (!this.orderService.checkOrderDetailData(orderDetailData)) {
                    return res.status(400).json('Dữ liệu không hợp lệ');
                }
                const order = await this.orderService.createOrder(orderData);
                await orderDetailData.forEach(element => element.orderId = order.orderId);
                await this.orderService.createOrderDetail(orderDetailData);
                return res.status(200).json('Tạo đơn hàng thành công');
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.orderService = OrderService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=OrderController.js.map
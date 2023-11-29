import {Request, Response} from "express";
import orderService from "../service/OrderService";
class OrderController {
    private orderService;
     constructor() {
        this.orderService = orderService;
        
    }

    getOrders = async (req: Request, res: Response) => {
        try {
          const userId = req.params.id;
          const orderList = await this.orderService.getOrders(userId);
          return res.status(200).json(orderList);
        } catch (error) {
          return res.status(500).json({ message: 'Lỗi trong quá trình lấy danh đơn hàng.' });
        }
    };

    createOrder = async (req: Request, res: Response) => {
      const orderData = req.body.order;
      const orderDetailData = req.body.orderDetail;
      try {
        if(!this.orderService.checkOrderDetailData(orderDetailData)){
          return res.status(400).json('Dữ liệu không hợp lệ')
        }
        const order = await this.orderService.createOrder(orderData);
        await orderDetailData.forEach(element => element.orderId = order.orderId);
        await this.orderService.createOrderDetail(orderDetailData);
        return res.status(200).json('Tạo đơn hàng thành công');
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
      }

    editOrder = async (req: Request, res: Response) =>{
      const orderId = req.params.id;
      try {
        const order = await this.orderService.editOrder(orderId);
        return res.status(200).json(order)
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    }

    orderDetail =async (req: Request, res: Response) => {
      const orderId = req.params.id;
      try {
        const order = await this.orderService.findOrder(orderId);
        const orderDetail = await this.orderService.findOrderDetail(orderId);
        const result = {order: order, orderDetail};
        return res.status(200).json(result)
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
}

export default new OrderController();
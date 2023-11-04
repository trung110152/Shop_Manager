import {Request, Response} from "express";
import orderService from "../service/OrderService";
class OrderController {
    private orderService;
     constructor() {
        this.orderService = orderService;
        
    }

    // getCategories = async (req: Request, res: Response) => {
    //     try {
    //       const categoryList = await orderService.getCategories();
    //       return res.status(200).json(categoryList);
    //     } catch (error) {
    //       return res.status(500).json({ message: 'Lỗi trong quá trình lấy danh sách loại.' });
    //     }
    // };

    createOrder = async (req: Request, res: Response) => {
        const orderData = req.body.order;
        const orderDetailData = req.body.orderDetail;
        try {

            const order = await this.orderService.createOrder(orderData);
            await orderDetailData.forEach(element => element.orderId = order.orderId);
            await this.orderService.createOrderDetail(orderDetailData);
          return res.status(200).json('Tạo đơn hàng thành công');
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };
}

export default new OrderController();
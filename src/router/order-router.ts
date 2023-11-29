import {Router} from "express";
import orderController from "../controller/OrderController";

export const orderRouter = Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/:id', orderController.getOrders);
orderRouter.put('/:id', orderController.editOrder);
orderRouter.get('/detail/:id', orderController.orderDetail);

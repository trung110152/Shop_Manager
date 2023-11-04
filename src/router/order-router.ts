import {Router} from "express";
import orderController from "../controller/OrderController";

export const orderRouter = Router();

orderRouter.post('/', orderController.createOrder);
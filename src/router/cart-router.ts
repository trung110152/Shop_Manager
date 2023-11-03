import {Router} from "express";
import cartController from "../controller/CartController";

export const cartRouter = Router();

cartRouter.get('/:id', cartController.getCart); // useId
cartRouter.post('/', cartController.productAddToCart); // body: userId, productId, quantity
cartRouter.delete('/:id', cartController.deleteCart); // cartId
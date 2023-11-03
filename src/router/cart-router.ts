import {Router} from "express";
import cartController from "../controller/CartController";

export const cartRouter = Router();

cartRouter.get('/:id', cartController.getCart);
cartRouter.post('/', cartController.productAddToCart);
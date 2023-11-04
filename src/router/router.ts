import {Router} from "express";
import {userRouter} from "./user-router";
import {productRouter} from "./product-router";
import {categoryRouter} from "./category-router";
import { cartRouter } from "./cart-router";
import { orderRouter } from "./order-router";

export const router = Router();
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
import {Router} from "express";
import productController from "../controller/ProductController";

export const productRouter = Router();

productRouter.get('/', productController.getProducts);
productRouter.post('/', productController.createProduct);
productRouter.put('/:id', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);
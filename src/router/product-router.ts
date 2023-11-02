import {Router} from "express";
import productController from "../controller/ProductController";

export const productRouter = Router();

productRouter.get('/', productController.getProducts);
productRouter.post('/', productController.createProduct);
productRouter.put('/:id', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);
productRouter.get('/:id', productController.findOneByID);
productRouter.get('/findByConditions/search', productController.findByConditions); //http://localhost:3001/products/findByConditions/search?productName=h&categoryId=0
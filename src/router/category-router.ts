import {Router} from "express";
import categoryController from "../controller/CategoryController";

export const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.put('/:id', categoryController.editCategory);
categoryRouter.get('/:id', categoryController.findOneByID);
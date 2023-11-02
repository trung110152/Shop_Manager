import {Request, Response} from "express";
import productService from "../service/ProductService";
class ProductController {
    private productService;
     constructor() {
        this.productService = productService;
        
    }

    getProducts = async (req: Request, res: Response) => {
        try {
          const productList = await productService.getProductList();
          return res.status(200).json(productList);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

    createProduct = async (req: Request, res: Response) => {
        const productData = req.body;
        try {
          const product = await productService.createProduct(productData);
          console.log(product);
          
          return res.status(200).json({ product });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

    updateProduct = async (req: Request, res: Response) => {
        const productId = req.params.id;
        const productData = req.body;
        try {
          const updatedProduct = await productService.editProduct(productId, productData);
          return res.status(200).json(updatedProduct);
        } catch (error) {
          return res.status(500).json({message: error.message});
        }
      };


    deleteProduct = async (req: Request, res: Response) => {
        const productId = req.params.id;
        try {
          const message = await productService.deleteProduct(productId);
          return res.status(200).json({ message });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

      findOneByID = async (req: Request, res: Response) => {
        const productId = req.params.id;
        try {
          const product = await productService.findOneByID(productId);
          return res.status(200).json(product);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

      findByConditions = async (req: Request, res: Response) => {
        const productName = req.query.productName;
        const categoryId = req.query.categoryId;
        try {
          const product = await productService.findByConditions(productName,categoryId);
          return res.status(200).json(product);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };
}

export default new ProductController();
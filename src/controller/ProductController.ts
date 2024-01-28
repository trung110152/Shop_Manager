import {Request, Response} from "express";
import productService from "../service/ProductService";
import { log } from "winston";
const winston = require('winston');
class ProductController {
    private productService;
     constructor() {
        this.productService = productService;
        
    }

    getProducts = async (req: Request, res: Response) => {
        try {
          const productList = await this.productService.getProductList();
          return res.status(200).json(productList);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

    createProduct = async (req: Request, res: Response) => {
        const productData = req.body;
        try {
          const product = await this.productService.createProduct(productData);
          return res.status(200).json(product);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

    updateProduct = async (req: Request, res: Response) => {
      const productId = req.params.id;
        const productData = req.body;
        try {
          const updatedProduct = await this.productService.editProduct(productId, productData);
          return res.status(200).json(updatedProduct);
        } catch (error) {
          return res.status(500).json({message: error.message});
        }
      };


    deleteProduct = async (req: Request, res: Response) => {
        const productId = req.params.id;
        const logger = winston.createLogger({
          level: process.env.LOG_LEVEL || 'debug',
          format: winston.format.simple(),
          transports: [
            new winston.transports.Console(),
            new winston.transports.File({dirname: 'logs', filename: 'combined.log' }),
          ],
        });
        if(productId == '0'){
          logger.error('ProductId not define');
          
        }
        try {
          const message = await this.productService.deleteProduct(productId);
          return res.status(200).json(message);
        } catch (error) {
          return res.status(500).json({ message: error.message});
        }
      };

    findOneByID = async (req: Request, res: Response) => {
      const productId = req.params.id;
      try {
        const product = await this.productService.findOneByID(productId);
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };

      findByConditions = async (req: Request, res: Response) => {
        const productName = req.query.productName;
        const categoryId = req.query.categoryId;
        try {
          const product = await this.productService.findByConditions(productName,categoryId);
          return res.status(200).json(product);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

      findByPrice = async (req: Request, res: Response) => {
        const min = req.query.min||0;
        const max = req.query.max||1000000000;
        try {
          const products = await this.productService.findByPrice( min, max );
          return res.status(200).json(products);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };
}

export default new ProductController();
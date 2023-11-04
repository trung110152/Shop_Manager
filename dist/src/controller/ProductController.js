"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
class ProductController {
    constructor() {
        this.getProducts = async (req, res) => {
            try {
                const productList = await this.productService.getProductList();
                return res.status(200).json(productList);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.createProduct = async (req, res) => {
            const productData = req.body;
            try {
                const product = await this.productService.createProduct(productData);
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.updateProduct = async (req, res) => {
            const productId = req.params.id;
            const productData = req.body;
            try {
                const updatedProduct = await this.productService.editProduct(productId, productData);
                return res.status(200).json(updatedProduct);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.deleteProduct = async (req, res) => {
            const productId = req.params.id;
            try {
                const message = await this.productService.deleteProduct(productId);
                return res.status(200).json(message);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.findOneByID = async (req, res) => {
            const productId = req.params.id;
            try {
                const product = await this.productService.findOneByID(productId);
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.findByConditions = async (req, res) => {
            const productName = req.query.productName;
            const categoryId = req.query.categoryId;
            try {
                const product = await this.productService.findByConditions(productName, categoryId);
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.productService = ProductService_1.default;
    }
}
exports.default = new ProductController();
//# sourceMappingURL=ProductController.js.map
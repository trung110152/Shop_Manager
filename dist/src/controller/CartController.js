"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartService_1 = __importDefault(require("../service/CartService"));
class CartController {
    constructor() {
        this.getCart = async (req, res) => {
            const userId = req.params.id;
            try {
                const userId = req.params.id;
                const cart = await this.cartService.getCart(userId);
                return res.status(200).json(cart);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.productAddToCart = async (req, res) => {
            let newProduct = req.body;
            try {
                let carts = await this.cartService.getCart(newProduct.userId);
                if (!carts.length) {
                    carts = await this.cartService.createCart(newProduct);
                    return res.status(200).json(carts);
                }
                const existingProductIndex = carts.findIndex((product) => product.productId == newProduct.productId);
                if (existingProductIndex !== -1) {
                    newProduct.quantity += carts[existingProductIndex].quantity;
                    carts = await this.cartService.updateCart({ cartId: carts[existingProductIndex].cartId }, newProduct);
                }
                else {
                    carts = await this.cartService.createCart(newProduct);
                }
                return res.status(200).json(carts);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.deleteCart = async (req, res) => {
            const cartId = req.query.cartId;
            try {
                const message = await this.cartService.deleteCart(cartId);
                return res.status(200).json(message);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.cartService = CartService_1.default;
    }
}
exports.default = new CartController();
//# sourceMappingURL=CartController.js.map
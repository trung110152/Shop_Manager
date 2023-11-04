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
                const cart = await CartService_1.default.getCart(userId);
                return res.status(200).json(cart);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.productAddToCart = async (req, res) => {
            const cartData = req.body;
            let newProduct = { productId: cartData.productId, quantity: +cartData.quantity, userId: cartData.userId };
            try {
                let carts = await CartService_1.default.getCart(cartData.userId);
                if (!carts.length) {
                    carts = await CartService_1.default.createCart(newProduct);
                    return res.status(200).json(carts);
                }
                const existingProductIndex = carts.findIndex((product) => product.productId == newProduct.productId);
                if (existingProductIndex !== -1) {
                    newProduct.quantity += carts[existingProductIndex].quantity;
                    carts = await CartService_1.default.updateCart({ cartId: carts[existingProductIndex].cartId }, newProduct);
                    console.log(carts);
                }
                else {
                    carts = await CartService_1.default.createCart(newProduct);
                }
                return res.status(200).json(carts);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.deleteCart = async (req, res) => {
            const cartId = req.body.cartId;
            try {
                const message = await CartService_1.default.deleteCart(cartId);
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
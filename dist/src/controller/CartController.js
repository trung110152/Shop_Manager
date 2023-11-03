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
            const newProduct = { productId: cartData.productId, quantity: +cartData.quantity, userId: cartData.userId };
            try {
                let carts = await CartService_1.default.getCart(cartData.userId);
                if (!carts.length) {
                    let newCart = await CartService_1.default.createCart(newProduct);
                    carts.push(newCart);
                    return res.status(200).json(carts);
                }
                const existingProductIndex = carts.findIndex((product) => product.productId == newProduct.productId);
                if (existingProductIndex !== -1) {
                    carts[existingProductIndex].quantity += newProduct.quantity;
                    await CartService_1.default.updateCart({ cartId: carts[existingProductIndex].cartId }, carts[existingProductIndex]);
                }
                else {
                    let newCart = await CartService_1.default.createCart(newProduct);
                    carts.push(newCart);
                }
                return res.status(200).json(carts);
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
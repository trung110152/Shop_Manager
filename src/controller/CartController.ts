import {Request, Response} from "express";
import cartService from "../service/CartService";
class CartController {
    private cartService;
     constructor() {
        this.cartService = cartService;
        
    }

    getCart = async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
        const userId = req.params.id;
        const cart = await cartService.getCart(userId);
          return res.status(200).json(cart);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
    };

    productAddToCart = async (req:Request, res: Response) => {
      const cartData = req.body;
      const newProduct = { productId: cartData.productId, quantity: +cartData.quantity ,userId: cartData.userId };
      try {
        let carts = await cartService.getCart(cartData.userId);
          
        if(!carts.length){
          let newCart = await cartService.createCart(newProduct);
          carts.push(newCart);
          return res.status(200).json(carts)
        }
        const existingProductIndex = carts.findIndex(
          (product) => product.productId == newProduct.productId
        );
        
          
        if (existingProductIndex !== -1) {
          carts[existingProductIndex].quantity += newProduct.quantity;
          await cartService.updateCart({cartId:carts[existingProductIndex].cartId},carts[existingProductIndex])
        } else {
          let newCart = await cartService.createCart(newProduct);
          carts.push(newCart)
        }
        return res.status(200).json(carts)
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
    }
}

export default new CartController();
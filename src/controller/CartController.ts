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
      let newProduct = { productId: cartData.productId, quantity: +cartData.quantity ,userId: cartData.userId };
      try {
        let carts = await cartService.getCart(cartData.userId);
          
        if(!carts.length){
          carts = await cartService.createCart(newProduct);
          return res.status(200).json(carts)
        }
        const existingProductIndex = carts.findIndex(
          (product) => product.productId == newProduct.productId
        );
        
          
        if (existingProductIndex !== -1) {
          newProduct.quantity += carts[existingProductIndex].quantity  ;
          carts = await cartService.updateCart({cartId:carts[existingProductIndex].cartId},newProduct)
          console.log(carts);
          
        } else {
          carts = await cartService.createCart(newProduct);
        }
        return res.status(200).json(carts)
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
    }

    deleteCart = async (req: Request, res: Response) => {
      const cartId = req.params.id;
      try {
        const message = await cartService.deleteCart(cartId);
        return res.status(200).json(message);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
}

export default new CartController();
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
        const cart = await this.cartService.getCart(userId);
          return res.status(200).json(cart);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
    };

    productAddToCart = async (req:Request, res: Response) => {
      let newProduct = req.body;
      try {
        let carts = await this.cartService.getCart(newProduct.userId);
          
        if(!carts.length){
          carts = await this.cartService.createCart(newProduct);
          return res.status(200).json(carts)
        }
        const existingProductIndex = carts.findIndex(
          (product) => product.productId == newProduct.productId
        );
        
          
        if (existingProductIndex !== -1) {
          newProduct.quantity += carts[existingProductIndex].quantity  ;
          carts = await this.cartService.updateCart({cartId:carts[existingProductIndex].cartId},newProduct)
        } else {
          carts = await this.cartService.createCart(newProduct);
        }
        return res.status(200).json(carts)
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
    }

    deleteCart = async (req: Request, res: Response) => {
      const cartId = req.query.cartId;
      
      try {
        const message = await this.cartService.deleteCart(cartId);
        return res.status(200).json(message);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
}

export default new CartController();
declare class CartService {
    private cartRepository;
    constructor();
    getCart: (userId: any) => Promise<any>;
    createCart: (cartData: any) => Promise<any>;
    updateCart: (cartId: any, cartData: any) => Promise<any>;
    deleteCart: (cartId: any) => Promise<string>;
}
declare const _default: CartService;
export default _default;

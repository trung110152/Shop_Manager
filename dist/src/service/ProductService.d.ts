declare class ProductService {
    private productRepository;
    constructor();
    getProductList: () => Promise<any>;
    createProduct: (productData: Object) => Promise<any>;
    editProduct: (productId: any, productData: any) => Promise<string>;
    deleteProduct: (productId: any) => Promise<string>;
}
declare const _default: ProductService;
export default _default;

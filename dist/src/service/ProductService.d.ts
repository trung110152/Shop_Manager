declare class ProductService {
    private productRepository;
    constructor();
    getProductList: () => Promise<any>;
    createProduct: (productData: Object) => Promise<any>;
    editProduct: (productId: any, productData: any) => Promise<string>;
    deleteProduct: (productId: any) => Promise<string>;
    findOneByID: (productId: any) => Promise<any>;
    findByConditions: (productName: any, categoryId: any) => Promise<any>;
    findByPrice: (min: any, max: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;

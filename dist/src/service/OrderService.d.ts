declare class OrderService {
    private orderRepository;
    private orderDetailRepository;
    constructor();
    getOrders: (userId: any) => Promise<any>;
    createOrder: (orderData: any) => Promise<any>;
    createOrderDetail: (orderDetailData: any) => Promise<string>;
    checkOrderDetailData: (arr: any) => any;
}
declare const _default: OrderService;
export default _default;

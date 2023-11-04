declare class OrderService {
    private orderRepository;
    private orderDetailRepository;
    constructor();
    createOrder: (orderData: any) => Promise<any>;
    createOrderDetail: (orderDetailData: any) => Promise<string>;
}
declare const _default: OrderService;
export default _default;

declare class CategoryService {
    private categoryRepository;
    constructor();
    getCategories: () => Promise<any>;
    createCategory: (categoryData: any) => Promise<any>;
}
declare const _default: CategoryService;
export default _default;

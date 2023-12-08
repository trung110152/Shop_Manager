declare class UserService {
    private userRepository;
    constructor();
    register: (user: any) => Promise<any>;
    getAll: () => Promise<any>;
    checkUser: (user: any) => Promise<"Username is not existed" | "Password is wrong" | {
        userId: any;
        userName: any;
        birthDay: any;
        email: any;
        phone: any;
        address: any;
        role: any;
        token: any;
    }>;
    save: (user: any) => Promise<any>;
    findById: (userId: any) => Promise<any>;
    update: (userId: any, newUser: any) => Promise<{
        userId: any;
        userName: any;
        birthDay: any;
        email: any;
        phone: any;
        address: any;
        role: any;
        token: any;
    }>;
    changePw: (userId: any, newPw: any) => Promise<string>;
}
declare const _default: UserService;
export default _default;

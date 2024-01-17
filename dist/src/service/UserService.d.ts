declare class UserService {
    private userRepository;
    private otpRepository;
    constructor();
    register: ({ user, otp }: {
        user: any;
        otp: any;
    }) => Promise<any>;
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
    findByUsername: (userName: any) => Promise<any>;
    findByEmail: ({ email }: {
        email: any;
    }) => Promise<any>;
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
    findOTP: (otp: any) => Promise<boolean>;
    mailSender: ({ email, otp }: {
        email: any;
        otp: any;
    }) => Promise<any>;
}
declare const _default: UserService;
export default _default;

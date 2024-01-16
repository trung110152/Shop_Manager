import { Request, Response } from "express";
declare class UserController {
    private userService;
    constructor();
    getUser: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
    editUserInfo: (req: Request, res: Response) => Promise<void>;
    changePw: (req: Request, res: Response) => Promise<void>;
    sendOTP: (req: any, res: any) => Promise<any>;
}
declare const _default: UserController;
export default _default;

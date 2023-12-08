import {Request, Response} from "express";
import userService from "../service/UserService";


class UserController {
    private userService;

    constructor() {
        this.userService = userService;
    }

    getUser = async (req: Request, res: Response) => {
        try{
            let users = await userService.getAll();
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    login = async (req: Request, res: Response)=>{
        let response = await this.userService.checkUser(req.body);
        res.status(200).json(response)
    }

    register = async (req: Request, res: Response) => {
        let user = await this.userService.register(req.body);
        res.status(201).json(user);
    }

    editUserInfo = async (req: Request, res: Response) => {
        const newUser = req.body;
        const userId = req.body.userId;
        try {
            const resp = await userService.update(userId,newUser);
            res.status(200).json(resp)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    changePw = async (req: Request, res: Response) => {
        const newPw = req.body.password;
        const userId = req.body.userId;
        try {
            const resp = await userService.changePw(userId,newPw);
            res.status(200).json(resp)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

}

export default new UserController();
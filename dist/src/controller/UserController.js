"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
class UserController {
    constructor() {
        this.getUser = async (req, res) => {
            try {
                let users = await UserService_1.default.getAll();
                res.status(200).json(users);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.login = async (req, res) => {
            let response = await this.userService.checkUser(req.body);
            res.status(200).json(response);
        };
        this.register = async (req, res) => {
            let user = await this.userService.register(req.body);
            res.status(201).json(user);
        };
        this.editUserInfo = async (req, res) => {
            const newUser = req.body;
            const userId = req.body.userId;
            try {
                const resp = await UserService_1.default.update(userId, newUser);
                res.status(200).json(resp);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.changePw = async (req, res) => {
            const newPw = req.body.password;
            const userId = req.body.userId;
            try {
                const resp = await UserService_1.default.changePw(userId, newPw);
                res.status(200).json(resp);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.userService = UserService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const otp_generator_1 = __importDefault(require("otp-generator"));
class UserController {
    constructor() {
        this.checkUsernameExist = async (req, res) => {
            try {
                const result = await UserService_1.default.findByUsername(req.body);
                if (result) {
                    return res.status(200).json("Username is existed");
                }
                return res.status(200).json("Username is valid");
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
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
        this.sendOTP = async (req, res) => {
            try {
                const { email } = req.body;
                var otp = otp_generator_1.default.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                const result = await UserService_1.default.findOTP({ otp: otp });
                while (result == true) {
                    otp = otp_generator_1.default.generate(6, {
                        upperCaseAlphabets: false,
                    });
                }
                const otpPayload = { email, otp };
                const otpBody = await UserService_1.default.mailSender(otpPayload);
                if (!otpBody) {
                    return res.status(500).json({ success: false, error: 'Interal Server' });
                }
                res.status(200).json({
                    success: true,
                    message: `OTP Sent Successfully`,
                    otp,
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.userService = UserService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map
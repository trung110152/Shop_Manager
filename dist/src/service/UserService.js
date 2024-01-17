"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const OTP_1 = require("../model/OTP");
class UserService {
    constructor() {
        this.register = async ({ user, otp }) => {
            let userCheck = await this.userRepository.findOneBy({ userName: user.userName });
            if (userCheck) {
                return 'Username registered';
            }
            const getOTP = await this.otpRepository.find({ email: user.email });
            if (getOTP[getOTP.length - 1].otp !== otp) {
                return 'OTP code is incorrect';
            }
            user.password = await bcrypt_1.default.hash(user.password, 10);
            return this.userRepository.save(user);
        };
        this.getAll = async () => {
            let users = await this.userRepository.find();
            return users;
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ userName: user.userName });
            if (!userCheck) {
                return 'Username is not existed';
            }
            let comparePassword = await bcrypt_1.default.compare(user.password, userCheck.password);
            if (!comparePassword) {
                return 'Password is wrong';
            }
            else {
                let payload = {
                    userId: userCheck.userId,
                    userName: userCheck.userName,
                    role: userCheck.role,
                };
                let secret = '123456';
                let check = {
                    userId: userCheck.userId,
                    userName: userCheck.userName,
                    birthDay: userCheck.birthDay,
                    email: userCheck.email,
                    phone: userCheck.phone,
                    address: userCheck.address,
                    role: userCheck.role,
                    token: await jsonwebtoken_1.default.sign(payload, secret, {
                        expiresIn: 360000
                    })
                };
                return check;
            }
        };
        this.save = async (user) => {
            return this.userRepository.save(user);
        };
        this.findById = async (userId) => {
            let user = await this.userRepository.findOneBy({ userId: userId });
            if (!user) {
                return null;
            }
            return user;
        };
        this.findByUsername = async (userName) => {
            const user = await this.userRepository.findOneBy(userName);
            if (!user) {
                return null;
            }
            return user;
        };
        this.findByEmail = async ({ email }) => {
            let user = await this.userRepository.findOneBy(email);
            if (!user) {
                return null;
            }
            return user;
        };
        this.update = async (userId, newUser) => {
            try {
                await this.userRepository.update(userId, newUser);
                const result = await this.userRepository.findOneBy({ userId: userId });
                const payload = {
                    userId: result.userId,
                    userName: result.userName,
                    role: result.role,
                };
                const secret = '123456';
                const resp = {
                    userId: result.userId,
                    userName: result.userName,
                    birthDay: result.birthDay,
                    email: result.email,
                    phone: result.phone,
                    address: result.address,
                    role: result.role,
                    token: await jsonwebtoken_1.default.sign(payload, secret, {
                        expiresIn: 360000
                    })
                };
                return resp;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.changePw = async (userId, newPw) => {
            try {
                const password = await bcrypt_1.default.hash(newPw, 10);
                const resp = await this.userRepository.update(userId, { password: password });
                if (resp.affected === 1) {
                    return "Đổi mật khẩu thành công";
                }
                throw new Error("Đổi mật khẩu thất bại");
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.findOTP = async (otp) => {
            let result = await this.otpRepository.findOneBy(otp);
            if (!result) {
                return false;
            }
            return true;
        };
        this.mailSender = async ({ email, otp }) => {
            try {
                let transporter = await nodemailer_1.default.createTransport({
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'trung110152@gmail.com',
                        pass: 'giho zhrr sghw eakr'
                    }
                });
                let info = await transporter.sendMail({
                    from: 'trung110152@gmail.com',
                    to: `${email}`,
                    subject: "Email xác minh từ Shop NgoNam",
                    html: `<h1>Vui lòng xác nhận OTP của bạn </h1>
                <p> Đây là mã OTP của bạn :-> ${otp} </p>
               `,
                });
                if (!info) {
                    return null;
                }
                await this.otpRepository.save({ email, otp });
                return info;
            }
            catch (error) {
                return error.message;
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.otpRepository = data_source_1.AppDataSource.getRepository(OTP_1.OTP);
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map
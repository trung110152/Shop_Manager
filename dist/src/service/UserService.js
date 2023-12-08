"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.register = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ userName: user.userName });
            if (!userCheck) {
                user.password = await bcrypt_1.default.hash(user.password, 10);
                return this.userRepository.save(user);
            }
            return 'Username registered';
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
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map
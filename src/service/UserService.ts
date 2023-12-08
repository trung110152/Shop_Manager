
import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    register = async (user) =>{
        let userCheck = await this.userRepository.findOneBy({userName: user.userName})
        if (!userCheck) {
            user.password = await bcrypt.hash(user.password,10);
            return this.userRepository.save(user);
        }
        return 'Username registered';
    }

    getAll = async () => {
        let users = await this.userRepository.find();
        return users;
    }

    checkUser = async (user)=> {
        let userCheck = await this.userRepository.findOneBy({userName : user.userName} );
        if (!userCheck){
            return 'Username is not existed';
        }
        let comparePassword = await bcrypt.compare(user.password, userCheck.password);
        if(!comparePassword){
            return 'Password is wrong';
        } else {
            let payload = {
                userId: userCheck.userId,
                userName: userCheck.userName,
                role: userCheck.role,
            }
            let secret = '123456';
            let check ={
                userId: userCheck.userId,
                userName: userCheck.userName,
                birthDay: userCheck.birthDay,
                email: userCheck.email,
                phone: userCheck.phone,
                address: userCheck.address,
                role: userCheck.role,
                token: await jwt.sign(payload, secret, {
                    expiresIn: 360000
                })
            }
            return check

        }
    }

    save = async (user) => {
        return  this.userRepository.save(user);
    }


    findById = async (userId)=> {
        let user = await this.userRepository.findOneBy({userId:userId});
        if(!user){
            return null;
        }
        return user;
    }

    update = async (userId, newUser)=> {
        try {
            await this.userRepository.update(userId, newUser);
            const result = await this.userRepository.findOneBy({userId:userId});
            
            const payload = {
                userId: result.userId,
                userName: result.userName,
                role: result.role,
            }
            const secret = '123456';
            const resp ={
                userId: result.userId,
                userName: result.userName,
                birthDay: result.birthDay,
                email: result.email,
                phone: result.phone,
                address: result.address,
                role: result.role,
                token: await jwt.sign(payload, secret, {
                    expiresIn: 360000
                })
            };
            return resp
        } catch (error) {
            throw new Error(error.message)
        }
    }

    changePw = async (userId, newPw) => {
        try {
            const password = await bcrypt.hash(newPw,10)
            const resp = await this.userRepository.update(userId, {password: password});
            if(resp.affected === 1){
               return "Đổi mật khẩu thành công"; 
            }
            throw new Error("Đổi mật khẩu thất bại")
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default new UserService();
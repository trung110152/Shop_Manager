import {Router} from "express";
import userController from "../controller/UserController";

export const userRouter = Router();
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.get('/', userController.getUser);
userRouter.put('/', userController.editUserInfo);
userRouter.put('/changePw', userController.changePw);
userRouter.post('/sendOTP', userController.sendOTP);
userRouter.post('/checkUsernameExist', userController.checkUsernameExist)
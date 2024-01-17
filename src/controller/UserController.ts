import {Request, Response} from "express";
import userService from "../service/UserService";
import otpGenerator from "otp-generator";


class UserController {
    private userService;

    constructor() {
        this.userService = userService;
    }

    checkUsernameExist = async (req: Request, res: Response) => {
        try{
            const result = await userService.findByUsername( req.body );
            if(result){
                return res.status(200).json("Username is existed")
            }
            return res.status(200).json("Username is valid")
        } catch (e) {
            res.status(500).json(e.message)
        }
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

    sendOTP = async ( req, res ) => {
        try {
            const { email } = req.body;
    
            // Check if user is already present
            // Find user with provided email
            // const checkUserPresent = await userService.findByEmail({ email });
            // // to be used in case of signup
    
            // // If user found with provided email
            // if (checkUserPresent) {
            //     // Return 401 Unauthorized status code with error message
            //     return res.status(401).json({
            //         success: false,
            //         message: `User is Already Registered`,
            //     });
            // }
    
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            const result = await userService.findOTP({ otp: otp });
            // console.log("Result is Generate OTP Func");
            // console.log("OTP", otp);
            // console.log("Result", result);
            while (result == true ) {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                });
            }
            const otpPayload = { email, otp };
            const otpBody = await userService.mailSender( otpPayload );
            // console.log("OTP Body", otpBody);
            if( !otpBody ){
                return res.status(500).json({ success: false, error: 'Interal Server' });
            }
            
            res.status(200).json({
                success: true,
                message: `OTP Sent Successfully`,
                otp,
            });
        } catch (error) {
            // console.log(error.message);
            return res.status(500).json({ 
                success: false, 
                error: error.message });
        }
    };

}

export default new UserController();
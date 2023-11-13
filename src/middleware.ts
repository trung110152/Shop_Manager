import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
declare module 'express' {
    interface Request {
        userId?: number; // hoặc kiểu dữ liệu phù hợp với userId
    }
}

exports.checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["access-token"];
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    jwt.verify(token, process.env.NODE_SERCET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.userId = decoded.data.userId;
        next();
    });
};
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.checkToken = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    jsonwebtoken_1.default.verify(token, process.env.NODE_SERCET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.userId = decoded.data.userId;
        next();
    });
};
//# sourceMappingURL=middleware.js.map
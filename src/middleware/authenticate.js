import jwt from 'jsonwebtoken';
import logger from '../config/logger/logger-config.js';
import dotenv from 'dotenv';
import UserService from '../service/user-service.js';
import User from '../model/User.js';
dotenv.config();
class Authentication{
    constructor(){
        this.userModel = User;
        this.jwt = jwt;
        this.userService = new UserService();
    }
    verifyToken = async(error,req, res, next) => {
        logger.info("Verifying token");
        const authHeader = await req.headers.authorization.trim();
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            logger.info("SECRET: " + process.env.JWT_SECRET);
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    throw new InvalidTokenException("Invalid token");
                }
                this.verifyRole(req, res, next);
                req.user = user;
                req.token = token;
                logger.info("User authenticated");
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
    generateToken = async (user) => {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_TIME
        });
        return token;
    }

    verifyRole = async (req, res, next) => {
        const token = await req.headers.authorization.split(" ")[1];
        const user = this.userService.getUserByToken(token);
        logger.info("User role1: " + user.role);
        const areValidRoles = user.role === "ADMIN" 
        || user.role === "USER" || user.role === "SUPER_ADMIN" ||
        user.role === "OPERATOR" || user.role === "JUDGE";

        if (areValidRoles) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    }

    verifyAdmin = async (req, res, next) => {
        const token = await req.headers.authorization.split(" ")[1];
        const user = await this.userService.getUserByToken(token);
        if (user) {
        const areValidRoles = user.role === "ADMIN" 
        || user.role === "SUPER_ADMIN";
        if (areValidRoles) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    } else {
        res.status(403).json({ message: "User with the token not found" });
    }
    }

    verifyUserRole = async (req, res, next) => {
        const user = await req.user;
        logger.info("User role: " + user.role);
        const areValidRoles = user.role === "USER";

        if (areValidRoles) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    }

    verifyOperator = async (req, res, next) => {
        const user = await req.user;
        logger.info("User role: " + user.role);
        const areValidRoles = user.role === "OPERATOR";

        if (areValidRoles) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    }

    verifyJudge = async (req, res, next) => {
        const user = await req.user;
        logger.info("User role: " + user.role);
        const areValidRoles = user.role === "JUDGE";

        if (areValidRoles) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    }

    verifySuperAdmin = async (req, res, next) => {
        const user = await req.user;
        logger.info("User role: " + user.role);
        const areValidRoles = user.role === "SUPER_ADMIN";

        if (areValidRoles) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    }

    decodeToken = async (token) => {
        const decoded = this.jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }

}

export default Authentication;
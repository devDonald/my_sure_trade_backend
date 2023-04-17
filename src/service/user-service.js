import bcrypt from 'bcrypt';
import User from '../model/User.js';
import UserExistException from '../exception/UserExistException.js';
import UserNotFoundException from '../exception/UserNotFoundException.js';
import jwt from 'jsonwebtoken';
import logger from '../config/logger/logger-config.js';
import dotenv from 'dotenv';
import InvalidCredentialsException from "../exception/InvalidCredentials.js";

dotenv.config();

class UserService {
    constructor() {
        this.userModel = User;
    }

    getUserById = async (id) => {
        const user = await this.userModel.findOne({where: {id: id}});
        if (!user) {
            throw new UserNotFoundException('User not found');
        }
        return user;
    };
    getUserByEmail = async (email) => {
        return this.userModel.findOne({where: {email: email}});
    };
    createUser = async (user) => {
        const existingUser = await this.getUserByEmail(user.email);
        if (existingUser) {
            throw new UserExistException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return await this.userModel.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            phone: user.phone,
            role: "USER",
            isVerified: false,
            isActive: true,
            isSuspended: false,
            createdAt: new Date(),
        });
    };
    createAdmin = async (user) => {
        const existingUser = await this.getUserByEmail(user.email);
        if (existingUser) {
            throw new UserExistException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const mappedFields = await this.mapFieldsForUpdate(user);
        mappedFields.password = hashedPassword;
        return await this.userModel.create(mappedFields);
    };

    updateUser = async (userId, user) => {
        logger.info('Updating user: ' + userId + ' with data: ' + user + '');
        const existingUser = await this.getUserById(userId);
        if (!existingUser) {
            throw new UserNotFoundException('User does not exist');
        }
        const mappedFields = await this.mapFieldsForUpdate(user);
        return await this.userModel.update(mappedFields, {
            where: {
                id: userId,
            },
        });
    };
    deleteUser = async (id) => {
        return this.userModel.destroy({where: {id: id}});
    };
    getAllUsers = async () => {
        return this.userModel.findAll();
    };
    login = async (email, password) => {
        const existingUser = await this.getUserByEmail(email);
        if (!existingUser) {
            throw new UserNotFoundException('User does not exist');
        }
        const passwordIsValid = await bcrypt.compare(password, existingUser.password);
        if (!passwordIsValid) {
            throw new InvalidCredentialsException('Invalid credentials');
        }
        const {
            JWT_SECRET,
            JWT_EXPIRATION_TIME,
            JWT_ALGORITHM,
        } = process.env;
        existingUser.token = jwt.sign({
            email: existingUser.email,
            id: existingUser.id,
            role: existingUser.role,
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME,
            algorithm: JWT_ALGORITHM,
        });
        await existingUser.save();
        return existingUser;
    };
    logout = async (token) => {
        const user = await this.getUserByToken(token);
        if (!user) {
            throw new UserNotFoundException('User does not exist');
        }
        logger.info('User logged out');
        user.token = null;
        await user.save();
    };

    getUserByToken = async (token) => {
        return this.userModel.findOne({where: {token: token}});
    }

    mapFieldsForUpdate = async (userDetails) => {
        const user = {};
        if (userDetails.firstName) {
            user.firstName = userDetails.firstName;
        }
        if (userDetails.lastName) {
            user.lastName = userDetails.lastName;
        }
        if (userDetails.email) {
            user.email = userDetails.email;
        }
        if (userDetails.phone) {
            user.phone = userDetails.phone;
        }
        if (userDetails.wallerAddress) {
            user.wallerAddress = userDetails.wallerAddress;
        }
        if (userDetails.address) {
            user.address = userDetails.address;
        }
        if (userDetails.city) {
            user.city = userDetails.city;
        }
        if (userDetails.state) {
            user.state = userDetails.state;
        }
        if (userDetails.country) {
            user.country = userDetails.country;
        }
        if (userDetails.role) {
            user.role = userDetails.role;
        }
        if (userDetails.isVerified) {
            user.isVerified = userDetails.isVerified;
        }
        if (userDetails.isActive) {
            user.isActive = userDetails.isActive;
        }
        if (userDetails.isSuspended) {
            user.isSuspended = userDetails.isSuspended;
        }
        return user;

    }
}

export default UserService;

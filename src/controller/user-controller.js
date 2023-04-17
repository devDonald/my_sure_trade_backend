import UserService from "../service/user-service.js";
import logger from "../config/logger/logger-config.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json({
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const savedUser = await this.userService.createUser(req.body);
      res.status(201).json(
        {
          message: "User created successfully",
          data: savedUser
        }
      );
    } catch (error) {
      next(error);
    }
  };

  createAdmin = async (req, res, next) => {
    try {
      const savedUser = await this.userService.createAdmin(req.body);
      res.status(201).json(
        {
          message: "Admin created successfully",
          data: savedUser
        }
      );
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const userId = await req.params.id;
      const userDetails = await req.body;
      const user = await this.userService.updateUser(userId, userDetails);
      res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      // const user = await this.userModel.deleteUser(req.params.id);
      res.status(200).json(null);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const user = await this.userService.login(
        req.body.email,
        req.body.password
      );
      res.status(200).json({
        message: "Login successful",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      const token = await req.headers.authorization.split(" ")[1];
      logger.info("Token: " + token);
      await this.userService.logout(token);
      res.status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req, res, next) => {
    try {
      // const user = await this.userModel.refresh(req.body);
      res.status(200).json(null);
    } catch (error) {
      next(error);
    }
  };

  getLoggedInUser = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      return await this.userService.getUserByToken(token);
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;

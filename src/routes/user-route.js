import express from "express";
import UserController from "../controller/user-controller.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import options from "../config/swagger/swagger-config.js";
import Authentication from "../middleware/authenticate.js";




class UserRoute {
  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.specs = swaggerJsdoc(options);
    this.auth = new Authentication()
  }

 

  routes = async ()=>{
    const {
      verifyToken,
      verifyRole,
      verifyAdmin
    } = this.auth;
    this.router.use("/",swaggerUi.serve);
    this.router.get("/api-docs",swaggerUi.setup(this.specs,
      {
        explorer: true,
      }
      ));
    this.router.get('/',[verifyToken], this.userController.getAllUsers);
    this.router.get('/:id',[verifyToken], this.userController.getUserById);
    this.router.post('/', this.userController.createUser);
    this.router.post('/add-admin',[verifyToken,verifyAdmin], this.userController.createAdmin);
    this.router.put('/:id',[verifyToken], this.userController.updateUser);
    this.router.delete('/:id', this.userController.deleteUser);
    this.router.post('/login', this.userController.login);
    this.router.post('/logout', [verifyToken], this.userController.logout);
    this.router.post('/refresh', this.userController.refresh);
    return this.router;
  }
}
export default UserRoute;
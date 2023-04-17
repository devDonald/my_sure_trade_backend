import BankDetailService from "../service/bankdetail-service.js";
import UserService from "../service/user-service.js";
import logger from "../config/logger/logger-config.js";
import UserController from "./user-controller.js";

class BankDetailController{
    constructor() {
        this.bankDetailService = new BankDetailService();
        this.userService = new UserService();
        this.userController = new UserController();
    }

    addBankDetail = async (req, res, next) => {
        try {

            const user = await this.userController.getLoggedInUser(req, res, next);
            req.body.userId = user.id;
            const bankDetail = await this.bankDetailService.addBankDetails(req.body);
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }

    getBankDetailById = async (req, res, next) => {
        try {
            const bankDetail = await this.bankDetailService.getBankDetailsById(req.params.id);
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }

    getBankDetailByUserId = async (req, res, next) => {
        try {
            const bankDetail = await this.bankDetailService.getBankDetailsByUserId(req.params.userId);
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }

    updateBankDetail = async (req, res, next) => {
        try {

            const user = await this.userController.getLoggedInUser(req, res, next);
            req.body.userId = user.id;
            const bankDetail = await this.bankDetailService.updateBankDetails(req.params.id, req.body);
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }

    deleteBankDetail = async (req, res, next) => {
        try {
            const bankDetail = await this.bankDetailService.deleteBankDetails(req.params.id);
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }

    deleteBankDetailByAccountNumber = async (req, res, next) => {
        try {
            const bankDetail = await this.bankDetailService.deleteBankDetailsByAccountNumber(req.params.accountNumber);
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }

    getAllBankDetails = async (req, res, next) => {
        try {
            const bankDetail = await this.bankDetailService.getAllBankDetails();
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }

    getBankDetailsByUserId = async (req, res, next) => {
        try {
            const bankDetail = await this.bankDetailService.getBankDetailsByUserId(req.params.userId);
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }

    getBankDetailsByAccountNumber = async (req, res, next) => {
        try {
            const bankDetail = await this.bankDetailService.getBankDetailsByAccountNumber(req.params.accountNumber);
            res.status(200).json(bankDetail);
        } catch (e) {
            next(e);
        }
    }
}
export default BankDetailController;
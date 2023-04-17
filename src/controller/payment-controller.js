import PaymentService from "../service/payment-service.js";
import UserController from "./user-controller.js";

class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
        this.userController = new UserController();
    }

    addPayment = async (req, res, next) => {
        try {
            const {body} = req;
            const user = await this.userController.getLoggedInUser(req, res, next);
            body.userId = user.id;
            const payment = await this.paymentService.addPayment(body);

            res.status(201).json(payment);
        } catch (e) {
            next(e);
        }
    }

    getAllPayments = async (req, res, next) => {
        try {
            const payments = await this.paymentService.getAllPayments();
            res.status(200).json(payments);
        } catch (e) {
            next(e);
        }
    }

    getPaymentById = async (req, res, next) => {
        try {
            const payment = await this.paymentService.getPaymentById(req.params.id);
            res.status(200).json(payment);
        } catch (e) {
            next(e);
        }
    }

    getPaymentByUserId = async (req, res, next) => {
        try {
            const payment = await this.paymentService.getPaymentByUserId(req.params.id);
            res.status(200).json(payment);
        } catch (e) {
            next(e);
        }
    }


    updatePayment = async (req, res, next) => {
        try {
            const payment = await this.paymentService.updatePayment(req.params.id, req.body);
            res.status(200).json(payment);
        } catch (e) {
            next(e);
        }
    }

    deletePayment = async (req, res, next) => {
        try {
            const payment = await this.paymentService.deletePayment(req.params.id);
            res.status(200).json(payment);
        } catch (e) {
            next(e);
        }
    }



    getPaymentByPaymentReference = async (req, res, next) => {
        try {
            const payment = await this.paymentService.getPaymentByPaymentReference(req.params.paymentReference);
            res.status(200).json(payment);
        } catch (e) {
            next(e);
        }
    }

}
export default PaymentController;
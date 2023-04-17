import PaymentController from "../controller/payment-controller.js";
import express from "express";

class PaymentRoutes{
    constructor(app, db){
        this.paymentController = new PaymentController();
        this.paymentRouter = express.Router();
    }

    routes = async () => {
        this.paymentRouter.get("/", this.paymentController.getAllPayments);
        this.paymentRouter.get("/:id", this.paymentController.getPaymentById);
        this.paymentRouter.get("/user/:id", this.paymentController.getPaymentByUserId);
        this.paymentRouter.post("/", this.paymentController.addPayment);
        this.paymentRouter.put("/:id", this.paymentController.updatePayment);
        this.paymentRouter.delete("/:id", this.paymentController.deletePayment);
        return this.paymentRouter;
    }
}
export default PaymentRoutes;
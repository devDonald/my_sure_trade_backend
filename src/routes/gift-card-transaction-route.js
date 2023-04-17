import GiftCardTransactionController from "../controller/gift-card-transaction-controller.js";
import express from "express";

class GiftCardTransactionRoute{
    constructor(){
        this.giftCardTransactionController = new GiftCardTransactionController();
        this.transactionRouter = express.Router();
    }

    routes = () => {
        this.transactionRouter.post("/", this.giftCardTransactionController.addTransaction);
        this.transactionRouter.get("/:id", this.giftCardTransactionController.getTransactionById);
        this.transactionRouter.get("/", this.giftCardTransactionController.getTransactions);
        this.transactionRouter.put("/:id", this.giftCardTransactionController.updateTransaction);
        this.transactionRouter.delete("/:id", this.giftCardTransactionController.deleteTransaction);
        this.transactionRouter.get("/user/:id", this.giftCardTransactionController.getTransactionsByUserId);
        this.transactionRouter.get("/user/:id/status/:status", this.giftCardTransactionController.getTransactionsByUserIdAndStatus);
        this.transactionRouter.get("/user/:id/merchant/:merchantId", this.giftCardTransactionController.getTransactionsByUserIdAndMerchantId);
        this.transactionRouter.get("/merchant/:id", this.giftCardTransactionController.getTransactionsByMerchantId);
        this.transactionRouter.get("/gift-card/:id", this.giftCardTransactionController.getTransactionsByGiftCardId);
        this.transactionRouter.get("/merchant/:id", this.giftCardTransactionController.getTransactionsByMerchantId);
        return this.transactionRouter;
    }
}
export default GiftCardTransactionRoute;
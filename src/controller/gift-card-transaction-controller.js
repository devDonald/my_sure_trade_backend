import Authentication from "../middleware/authenticate.js";
import GiftCardTransactionService from "../service/gift-card-transaction-service.js";
import UserController from "./user-controller.js";

class GiftCardTransactionController{
    constructor(){
        this.giftCardTransactionService = new GiftCardTransactionService();
        this.userController = new UserController();
    }

    addTransaction = async (req, res, next) => {
        try {
            const { body } = await req;
            const user = await this.userController.getLoggedInUser(req, res, next);
            body.userId = user.id;
            const transaction = await this.giftCardTransactionService.addTransaction(body);
            res.status(201).json({
                message: "Transaction created successfully",
                data: transaction
            });
        } catch (error) {
            next(error)
        }
    }

    getTransactionById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const transaction = await this.giftCardTransactionService.getTransactionById(id);
            res.json(transaction);
        } catch (error) {
            next(error)
        }
    }

    getTransactions = async (req, res, next) => {
        try {
            const transactions = await this.giftCardTransactionService.getAllTransactions();
            res.json(transactions);
        } catch (error) {
            next(error)
        }
    }

    updateTransaction = async (req, res, next) => {
        try {
            const { body } = await req;
            const { id } = req.params;
            const transaction = await this.giftCardTransactionService.updateTransaction(id, body);
            res.json(transaction);
        } catch (error) {
            next(error)
        }
    }

    deleteTransaction = async (req, res, next) => {
        try {
            const { id } = req.params;
            const transaction = await this.giftCardTransactionService.deleteTransaction(id);
            res.json(transaction);
        } catch (error) {
            next(error)
        }
    }

    getTransactionsByGiftCardId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const transactions = await this.giftCardTransactionService.getTransactionsByGiftCardId(id);
            res.json(transactions);
        } catch (error) {
            next(error)
        }
    }

    getTransactionsByUserId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const transactions = await this.giftCardTransactionService.getTransactionsByUserId(id);
            res.json(transactions);
        } catch (error) {
            next(error)
        }
    }

    getTransactionsByMerchantId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const transactions = await this.giftCardTransactionService.getTransactionsByMerchantId(id);
            res.json(transactions);
        } catch (error) {
            next(error)
        }
    }

    getTransactionsByUserIdAndMerchantId = async (req, res, next) => {
        try {
            const { userId, merchantId } = req.params;
            const transactions = await this.giftCardTransactionService.getTransactionsByUserIdAndMerchantId(userId, merchantId);
            res.json(transactions);
        } catch (error) {
            next(error)
        }
    }

    getTransactionsByUserIdAndStatus = async (req, res, next) => {
        try {
            const { userId, status } = req.params;
            const transactions = await this.giftCardTransactionService.getTransactionsByUserIdAndStatus(userId, status);
            res.statusCode = 200;
            res.json(transactions);
        } catch (error) {
            next(error)
        }
    }

}
export default GiftCardTransactionController;
import GiftCardTransaction from "../model/GiftCardTransaction.js";
import TransactionExistAlready from "../exception/TransactionExistAlready.js";
import TransactionNotFound from "../exception/TransactionNotFound.js";
import GiftCardService from "./gift-card-service.js";
import UserService from "./user-service.js";

class GiftCardTransactionService {
    constructor() {
        this.giftCardTransactionModel = GiftCardTransaction;
        this.giftCardService = new GiftCardService();
        this.userService = new UserService();
    }

    addTransaction = async (transaction) => {
        const existingTransaction = await this.giftCardTransactionModel.findOne({
            where: {
                giftCardId: transaction.giftCardId,
                userId: transaction.userId,
            }
        });
        if (existingTransaction) {
            throw new TransactionExistAlready("Transaction already exists");
        }
        const mappedTransaction = this.mapTransaction(transaction);
        mappedTransaction.status = "PROCESSING";
        mappedTransaction.createdAt = new Date();
        return await this.giftCardTransactionModel.create(mappedTransaction);

    }

    getTransactionById = async (id) => {

        const transaction = await this.giftCardTransactionModel.findByPk(id);
        if (!transaction)
            throw new TransactionNotFound("Transaction not found");
        return transaction;

    }

    getTransactionsByStatus = async (status) => {

        const transactions = await this.giftCardTransactionModel.findAll({
            where: {
                status: status
            }
        });
        if (!transactions)
            throw new TransactionNotFound("Transaction not found");

        return transactions;

    }

    getAllTransactions = async () => {

        return await this.giftCardTransactionModel.findAll();

    }

    updateTransaction = async (id, transaction) => {
        const existingTransaction = await this.giftCardTransactionModel.findByPk(id);
        if (!existingTransaction)
            throw new TransactionNotFound("Transaction not found");
        const mappedTransaction = this.mapTransaction(transaction);
        await this.giftCardTransactionModel.update(mappedTransaction, {
            where: {
                id: id
            }
        });
        return await this.giftCardTransactionModel.findByPk(id);
    }

    deleteTransaction = async (id) => {
        const existingTransaction = await this.giftCardTransactionModel.findByPk(id);
        if (!existingTransaction)
            throw new TransactionNotFound("Transaction not found");
        await this.giftCardTransactionModel.destroy({
            where: {
                id: id
            }
        });
        return existingTransaction;
    }

    getTransactionsByGiftCardId = async (id) => {

        const existingTransaction = await this.giftCardTransactionModel.findAll({
            where: {
                giftCardId: id
            }
        });
        if (!existingTransaction)
            throw new TransactionNotFound("Transaction not found");
        return existingTransaction;

    }

    getTransactionsByUserId = async (id) => {

        const existingTransaction = await this.giftCardTransactionModel.findAll({
            where: {
                userId: id
            }
        });
        if (!existingTransaction)
            throw new TransactionNotFound("Transaction not found");
        return existingTransaction;
    }
    getTransactionsByUserIdAndStatus = async (id, status) => {

        const existingTransaction = await this.giftCardTransactionModel.findAll({
            where: {
                userId: id,
                status: status
            }
        });
        if (!existingTransaction)
            throw new TransactionNotFound("Transaction not found");
        return existingTransaction;
    }

    mapTransaction = (transaction) => {
        const transactionDto = {};
        if (transaction.id) {
            transactionDto.id = transaction.id;
        }
        if (transaction.giftCardId) {
            transactionDto.giftCardId = transaction.giftCardId;
        }
        if (transaction.userId) {
            transactionDto.userId = transaction.userId;
        }
        if (transaction.merchantId) {
            transactionDto.merchantId = transaction.merchantId;
        }
        if (transaction.transactionType) {
            transactionDto.transactionType = transaction.transactionType;
        }
        if (transaction.giftCardRateId) {
            transactionDto.giftCardRateId = transaction.giftCardRateId;
        }
        if (transaction.amount) {
            transactionDto.amount = transaction.amount;
        }
        if (transaction.quantity) {
            transactionDto.quantity = transaction.quantity;
        }
        if (transaction.fee) {
            transactionDto.fee = transaction.fee;
        }
        if (transaction.currencyId) {
            transactionDto.currencyId = transaction.currencyId;
        }
        if (transaction.status) {
            transactionDto.status = transaction.status;
        }
        if (transaction.createdAt) {
            transactionDto.createdAt = transaction.createdAt;
        }
        if (transaction.updatedAt) {
            transactionDto.updatedAt = transaction.updatedAt;
        }
        return transactionDto;
    }

    getTransactionsByMerchantId = async (id) => {

            const existingTransaction = await this.giftCardTransactionModel.findAll({
                where: {
                    merchantId: id
                }
            });
            if (!existingTransaction)
                throw new TransactionNotFound("Transaction not found");
            return existingTransaction;
    }

    getTransactionsByUserIdAndMerchantId = async (userId, merchantId) => {

            const existingTransaction = await this.giftCardTransactionModel.findAll({
                where: {
                    userId: userId,
                    merchantId: merchantId
                }
            });
            if (!existingTransaction)
                throw new TransactionNotFound("Transaction not found");
            return existingTransaction;
    }
}
export default GiftCardTransactionService;
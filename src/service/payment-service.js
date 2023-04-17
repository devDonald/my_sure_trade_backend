import Payment from "../model/Payment.js";
import PaymentNotFoundException from "../exception/PaymentNotFoundException.js";
import PaymentExistException from "../exception/PaymentExistException.js";
import moment from "moment";
import logger from "../config/logger/logger-config.js";

class PaymentService {
  constructor() {
    this.paymentModel = Payment;
  }
  addPayment = async (payment) => {
      const existingPayment = await this.paymentModel.findOne({
        where: {
            userId: payment.userId,
            paymentReference: payment.paymentReference
        }
      })
        if(existingPayment){
            throw new PaymentExistException("Payment already exists");
        }
        const paymentData = this.mapPayment(payment);
        paymentData.paymentStatus = "PAID";
        paymentData.paymentDate = moment(paymentData.paymentDate).format("YYYY-MM-DD");
        paymentData.createdAt = new Date();
        logger.info("Payment data: " + JSON.stringify(paymentData));

      return await this.paymentModel.create(paymentData);
  }
    updatePayment = async (id, payment) => {
        const paymentData = this.mapPayment(payment);
        return await this.paymentModel.update(paymentData, {
            where: {
                id: id
            }
        });
    }

    deletePayment = async (id) => {
        return await this.paymentModel.destroy({
            where: {
                id: id
            }
        });
    }

    getPaymentById = async (id) => {
        const payment =  await this.paymentModel.findByPk(id);
        if(!payment){
            throw new PaymentNotFoundException("Payment not found");
        }
        return payment;
    }

    getPaymentByUserId = async (userId) => {
        const payment =  await this.paymentModel.findAll({
            where: {
                userId: userId
            }
        });
        if(!payment){
            throw new PaymentNotFoundException("Payment not found");
        }
        return payment;
    }

    getPaymentByPaymentReference = async (paymentReference) => {
        const payment =  await this.paymentModel.findAll({
            where: {
                paymentReference: paymentReference
            }
        });
        if(!payment){
            throw new PaymentNotFoundException("Payment not found");
        }
        return payment;
    }
  mapPayment = (payment) => {
      const paymentData = {}
      if (payment.id) paymentData.id = payment.id
        if (payment.userId) paymentData.userId = payment.userId
        if (payment.amount) paymentData.amount = payment.amount
        if (payment.currency) paymentData.currency = payment.currency
        if (payment.paymentMethod) paymentData.paymentMethod = payment.paymentMethod
        if (payment.paymentStatus) paymentData.paymentStatus = payment.paymentStatus
        if (payment.paymentDate) paymentData.paymentDate = payment.paymentDate
        if (payment.paymentReference) paymentData.paymentReference = payment.paymentReference
        if (payment.paymentDescription) paymentData.paymentDescription = payment.paymentDescription
        if (payment.paymentType) paymentData.paymentType = payment.paymentType
        if (payment.createdAt) paymentData.createdAt = payment.createdAt
        if (payment.updatedAt) paymentData.updatedAt = payment.updatedAt
        return paymentData
  }

    getAllPayments = async () => {
        return await this.paymentModel.findAll();
    }
}
export default PaymentService;
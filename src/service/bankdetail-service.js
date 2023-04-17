import BankDetails from "../model/BankDetails.js";
import UserService from "./user-service.js";
import UserNotFoundException from "../exception/UserNotFoundException.js";
import BankDetailsNotFoundException from "../exception/BankDetailsNotFoundException.js";
import Authentication from "../middleware/authenticate.js";
import BankDetailsExistException from "../exception/BankDetailsExistException.js";
import {where} from "sequelize";

class BankDetailService{
    constructor() {
        this.bankDetailModel = BankDetails;
        this.userService = new UserService();
        this.auth = new Authentication();
    }

    addBankDetails = async (bankDetails) => {
        const existingBankDetail = await this.bankDetailModel.findOne({
            where: {
                accountNumber: bankDetails.accountNumber
            }
        });
        if (existingBankDetail) {
            throw new BankDetailsExistException('Bank details already exist');
        }
        const bankDetail = await this.mapBankDetails(bankDetails);
        return await this.bankDetailModel.create(bankDetail);
    }

    updateBankDetails = async (id, bankDetails) => {
        const existingBankDetail = await this.bankDetailModel.findOne({id: id, accountNumber: bankDetails.accountNumber});
        if (!existingBankDetail) {
            throw new BankDetailsNotFoundException('Bank details does not exist');
        }

        const user = await this.userService.getUserById(bankDetails.userId);
        if (!user) {
            throw new UserNotFoundException('User does not exist');
        }

        const bankDetail = await this.mapBankDetails(bankDetails);
        return this.bankDetailModel.update(bankDetail, {
            where: {
                id: existingBankDetail.id
            }
        });

    }

    deleteBankDetails = async (id) => {
        const existingBankDetails = await this.bankDetailModel.findOne({
            where: {
                id: id
            }
        });
        if (!existingBankDetails) {
            throw new BankDetailsNotFoundException('Bank details does not exist');
        }
        return this.bankDetailModel.destroy({
            where: {
                id: existingBankDetails.id
            }
        });
    }

    deleteBankDetailsByAccountNumber = async (accountNumber) => {
        const existingBankDetails = await this.bankDetailModel.findOne({accountNumber: accountNumber});
        if (!existingBankDetails) {
            throw new BankDetailsNotFoundException('Bank details does not exist');
        }
        return this.bankDetailModel.delete({_id: existingBankDetails._id});
    }

    getBankDetailsByUserId = async (userId) => {
        const existingBankDetails = await this.bankDetailModel.findAll({userId: userId});
        if (!existingBankDetails) {
            throw new BankDetailsNotFoundException('Bank details does not exist');
        }
        return existingBankDetails;
    }

    getBankDetailsByAccountNumber = async (accountNumber) => {
        const existingBankDetails = await this.bankDetailModel.findOne({accountNumber: accountNumber});
        if (!existingBankDetails) {
            throw new BankDetailsNotFoundException('Bank details does not exist');
        }
        return existingBankDetails;
    }

    getAllBankDetails = async () => {
        return await this.bankDetailModel.findAll();
    }
    getBankDetailsById = async (id) => {
        const existingBankDetails = await this.bankDetailModel.findByPk(id)
        if (!existingBankDetails) {
            throw new BankDetailsNotFoundException('Bank details does not exist');
        }
        return existingBankDetails;
    }
    mapBankDetails = async (bankDetails) => {
        const bankDetail = {};
        if (bankDetails.bankName) bankDetail.bankName = bankDetails.bankName;
        if (bankDetails.accountNumber) bankDetail.accountNumber = bankDetails.accountNumber;
        if (bankDetails.accountName) bankDetail.accountName = bankDetails.accountName;
        if (bankDetails.accountType) bankDetail.accountType = bankDetails.accountType;
        if (bankDetails.bankCode) bankDetail.bankCode = bankDetails.bankCode;
        if (bankDetails.bankAddress) bankDetail.bankAddress = bankDetails.bankAddress;
        if (bankDetails.bankCountry) bankDetail.bankCountry = bankDetails.bankCountry;
        if (bankDetails.userId) bankDetail.userId = bankDetails.userId;
        return bankDetail;
    }
}
export default BankDetailService;
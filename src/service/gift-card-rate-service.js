import GiftCardRate from "../model/GiftCardRate.js";
import UserService from "./user-service.js";
import UserNotFoundException from "../exception/UserNotFoundException.js";
import MerchantNotFoundException from "../exception/MerchantNotFoundException.js";
import GiftCardRateNotFoundException from "../exception/GiftCardRateNotFoundException.js";
import GiftCardRateExistException from "../exception/GiftCardRateExistException.js";

class GiftCardRateService {
  constructor() {
    this.giftCardRateModel = GiftCardRate;
    this.userService = new UserService();
  }

   addRate = async (merchantId, rate) => {
    const existingRate = await this.giftCardRateModel.findOne({
      where: {
        fromCurrency: rate.fromCurrency,
        toCurrency: rate.toCurrency,
        merchantId: merchantId,
      },
    });
    if (existingRate) {
        throw new GiftCardRateExistException("Gift card rate already exists");
    }
    const rateData = await this.mapRateFields(rate);
    rateData.createdAt = new Date();
    rateData.status = "NEW";
    rateData.screenshots = {
        urls: [],
    };
    rateData.merchantId = merchantId;

       return await this.giftCardRateModel.create(rateData);
    }

    getRateById = async (id) => {
        const rate = await this.giftCardRateModel.findOne({
            where: {
                id: id
            }
        });

        if (!rate) {
            throw new GiftCardRateNotFoundException("Gift card rate not found");
        }

        return rate;
    }

    getAllRates = async () => {
        return await this.giftCardRateModel.findAll();
    }

    updateRate = async (id, rate) => {
        const existingRate = await this.giftCardRateModel.findOne({
            where: {
                id: id
            }
        });

        if (!existingRate) {
            throw new GiftCardRateNotFoundException("Gift card rate not found");
        }
        const rateData = await this.mapRateFields(rate);
        rateData.updatedAt = new Date();
        return await this.giftCardRateModel.update(rateData, {
            where: {
                id: id
            }
        });
    }

    deleteRate = async (id) => {
        const existingRate = await this.giftCardRateModel.findOne({
            where: {
                id: id
            }
        });

        if (!existingRate) {
            throw new GiftCardRateNotFoundException("Gift card rate not found");
        }
        return await this.giftCardRateModel.destroy({
            where: {
                id: id
            }
        });
    }

    getRatesByMerchantId = async (merchantId) => {
        const merchant = await this.userService.getUserById(merchantId);
        if (!merchant) {
            throw new MerchantNotFoundException("Merchant not found");
        }
        return await this.giftCardRateModel.findAll({
            where: {
                merchantId: merchantId
            }
        });
    }

    getRatesByFromCurrency = async (fromCurrency) => {
        return await this.giftCardRateModel.findAll({
            where: {
                fromCurrency: fromCurrency
            }
        });
    }

    getRatesByToCurrency = async (toCurrency) => {
        return await this.giftCardRateModel.findAll({
            where: {
                toCurrency: toCurrency
            }
        });
    }

    getRatesByStatus = async (status) => {
        return await this.giftCardRateModel.findAll({
            where: {
                status: status
            }
        });
    }
    mapRateFields = async (rate) => {
      const rateDto = {}
        if (rate.rate) {
          rateDto.rate = rate.rate
        }

        if (rate.merchantId) {
            rateDto.merchantId = rate.merchantId
        }

        if (rate.fromCurrency) {
            rateDto.fromCurrency = rate.fromCurrency
        }

        if (rate.toCurrency) {
            rateDto.toCurrency = rate.toCurrency
        }

        if (rate.rate){
            rateDto.rate = rate.rate
        }

        if (rate.createdAt){
            rateDto.createdAt = rate.createdAt
        }

        if (rate.updatedAt){
            rateDto.updatedAt = rate.updatedAt
        }
        return rateDto;
    }
}
export default GiftCardRateService;
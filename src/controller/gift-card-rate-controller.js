import GiftCardRateService from "../service/gift-card-rate-service.js";
import UserController from "./user-controller.js";

class GiftCardRateController{
    constructor(){
        this.giftCardRateService = new GiftCardRateService();
        this.userController = new UserController();
    }

    addRate = async (req, res, next)=>{
        try{
            const { body } = await req;
            const merchant = await this.userController.getLoggedInUser(req, res, next);
            const giftCardRate = await this.giftCardRateService.addRate(merchant.id, body);
            res.status(200).json(giftCardRate);
        }catch(err){
            next(err);
        }
    }

    getRateById = async (req, res, next)=>{
        try{
            const { id } = await req.params;
            const giftCardRate = await this.giftCardRateService.getRateById(id);
            res.status(200).json(giftCardRate);
        }catch(err){
            next(err);
        }
    }

    getAllRates = async (req, res, next)=>{
        try{
            const giftCardRates = await this.giftCardRateService.getAllRates();
            res.status(200).json(giftCardRates);
        }catch(err){
            next(err);
        }
    }

    updateRate = async (req, res, next)=>{
        try{
            const { id } = await req.params;
            const { body } = await req;
            await this.userController.getLoggedInUser(req, res, next);
            const giftCardRate = await this.giftCardRateService.updateRate(id, body);
            res.status(200).json(giftCardRate);
        }catch(err){
            next(err);
        }
    }

    deleteRate = async (req, res, next)=>{
        try{
            const { id } = await req.params;
            await this.giftCardRateService.deleteRate(id);
            res.status(200).json("Gift card rate deleted successfully");
        }catch(err){
            next(err);
        }
    }

    getRatesByMerchantId = async (req, res, next)=>{
        try{
            const { id } = await req.params;
            const giftCardRates = await this.giftCardRateService.getRatesByMerchantId(id);
            res.status(200).json(giftCardRates);
        }catch(err){
            next(err);
        }
    }

    getRatesByStatus = async (req, res, next)=>{
        try{
            const { status } = await req.params;
            const giftCardRates = await this.giftCardRateService.getRatesByStatus(status);
            res.status(200).json(giftCardRates);
        }catch(err){
            next(err);
        }
    }

    getRatesByFromCurrency = async (req, res, next)=>{
        try{
            const { fromCurrency } = await req.params;
            const giftCardRates = await this.giftCardRateService.getRatesByFromCurrency(fromCurrency);
            res.status(200).json(giftCardRates);
        }catch(err){
            next(err);
        }
    }

    getRatesByToCurrency = async (req, res, next)=>{
        try{
            const { toCurrency } = await req.params;
            const giftCardRates = await this.giftCardRateService.getRatesByToCurrency(toCurrency);
            res.status(200).json(giftCardRates);
        }catch(err){
            next(err);
        }
    }
}

export default GiftCardRateController;
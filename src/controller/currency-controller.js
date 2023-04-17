import Account from "../model/Account.js";
import CurrencyService from "../service/currency-service.js";

class CurrencyController{
    constructor(){
        this.currencyService = new CurrencyService();
    }

    addCurrency = async (req, res, next) => {
        try {
            const currency = await this.currencyService.addCurrency(req.body);
            return res.status(201).json(currency);
        } catch (e) {
            next(e);
        }
    }

    getAllCurrencies = async (req, res, next) => {
        try {
            const currencies = await this.currencyService.getAllCurrencies();
            return res.status(200).json(currencies);
        } catch (e) {
            next(e);
        }
    }

    getCurrencyById = async (req, res, next) => {
        try {
            const currency = await this.currencyService.getCurrencyById(req.params.id);
            return res.status(200).json(currency);
        } catch (e) {
            next(e);
        }
    }

    updateCurrency = async (req, res, next) => {
        try {
            const currency = await this.currencyService.updateCurrency(req.params.id, req.body);
            return res.status(200).json(currency);
        } catch (e) {
            next(e);
        }
    }

    deleteCurrency = async (req, res, next) => {
        try {
            const currency = await this.currencyService.deleteCurrency(req.params.id);
            return res.status(200).json(currency);
        } catch (e) {
            next(e);
        }
    }

    getCurrencyByType = async (req, res, next) => {
        try {
            const currency = await this.currencyService.getCurrencyByType(req.params.type);
            return res.status(200).json(currency);
        } catch (e) {
            next(e);
        }
    }

    getCurrencyBySymbol = async (req, res, next) => {
        try {
            const currency = await this.currencyService.getCurrencyBySymbol(req.params.symbol);
            return res.status(200).json(currency);
        } catch (e) {
            next(e);
        }
    }

    getCurrencyByName = async (req, res, next) => {
        try {
            const currency = await this.currencyService.getCurrencyByName(req.params.name);
            return res.status(200).json(currency);
        } catch (e) {
            next(e);
        }
    }
}

export default CurrencyController;
import Currency from "../model/Currency.js";
import CurrencyExistException from "../exception/CurrencyExistException.js";
import CurrencyNotFoundException from "../exception/CurrencyNotFoundException.js";

class CurrencyService {
  constructor() {
    this.currencyModel = Currency;
  }

  addCurrency = async (currency) => {
      const existingCurrency = await this.currencyModel.findOne({where: {name: currency.name}});
        if(existingCurrency) throw new CurrencyExistException('Currency already exists');
        const currencyData = await this.mapCurrency(currency);
      return await this.currencyModel.create(currencyData);
  }

    getAllCurrencies = async () => {
        return await this.currencyModel.findAll();
    }

    getCurrencyById = async (id) => {
        const existingCurrency =  await this.currencyModel.findByPk(id);
        if(!existingCurrency) throw new CurrencyNotFoundException('Currency not found');
        return existingCurrency;
    }

    updateCurrency = async (id, currency) => {
        const existingCurrency =  await this.currencyModel.findByPk(id);
        if(!existingCurrency) throw new CurrencyNotFoundException('Currency not found');
        const currencyData = await this.mapCurrency(currency);
        return await existingCurrency.update(currencyData);
    }

    deleteCurrency = async (id) => {
        const existingCurrency =  await this.currencyModel.findByPk(id);
        if(!existingCurrency) throw new CurrencyNotFoundException('Currency not found');
        return await existingCurrency.destroy();
    }
  mapCurrency = async (currency) => {
      const currencyData = {}
        if(currency.name) currencyData.name = currency.name;
        if(currency.symbol) currencyData.symbol = currency.symbol;
        if(currency.currencyType) currencyData.currencyType = currency.currencyType;
        if(currency.createdAt) currencyData.createdAt = currency.createdAt;
        if(currency.updatedAt) currencyData.updatedAt = currency.updatedAt;
        return currencyData;
  }

    getCurrencyByType = async (type) => {
        const existingCurrency = await this.currencyModel.findOne({where: {currencyType: type}});
        if(!existingCurrency) throw new CurrencyNotFoundException('Currency not found');
        return existingCurrency;
    }

    getCurrencyBySymbol = async (symbol) => {
        const existingCurrency = await this.currencyModel.findOne({where: {symbol: symbol}});
        if(!existingCurrency) throw new CurrencyNotFoundException('Currency not found');
        return existingCurrency;
    }

    getCurrencyByName = async (name) => {
        const existingCurrency = await this.currencyModel.findOne({where: {name: name}});
        if(!existingCurrency) throw new CurrencyNotFoundException('Currency not found');
        return existingCurrency;
    }
}
export default CurrencyService;
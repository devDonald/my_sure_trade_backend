import CurrencyController from "../controller/currency-controller.js";
import express from "express";

class CurrencyRoutes {
  constructor() {
    this.currencyController = new CurrencyController();
    this.currencyRouter = express.Router();
  }

  routes = async () => {
    this.currencyRouter.get("/", this.currencyController.getAllCurrencies);
    this.currencyRouter.get("/:id", this.currencyController.getCurrencyById);
    this.currencyRouter.get("/symbol/:symbol", this.currencyController.getCurrencyBySymbol);
    this.currencyRouter.get("/name/:name", this.currencyController.getCurrencyByName);
    this.currencyRouter.get("/type/:type", this.currencyController.getCurrencyByType);
    this.currencyRouter.post("/", this.currencyController.addCurrency);
    this.currencyRouter.put("/:id", this.currencyController.updateCurrency);
    this.currencyRouter.delete("/:id", this.currencyController.deleteCurrency);
    return this.currencyRouter;
  }
}
export default CurrencyRoutes;
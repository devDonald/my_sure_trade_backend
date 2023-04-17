import GiftCardRateController from "../controller/gift-card-rate-controller.js";
import express from "express";

class GiftCardRateRoutes {
    constructor() {
        this.giftCardRateController = new GiftCardRateController();
        this.giftCardRateRouter = express.Router();
    }

    routes = async () => {
        this.giftCardRateRouter.post('/', this.giftCardRateController.addRate);
        this.giftCardRateRouter.get('/', this.giftCardRateController.getAllRates);
        this.giftCardRateRouter.get('/merchant/:id', this.giftCardRateController.getRatesByMerchantId);
        this.giftCardRateRouter.get('/status/:status', this.giftCardRateController.getRatesByStatus);
        this.giftCardRateRouter.get('/:id', this.giftCardRateController.getRateById);
        this.giftCardRateRouter.put('/:id', this.giftCardRateController.updateRate);
        this.giftCardRateRouter.delete('/:id', this.giftCardRateController.deleteRate);
        return this.giftCardRateRouter;
    }
}

export default GiftCardRateRoutes;
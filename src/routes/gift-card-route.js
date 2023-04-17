import express from 'express';
import GiftCardController from "../controller/gift-card-controller.js";
import Authentication from '../middleware/authenticate.js';
class GiftCardRoute{
    constructor(app){
        this.giftCardController = new GiftCardController();
        this.giftCardRouter = express.Router();
        this.auth = new Authentication();
    }
    routes = async ()=>{
        const {
            verifyToken,
            verifyRole,
            verifyAdmin
          } = this.auth;
        this.giftCardRouter.get("/", [verifyToken],this.giftCardController.getGiftCards);
        this.giftCardRouter.get("/:id", [verifyToken],this.giftCardController.getGiftCardById);
        this.giftCardRouter.get("/search/:cardCode", [verifyToken],this.giftCardController.getGiftCardByCardCode);
        this.giftCardRouter.get("/user/:userId", [verifyToken],this.giftCardController.getGiftCardByUserId);
        this.giftCardRouter.get("/user/:status", [verifyToken],this.giftCardController.getGiftCardsByStatus);
        this.giftCardRouter.get("/status/:status", [verifyToken],this.giftCardController.getGiftCardByStatus);
        this.giftCardRouter.get("/type/:type", [verifyToken],this.giftCardController.getGiftCardsByType);
        this.giftCardRouter.post("/",this.giftCardController.createGiftCard);
        this.giftCardRouter.put("/:id", [verifyToken],this.giftCardController.updateGiftCard);
        this.giftCardRouter.delete("/:id", [verifyToken],this.giftCardController.deleteGiftCard);
        return this.giftCardRouter;
    }
}

export default GiftCardRoute;
import GiftCardService from '../service/gift-card-service.js';
import UserController from "./user-controller.js";
class GiftCardController{
    constructor(){
        this.giftCardService = new GiftCardService();
        this.userController = new UserController();
    }

     getGiftCardById = async (req, res,next)=>{
        try{

            const { id } = req.params;
        const giftCard = await this.giftCardService.getGiftCardById(id);
        res.json(giftCard);

        }catch(e){
            next(e)
        }
    }

     getGiftCards = async(req, res, next)=>{
        try{
            const giftCards = await this.giftCardService.getAllGiftCards();
            res.json(giftCards);
        }catch (e) {
            next(e)
        }
    }

     createGiftCard = async (req, res, next)=>{
        try{
            const { body } = await req;
            const user = await this.userController.getLoggedInUser(req, res, next);
            body.userId = user.id;
        const giftCard = await this.giftCardService.addGiftCard(user.id, body);
        await res.status(201).json({
            message: "Gift card created successfully",  
            data: giftCard
        });
        }catch (e) {
            next(e)
        }
    }

     updateGiftCard = async (req, res, next)=>{
        try {
            const { body } = await req;
        const { id } = req.params;
        const giftCard = await this.giftCardService.updateGiftCard(id, body);
        res.json(giftCard);
            
        } catch (error) {
            next(error)
        }
    }

     deleteGiftCard = async (req, res, next)=>{
        try {
            const { id } = req.params;
        const giftCard = await this.giftCardService.deleteGiftCard(id);
        res.json(giftCard);
        } catch (error) {
            next(error)
        }
    }

    getGiftCardByCardCode = async (req, res, next)=>{
        try {

            const { cardCode } = req.params;
        const giftCard = await this.giftCardService.getGiftCardByCardCode(cardCode);
        res.json(giftCard);
            
        } catch (error) {
            next(error)
        }
    }

    getGiftCardByUserId = async (req, res)=>{
        const { userId } = req.params;
        const giftCard = await this.giftCardService.getGiftCardByUserId(userId);
        res.json(giftCard);
    }

    getGiftCardsByStatus = async (req, res)=>{
        const { status } = req.params;
        const giftCard = await this.giftCardService.getGiftCardsByStatus(status);
        res.json(giftCard);
    }

    getGiftCardByStatus = async (req, res, next)=>{
        try {
            const { status } = await req.params;
        const giftCard = await this.giftCardService.getGiftCardsByStatus(status);
        res.json(giftCard);
        } catch (error) {
            next(error)
        }
    }

    getGiftCardsByType = async (req, res, next)=>{
        try {
            const { type } = req.params;
        const giftCard = await this.giftCardService.getGiftCardsByCardType(type);
        res.json(giftCard);
        } catch (error) {
            next(error)
        }
    }
}
export default GiftCardController;
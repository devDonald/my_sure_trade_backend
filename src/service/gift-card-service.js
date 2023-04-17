import logger from "../config/logger/logger-config.js";
import GiftCardExistException from "../exception/GiftCardExistException.js";
import GiftCardNotFoundException from "../exception/GiftCardNotFoundException.js";
import GiftCard from "../model/GiftCard.js";
import moment from "moment";

class GiftCardService{
    constructor(){
        this.giftCardModel = GiftCard;
    }

    addGiftCard = async (userId, giftCard)=>{
        const existingGiftCard = await this.giftCardModel.findOne({
            where: {
                cardCode: giftCard.cardCode
            }
        });

        if(existingGiftCard){
            throw new GiftCardExistException("Gift card already exists");
        }
        const userData = await this.mapCardFields(giftCard);
        userData.createdAt = new Date();
        userData.status = "NEW";
        // userData.screenshots = {};
        userData.userId = userId;
        logger.info("Gift card data: " + JSON.stringify(userData));

        return await this.giftCardModel.create(userData);
    }

    getGiftCardById = async (id)=>{
        const giftCard = await this.giftCardModel.findOne({
            where: {
                id: id
            }
        });

        if(!giftCard){
            throw new GiftCardNotFoundException("Gift card not found");
        }

        return giftCard;
    }

    getAllGiftCards = async ()=>{
        return await this.giftCardModel.findAll();
    }

    updateGiftCard = async (id, giftCard)=>{
        const existingGiftCard = await this.giftCardModel.findOne({
            where: {
                id: id
            }
        });

        if(!existingGiftCard){
            throw new GiftCardNotFoundException("Gift card not found");
        }
        const cardDetails = await this.mapCardFields(giftCard);
        cardDetails.updatedAt = new Date();

        await this.giftCardModel.update(cardDetails, {
            where: {
                id: id
            }
        });
    }

    deleteGiftCard = async (id)=>{
        const existingGiftCard = await this.giftCardModel.findOne({
            where: {
                id: id
            }
        });

        if(!existingGiftCard){
            throw new GiftCardNotFoundException("Gift card not found");
        }

        await this.giftCardModel.destroy({
            where: {
                id: id
            }
        });
    }

    getGiftCardByCardCode = async (cardCode)=>{
        const giftCard = await this.giftCardModel.findOne({
            where: {
                cardCode: cardCode
            }
        });

        if(!giftCard){
            throw new GiftCardNotFoundException("Gift card not found");
        }

        return giftCard;
    }

    getGiftCardByUserId = async (userId)=>{
        const giftCard = await this.giftCardModel.findAll({
            where: {
                userId: userId
            }
        });

        if(!giftCard){
            throw new GiftCardNotFoundException("Gift card not found");
        }

        return giftCard;
    }

    getGiftCardsByUserId = async (userId)=>{
        const giftCards = await this.giftCardModel.findAll({
            where: {
                userId: userId
            }
        });

        if(!giftCards){
            throw new GiftCardNotFoundException("Gift card not found");
        }

        return giftCards;
    }

    getGiftCardsByStatus = async (status)=>{
        logger.info("Status: " + status);
        const giftCards = await this.giftCardModel.findAll({
            where: {
                status: status
            }
        });

        if(!giftCards){
            throw new GiftCardNotFoundException("Gift card not found");
        }

        return giftCards;
    }

    getGiftCardsByCardType = async (cardType)=>{
        const giftCards = await this.giftCardModel.findAll({
            where: {
                cardType: cardType
            }
        });

        if(!giftCards){
            throw new GiftCardNotFoundException("Gift card not found");
        }

        return giftCards;
    }

    mapCardFields = async (card)=>{
        const mappedCard = {};
        if(card.userId){
            mappedCard.userId = card.userId
        }
        if(card.cardCode){
            mappedCard.cardCode = card.cardCode
        }
        if(card.cardPin){
            mappedCard.cardPin = card.cardPin
        }
        if(card.cardType){
            mappedCard.cardType = card.cardType
        }
        if(card.currencyId){
            mappedCard.currencyId = card.currencyId
        }
        if(card.amount){
            mappedCard.amount = card.amount
        }
        if(card.discount){
            mappedCard.discount = card.discount
        }
        if(card.expiryDate){
            mappedCard.expiryDate = moment(card.expiryDate).format("YYYY-MM-DD");
        }
        if(card.status){
            mappedCard.status = card.status
        }
        if(card.screenshots){
            mappedCard.screenshots = card.screenshots
        }
        return mappedCard;
    }
}
export default GiftCardService;
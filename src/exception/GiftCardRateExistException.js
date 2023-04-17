class GiftCardRateExistException extends Error {
    constructor(message) {
        super(message);
        this.name = "GiftCardRateExistException";
        this.message = message;
        this.status = 409;
        this.stack = (new Error()).stack;
    }
}
export default GiftCardRateExistException;
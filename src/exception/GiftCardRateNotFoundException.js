class GiftCardRateNotFoundException extends Error{
    constructor(message) {
        super(message);
        this.name = "GiftCardRateNotFoundException";
        this.message = message;
        this.status = 404;
        this.stack = (new Error()).stack;
    }
}
export default GiftCardRateNotFoundException;
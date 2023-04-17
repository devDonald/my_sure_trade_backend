class GiftCardNotFoundException extends Error{
    constructor(message){
        super(message);
        this.name = "GiftCardNotFoundException";
        this.status = 404;
        this.message = message;
        this.stack = (new Error()).stack;
    }
}
export default GiftCardNotFoundException;
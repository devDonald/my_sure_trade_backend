class PaymentExistException extends Error {
    constructor(message) {
        super(message);
        this.name = "PaymentExistException";
        this.message = message;
        this.status = 400;
        this.stack = (new Error()).stack;
    }
}
export default PaymentExistException;
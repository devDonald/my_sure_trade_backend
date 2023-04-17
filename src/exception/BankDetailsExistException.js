class BankDetailsExistException extends Error {
    constructor(message) {
        super(message);
        this.name = 'BankDetailsExistException';
        this.message = message;
        this.status = 409;
        this.stack = (new Error()).stack;
    }
}
export default BankDetailsExistException;
class TransactionExistAlready extends Error {
    constructor(message) {
        super(message);
        this.name = "TransactionExistAlready";
        this.message = message;
        this.status = 400;
        this.stack = (new Error()).stack;
    }
}
export default TransactionExistAlready;
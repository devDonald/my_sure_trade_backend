class TransactionNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "TransactionNotFound";
        this.message = message;
        this.status = 404;
        this.stack = (new Error()).stack;
    }
}
export default TransactionNotFound;
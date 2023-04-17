class BankDetailsNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'BankDetailsNotFoundException';
        this.message = message;
        this.status = 404;
        this.stack = (new Error()).stack;
    }
}

export default BankDetailsNotFoundException;
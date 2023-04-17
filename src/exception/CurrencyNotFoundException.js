class CurrencyNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'CurrencyNotFoundException';
        this.message = message;
        this.status = 404;
        this.stack = (new Error()).stack;
    }
}
export default CurrencyNotFoundException;
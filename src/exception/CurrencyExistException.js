class CurrencyExistException extends Error {
  constructor(message) {
    super(message);
    this.name = "CurrencyExistException";
    this.message = message;
    this.status = 400;
    this.stack = new Error().stack;
  }
}
export default CurrencyExistException;
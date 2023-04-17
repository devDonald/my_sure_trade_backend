class GiftCardExistException extends Error {
  constructor(message) {
    super(message);
    this.name = "GiftCardExistException";
    this.status = 409;
    this.message = message;
    this.stack = (new Error()).stack;
  }
}
export default GiftCardExistException;
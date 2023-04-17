class MerchantNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = 'MerchantNotFoundException';
    this.status = 404;
    this.message = message;
    this.stack = (new Error()).stack;
  }


}
export default MerchantNotFoundException;
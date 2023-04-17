class PaymentNotFoundException{
    constructor(message){
        this.name = "PaymentNotFoundException";
        this.message = message;
        this.status = 404;
        this.stack = (new Error()).stack;
    }
}
export default PaymentNotFoundException;
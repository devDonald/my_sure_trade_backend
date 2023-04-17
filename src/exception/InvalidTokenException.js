class InvalidTokenException extends Error{
    constructor(message){
        super(message);
        this.name = "InvalidTokenException";
        this.message = message;
        this.status = 401;
        this.stack = (new Error()).stack;
    }
}
export default InvalidTokenException;
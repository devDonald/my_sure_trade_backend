class InvalidCredentialsException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCredentialsException';
    }
}

export default InvalidCredentialsException;
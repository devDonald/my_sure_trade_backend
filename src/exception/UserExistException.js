class UserExistException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserExistException';
    this.message = message;
    this.status = 409;
    this.stack = (new Error()).stack;

  }
}
export default UserExistException;
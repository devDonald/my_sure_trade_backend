class UserNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundException';
    this.status = 404;
    this.message = message;
    this.stack = (new Error()).stack;
  }


}
export default UserNotFoundException;
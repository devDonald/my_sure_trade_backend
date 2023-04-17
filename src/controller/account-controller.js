class AccountController {
  constructor() {
    this.accountService = new AccountService();
  }

  async getAccounts(req, res) {
    const accounts = await this.accountService.getAccounts();
    res.send(accounts);
  }
}
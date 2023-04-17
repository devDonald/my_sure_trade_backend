import BankDetailController from "../controller/bank-detail-controller.js";
import express from "express";

class BankDetailRoutes{
    constructor(){
        this.bankDetailController = new BankDetailController();
        this.bankDetailRouter = express.Router();
    }
    routes = async ()=>{
        this.bankDetailRouter .get("/",this.bankDetailController.getAllBankDetails)
        this.bankDetailRouter .post("/",this.bankDetailController.addBankDetail);
        this.bankDetailRouter .get("/:id",this.bankDetailController.getBankDetailById)
        this.bankDetailRouter .get("/account-numbers/:accountNumber",this.bankDetailController.getBankDetailsByAccountNumber)
        this.bankDetailRouter .put("/update/:id",this.bankDetailController.updateBankDetail)
        this.bankDetailRouter .delete("/:id",this.bankDetailController.deleteBankDetail);
        this.bankDetailRouter .delete("/by-account-number/:accountNumber",this.bankDetailController.deleteBankDetailByAccountNumber);
        return this.bankDetailRouter;
    }
}
export default BankDetailRoutes;
const {FetchTransactionHistory} = require('../Models/transactionModel');


const fetchTransactionController = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();

    let Data = {inputEmail, Main_Account_ID, Main_Account_Number};
    let results = await FetchTransactionHistory(Data)

    res.render('transactions', {User:req.user, results})
}


module.exports = {
    fetchTransactionController,
}
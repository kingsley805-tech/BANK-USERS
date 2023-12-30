const {updateAccountBalance, postWithdrawalData} = require('../Models/withDrawalModel');
const {RecordNewTransaction} = require('../Models/depositModel');
const {FetchAccountList, FetchAccountSum} = require('../Models/accountModel')
const {SavedNotification} = require('../Models/notificationModel')
const {FetchAccountSumTransfer} = require('../Models/transferModel')
const {TransactionEmailAlerts} = require('../utils/email.util')

const withdrawalPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number}
    let results = await FetchAccountList(Data)
    res.render('withdrawal-form', {User:req.user, results})
}

const PostWithDrawal = async (req, res) => {
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let inputEmail = (req.user.inputEmail).trim();
    let transferAmount = Number(req.body.transferAmount)
    let AccountID = req.body.AccountID
    let Account_Number = req.body.Account_Number
    let Generic_Name = req.body.Generic_Name
    let Account_Type = req.body.Account_Type
    let Reference = req.body.Reference
    let wordDate = req.body.wordDate
    let TrxID = req.body.TrxID
    let Status= req.body.Status
    let timeStamp = new Date(wordDate).getTime()
    let Debit = '-'+transferAmount.toFixed()
    let Symbol   = (req.body.Symbol).trim()
    let Currency  = req.body.Currency

    let Data = {transferAmount, AccountID, Account_Number, Generic_Name, Account_Type, Reference, wordDate, TrxID, Status, Main_Account_ID, Main_Account_Number, inputEmail};

    let AccountData = {inputEmail, AccountID, Account_Number, transferAmount}
    let Info = {Main_Account_ID, Main_Account_Number, inputEmail, Account_Number, AccountID}
    let Sum = await FetchAccountSumTransfer(Info)
    let Account_Balance = Sum.Balance
    let Availabe_Balance = Account_Balance - transferAmount

    let Transactions = {Name: Generic_Name, Type: 'Withdrawal', Amount:transferAmount, wordDate, Reference, TrxID, Account_Number, inputEmail, Main_Account_ID, Main_Account_Number, Status:'Processing', Credit:'' , Debit:Debit, Title: `Withdrawal of ${Symbol}${transferAmount.toFixed()} from ${Generic_Name}`, Balance:Availabe_Balance, timeStamp, Symbol:Symbol, Currency:Currency}

    let Notification = {Name:'System', Email:'system@treasurybank.net', Message: `Your withdrawal of ${Symbol} ${transferAmount.toFixed(2)} is completed and waiting for approval`, wordDate:wordDate, Status:'Pending', Reference:timeStamp, Main_Account_ID, Main_Account_Number, inputEmail}

   let EmailInfo = {Name: Generic_Name, Type:'Deposit', Title: `Deposit of ${Symbol}${transferAmount.toFixed(2)} into ${Generic_Name},`, Account_Number:Account_Number, Account_Type:Currency, Amount:transferAmount, Symbol:Symbol, Date:wordDate, FirstName:req.user.FirstName, LastName:req.user.LastName, inputEmail:inputEmail, Currency:Currency, Subject:'Withdrawal Notification Alerts'}

    await postWithdrawalData(Data);
    await updateAccountBalance(AccountData);
    await RecordNewTransaction(Transactions);
    await SavedNotification(Notification);
    await TransactionEmailAlerts(EmailInfo)
    res.json({Mes:'Successful'})

}

const WithDrawalSuccess = (req, res) => {
    res.render('withdrawal-success',{User:req.user})
}


module.exports = {
    PostWithDrawal,
    WithDrawalSuccess, 
    withdrawalPage
}
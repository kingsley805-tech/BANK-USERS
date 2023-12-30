const {postTransferModel, secondPostTransferModel, updateAccountBalance, updatePostTransfer, FetchTransferSum, fetchReceiverInfo} = require('../Models/transferModel');
const {RecordNewTransaction} = require('../Models/depositModel');
const {FetchAccountList, FetchAccountSum} = require('../Models/accountModel')
const {SavedNotification} = require('../Models/notificationModel');
const {FetchAccountSumTransfer} = require('../Models/transferModel')
const {TransactionEmailAlerts} = require('../utils/email.util')


const transferPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number}
    let results = await FetchAccountList(Data)
    res.render('transfer-form', {User:req.user, results})
}


const PostTransferController = async(req, res) => {
    let Data = req.body;
    await postTransferModel(Data);
    res.json({Status:'Success'})
}

const SencondPostTransferController = async(req, res) => {
    try {
        let Data = req.query;
       // console.log(Data)
        let Info = await secondPostTransferModel(Data);
        // console.log(Info)
        res.render('transfer-form-two', {User:req.user, Info, Data})
    } catch (error) {
        console.log(error)
    }
}

const PostTransferUpdate = async(req, res) => {
    try {
        let Data = req.body
        let Main_Account_ID = (req.user.AccountID).trim();
        let Main_Account_Number = (req.user.Account_Number).trim();
        let inputEmail = (req.user.inputEmail).trim();
        let Reference = Data.Reference;
        let TrxID = Data.TrxID
        let wordDate = Data.wordDate
        let transferAmount = Number(Data.transferAmount)
        let Receiver_Name = Data.Receiver_Name 
        let Receiver_Account_Number = Data.Receiver_Account_Number
        let AccountID = (Data.AccountID).trim()
        let Account_Number = (Data.Account_Number).trim()
        let timeStamp = new Date(wordDate).getTime()
        let Debit = '-'+transferAmount.toFixed()

        let Symbol   = (req.body.Symbol).trim()
        let Currency  = (req.body.Currency).trim()
        let Info = {Main_Account_ID, Main_Account_Number, inputEmail, Account_Number, AccountID}

        let AccountData = {AccountID, Account_Number, inputEmail, transferAmount, Account_Number, AccountID }
        let Sum = await FetchAccountSumTransfer(Info)
        let Account_Balance = Sum.Balance
        let Availabe_Balance = Account_Balance - transferAmount

        let Transactions = {Name: Receiver_Name, Type: 'Transfer', Amount:transferAmount, wordDate, Reference, TrxID, Account_Number:Receiver_Account_Number, inputEmail, Main_Account_ID, Main_Account_Number, Status:'Processing', Credit:'' , Debit: Debit, Title: `Transfer of ${Symbol}${transferAmount.toFixed()} to ${Receiver_Name}`, Balance:Availabe_Balance, timeStamp, Currency:Currency, Symbol:Symbol}

        let Notification = {Name:'System', Email:'system@treasurybank.net', Message: `Your transfer of ${Symbol} ${transferAmount.toFixed(2)} to ${Receiver_Name}(${Receiver_Account_Number}) is completed and waiting for approval`, wordDate:wordDate, Status:'Pending', Reference:timeStamp, Main_Account_ID, Main_Account_Number, inputEmail}

        let EmailInfo = {Name: Receiver_Name, Type:'Debit', Title: `Transfer of ${Symbol}${transferAmount.toFixed()} to ${Receiver_Name}`, Account_Number:Account_Number, Account_Type:Currency, Amount:transferAmount, Symbol:Symbol, Date:wordDate, FirstName:req.user.FirstName, LastName:req.user.LastName, inputEmail:inputEmail, Currency:Currency, Subject:'Transfer Notification Alerts'}

        await updatePostTransfer(Data)
        await updateAccountBalance(AccountData)
        await RecordNewTransaction(Transactions)
        await SavedNotification(Notification)
        await TransactionEmailAlerts(EmailInfo)
        res.json({Mes:'Success'})

    } catch (error) {
        console.log(error)
    }
}


const TransferSuccess = (req, res) => {
    res.render('transfer-success', {User:req.user})
}


const TotalTransferAmount = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number}
     let Sum = await FetchTransferSum(Data);
     res.json(Sum.Amount)
}


const FetchReceiverInfo = async(req, res) => {
    let Currency = req.body.Currency
    let Account_Number = req.body.Account_Number
    let data = await fetchReceiverInfo(Account_Number, Currency);
    console.log(data)
    return res.json(data)

}

module.exports = {
  PostTransferController,
  SencondPostTransferController,
  PostTransferUpdate, 
  TransferSuccess,
  transferPage,
  TotalTransferAmount,
  FetchReceiverInfo
}
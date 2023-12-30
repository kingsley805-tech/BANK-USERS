const {FetchAccountList} = require('../Models/accountModel');
const {AccountDetailForDeposit, postDepositModel, savenewCard, fetchAddedCards, selectedCardDetails, updateDepositPost, updateAccountBalance, RecordNewTransaction, depositpostdetails, FetchDepositSum} = require('../Models/depositModel')
const {SavedNotification} = require('../Models/notificationModel');
const {TransactionEmailAlerts} = require('../utils/email.util')
const {FetchAccountSumTransfer} = require('../Models/transferModel')

const depositPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number}
    let results = await FetchAccountList(Data)
    res.render('deposit-form', {User:req.user, results})
}


const accountDetailForDeposit = async(req, res) => {
     let AccountID = (req.body.AccountID).trim()
    let inputEmail = (req.user.inputEmail).trim();
    let Data = {AccountID, inputEmail}
    let Info = await AccountDetailForDeposit(Data)
     res.json(Info)
}

const PostDepositDetails = async (req, res) => {
   let inputEmail = (req.user.inputEmail).trim();
   let Main_Account_ID = (req.user.AccountID).trim();
   let Main_Account_Number = (req.user.Account_Number).trim();
   let depositAmount = req.body.depositAmount;
   let Deposit_Method = req.body.Deposit_Method;
   let AccountID = req.body.AccountID;
   let Account_Number = req.body.Account_Number;
   let Generic_Name = req.body.Generic_Name;
   let Account_Type = req.body.Account_Type;
   let Reference = (req.body.Reference).trim();
   let wordDate = req.body.wordDate;
   let Status = (req.body.Status).trim();
   let TrxID = (req.body.TrxID).trim();
   let Currency = (req.body.Currency).trim()
   let Symbol   = (req.body.Symbol).trim()

   let Data = {inputEmail, Main_Account_ID, Main_Account_Number, depositAmount, Deposit_Method, AccountID, Account_Number, Generic_Name, Account_Type, Reference, wordDate, Status, TrxID, Currency, Symbol}

    await postDepositModel(Data)
    res.json({Mes:'Deposits Recorded Successfully'})
}

 
 const DepositCardMethod = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let Reference = (req.query.reference).trim()
    let AccountID = (req.query.AccountID).trim()
    let TrxID = (req.query.TrxID).trim()

    let Data = {inputEmail, Main_Account_ID, Main_Account_Number, Reference, AccountID, TrxID};
    let results = await fetchAddedCards(Data);
    let Info = await depositpostdetails(Data)
    let Charges = Number(Info.depositAmount)*0.02
    let Total = Number(Info.depositAmount) + Charges
    res.render('deposit-cards', {User:req.user, results, Data:Info, Total})
 }

 /////////////////////Adding a new Card ///////////////////////

 const CardServicesPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number};
    let results = await fetchAddedCards(Data);
    res.render('card-services', {User:req.user, results})
 }


 const CreatenewCardsService = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let Card_Holder = (req.body.Card_Holder).trim()
    let Card_Number = (req.body.Card_Number).trim()
    let Card_Expiry = (req.body.Card_Expiry).trim()
    let Card_Security = (req.body.Card_Security).trim()
    let Card_Type = (req.body.Card_Type).trim()

    let Data = {inputEmail, Main_Account_ID, Main_Account_Number, Card_Holder, Card_Number, Card_Expiry, Card_Security, Card_Type};

    await savenewCard(Data);
    res.json({Mes:'Card Added Successfully'})
 }


 const CardDetailsView = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let Card_Number = (req.body.Card_Number).trim()
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number, Card_Number};
    let Info = await selectedCardDetails(Data);
    //console.log(Info)
     return res.json(Info)
 }


 const UpdateDepositPost = async (req, res) => {
   let Main_Account_ID = (req.user.AccountID).trim();
   let Main_Account_Number = (req.user.Account_Number).trim();
   let inputEmail = (req.user.inputEmail).trim();
   let AccountID = (req.body.AccountID).trim()
   let Account_Number = (req.body.Account_Number).trim()
   let Generic_Name = req.body.Generic_Name
   let Reference = (req.body.Reference).trim()
   let TrxID = (req.body.TrxID).trim()
   let depositAmount = Number(req.body.depositAmount)
   let wordDate = (req.body.SelectedDate).trim()
   let timeStamp = new Date(wordDate).getTime()
   let Symbol   = req.body.Symbol
   let Currency  = req.body.Currency

   let Info = {Main_Account_ID, Main_Account_Number, inputEmail, Account_Number, AccountID}
   let Sum = await FetchAccountSumTransfer(Info)
   let Account_Balance = Sum.Balance
   let Availabe_Balance = Account_Balance + depositAmount

   let Data = {inputEmail, AccountID, Account_Number, Generic_Name, Reference, TrxID, depositAmount};

   let Notification = {Name:'System', Email:'system@treasurybank.net', Message: `Your deposit of ${Symbol}${depositAmount.toFixed(2)} is completed and waiting for approval`, wordDate:wordDate, Status:'Pending', Reference:timeStamp, Main_Account_ID, Main_Account_Number, inputEmail}

   let Transactions = {Name: Generic_Name, Type: 'Deposit', Amount:depositAmount, wordDate, Reference, TrxID, Account_Number, inputEmail, Main_Account_ID, Main_Account_Number, Status:'Pending', Credit:depositAmount.toFixed() , Debit: '', Title: `Deposit of ${Symbol}${depositAmount.toFixed(2)} into ${Generic_Name},`, Balance:Availabe_Balance, timeStamp, Symbol:Symbol, Currency:Currency}

   let EmailInfo = {Name: Generic_Name, Type:'Deposit', Title: `Deposit of ${Symbol}${depositAmount.toFixed(2)} into ${Generic_Name},`, Account_Number:Account_Number, Account_Type:Currency, Amount:depositAmount, Symbol:Symbol, Date:wordDate, FirstName:req.user.FirstName, LastName:req.user.LastName, inputEmail:inputEmail, Currency:Currency, Subject:'Deposit Notification Alerts'}

    await updateDepositPost(Data);
   /////// await updateAccountBalance(Data);
    await RecordNewTransaction(Transactions)
    await SavedNotification(Notification)
    await TransactionEmailAlerts(EmailInfo)
    res.json({Mes:'Deposits Recorded Successfully'})
}
  const depositSuccessPage = (req, res)=> {
     res.render('deposit-sucess', {User:req.user})
  }

  const DepositWireTransfer = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let Reference = (req.query.reference).trim()
    let AccountID = (req.query.AccountID).trim()
    let TrxID = (req.query.TrxID).trim()

    let Data = {inputEmail, Main_Account_ID, Main_Account_Number, Reference, AccountID, TrxID};
    let Info = await depositpostdetails(Data)
    let Charges = Number(Info.depositAmount)*0.02
    let Total = Number(Info.depositAmount) + Charges
    res.render('deposit-wire-transfer', {User:req.user, Data:Info, Total})
 }

const TotalDepositAmount = async (req, res) => {
   let inputEmail = (req.user.inputEmail).trim();
   let Main_Account_ID = (req.user.AccountID).trim();
   let Main_Account_Number = (req.user.Account_Number).trim();
   let Data = {inputEmail, Main_Account_ID, Main_Account_Number};
   let Sum = await FetchDepositSum(Data);
   return res.json(Sum.Amount)
}
module.exports = {
    depositPage,
    accountDetailForDeposit,
    PostDepositDetails,
    DepositCardMethod, 
    CreatenewCardsService,
    CardServicesPage,
    CardDetailsView,
    UpdateDepositPost,
    depositSuccessPage,
    DepositWireTransfer,
   TotalDepositAmount
}
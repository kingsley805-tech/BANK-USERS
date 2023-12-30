const { json } = require('express');
const {FetchAccountList, FetchAccountDetail, FetchAccountSum, CreateAccountModel} = require('../Models/accountModel');

const accountPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number}
     let results = await FetchAccountList(Data)
     let Sum = await FetchAccountSum(Data)
    res.render('my-account', {User:req.user, results, Sum: Sum})
}

 
const accountDetails = async (req, res) => {
    let AccountID = (req.body.AccountID).trim()
    let Account_Number = (req.body.Account_Number).trim()
    let inputEmail = (req.user.inputEmail).trim();
    let Data = {AccountID, Account_Number, inputEmail}
    let Info = await FetchAccountDetail(Data)

    res.json(Info)
}


const createAdditional = async (req, res) => {
    let inputEmail = (req.user.inputEmail).trim()
    let AccountID = new Date().getTime()
    let Account_Number = GenerateIndex()
    let Name = req.user.FirstName+' '+req.user.LastName
    let ACHNumber = '0067854323';
    let Account_Type = (req.body.Account_Type).trim()
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let Generic_Name = req.body.Generic_Name
    
    let AccountInfo = {Main_Account_ID:Main_Account_ID, Main_Account_Number:Main_Account_Number, Account_Holder:Name, ACHNumber:ACHNumber, Account_Type:Account_Type, Generic_Name:Generic_Name, Account_Number:Account_Number, AccountID:AccountID, Balance: 0, inputEmail:inputEmail }

    await CreateAccountModel(AccountInfo);
  //  await ApprovalEmail(Data)
    res.json({Mes: 'Successful'})
}

const createAccountPage = (req, res) => {
     res.render('create-accont-form', {User:req.user})
}


const TotalAccountBalance = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number}
     let Sum = await FetchAccountSum(Data)
     res.json(Sum.Balance)
}




let GenerateIndex = () =>{
    const min = 1000000000;
    const max = 9999999999;
   return Math.floor(Math.random() * (max - min + 1) + min);
  }


module.exports = {
    accountPage,
    accountDetails,
    createAccountPage,
    createAdditional,
    TotalAccountBalance

}
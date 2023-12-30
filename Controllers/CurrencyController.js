const {usdAccountmodel} = require('../Models/currencyModel');

const USDControllerPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let sql = `SELECT * FROM accounts WHERE Currency = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND inputEmail = ?`
    let values = ['USD', Main_Account_ID, Main_Account_Number, inputEmail]
    let Data = await usdAccountmodel(sql, values);
    // console.log(Data)
    res.render('account-usd', {Data, User:req.user})
}


const GBPControllerPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let sql = `SELECT * FROM accounts WHERE Currency = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND inputEmail = ?`
    let values = ['GBP', Main_Account_ID, Main_Account_Number, inputEmail]
    
    let Data = await usdAccountmodel(sql, values);
    // console.log(Data)
    res.render('account-gbp', {Data, User:req.user})
}


const EuroControllerPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();

    let sql = `SELECT * FROM accounts WHERE Currency = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND inputEmail = ?`
    let values = ['EURO', Main_Account_ID, Main_Account_Number, inputEmail]
    let Data = await usdAccountmodel(sql, values);
    // console.log(Data)
    res.render('account-euro', {Data, User:req.user})
}

const CADControllerPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let sql = `SELECT * FROM accounts WHERE Currency = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND inputEmail = ?`
    let values = ['CAD', Main_Account_ID, Main_Account_Number, inputEmail]
    let Data = await usdAccountmodel(sql, values);
    // console.log(Data)
    res.render('account-cad', {Data, User:req.user})
}

module.exports = {
    USDControllerPage,
    GBPControllerPage,
    EuroControllerPage,
    CADControllerPage
}
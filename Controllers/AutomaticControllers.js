const {BalanceModel} = require('../Models/automatic')
const UsdBalance = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let sql = `SELECT Balance FROM accounts WHERE Currency = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND inputEmail = ?`
    let values = ['USD', Main_Account_ID, Main_Account_Number, inputEmail];

    let Balance = await BalanceModel(sql, values)
    res.json(Balance.Balance)
}


const GBPBalance = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let sql = `SELECT Balance FROM accounts WHERE Currency = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND inputEmail = ?`
    let values = ['GBP', Main_Account_ID, Main_Account_Number, inputEmail];

    let Balance = await BalanceModel(sql, values)
    res.json(Balance.Balance)
}

const EuroBalance = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let sql = `SELECT Balance FROM accounts WHERE Currency = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND inputEmail = ?`
    let values = ['EURO', Main_Account_ID, Main_Account_Number, inputEmail];

    let Balance = await BalanceModel(sql, values)
    res.json(Balance.Balance)
}

const CadBalance = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let sql = `SELECT Balance FROM accounts WHERE Currency = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND inputEmail = ?`
    let values = ['CAD', Main_Account_ID, Main_Account_Number, inputEmail];

    let Balance = await BalanceModel(sql, values)
    res.json(Balance.Balance)
}


module.exports = {
    UsdBalance,
    GBPBalance,
    EuroBalance,
    CadBalance
}
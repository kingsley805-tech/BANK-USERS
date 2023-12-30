const {statementModel, FetchAccountSum} = require('../Models/statementModel');
const {FetchAccountList} = require('../Models/accountModel')



const StatementFormPage = async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let Data = {inputEmail, Main_Account_ID, Main_Account_Number}
     let results = await FetchAccountList(Data)
    res.render('statement-form', {User:req.user, results})
}


const FetchStatementController = (req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim()
    let Main_Account_Number = (req.user.Account_Number).trim()
    let fromDate = new Date(req.body.fromDate).getTime()
    let toDate = new Date(req.body.toDate).getTime()
    let Currency = (req.body.Currency).trim()
    console.log(Currency)
    let AccountID = (req.body.AccountID).trim()
    let Account_Number = (req.body.Account_Number).trim()
    let Data = {inputEmail:inputEmail, AccountID:Main_Account_ID, Account_Number:Main_Account_Number, fromDate, toDate, Currency:Currency, Account_Number:Account_Number}
    let Today = new Date().toDateString()
    let DateInfo = {Today:Today, fromDate:new Date(fromDate).toDateString(), toDate:new Date(toDate).toDateString()}
    let Data2 = {inputEmail, Main_Account_ID, Main_Account_Number, AccountID, Account_Number}
    let pOne = new Promise( async (resolve, reject) => {
        try {
            let transactions = await statementModel(Data)
             resolve({Data:transactions})
        } catch (error) {
           reject({Error:error})
        }
    }) 

    let ptwo = new Promise( async (resolve, reject) => {
        try {
            let Sum = await FetchAccountSum(Data2)
             resolve(Sum)
        } catch (error) {
           reject({Error:error})
        }
    }) 

    Promise.all([
        pOne,
        ptwo
    ]).then(Data => {
        res.render('statement', {results:Data[0].Data, Balance:Data[1].Balance, User:req.user, DateInfo, Currency:Currency})
    })
    .catch(error => {
        console.log(error)
    })

}


module.exports = {
    FetchStatementController,
    StatementFormPage
}
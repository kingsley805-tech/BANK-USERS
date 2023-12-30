const pool = require('../config/database');

async function statementModel(Data){
    try {
    let sql = `SELECT * FROM transactions WHERE Currency = ? AND inputEmail = ? AND timeStamp BETWEEN ? AND ? AND NOT Status = ?`
      let [results] = await pool.query(sql, [Data.Currency, Data.inputEmail, Data.fromDate, Data.toDate, 'Pending']);
      return results;
    } catch (error) {
        if(error){
            console.log(error)
        }
    }
}



async function FetchAccountSum(Data){
    try {
     // console.log(Data)
       let sql = `SELECT Balance FROM accounts WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND Account_Number = ? AND AccountID = ?`
       let [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number, Data.Account_Number, Data.AccountID]);
       console.log(results)
       if(results.length === 0){
         return {Balance :0}
       }else{
         return results[0]
       }
       
    } catch (error) {
      console.log(error)
    }
 };


module.exports = {
    statementModel,
    FetchAccountSum
}
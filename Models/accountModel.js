const pool = require('../config/database');

async function FetchAccountList(Data){
   try {
      let sql = `SELECT * FROM accounts WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ?`
      let [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number]);
       return results
   } catch (error) {
     console.log(error)
   }
};

async function FetchAccountDetail(Data){
    try {
       let sql = `SELECT Generic_Name, Account_Number, Account_Type,Account_Holder, ACHNumber, Balance FROM accounts WHERE inputEmail = ? AND AccountID = ? AND Account_Number = ?`
       let [results] = await pool.query(sql, [Data.inputEmail, Data.AccountID, Data.Account_Number]);
       if(results.length === 0){
         return {Generic_Name: '', Account_Number: '', Account_Type:'', Account_Holder:'', ACHNumber:'', Balance: 0  }
       }else{
        return results[0]
       }
       
    } catch (error) {
      console.log(error)
    }
 };

 async function FetchAccountSum(Data){
    try {
       let sql = `SELECT Balance FROM accounts WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND Account_Number = ? AND AccountID = ?`
       let [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number, Data.Account_Number, Data.AccountID]);
       if(results.length === 0){
         return {Balance :0}
       }else{
         if(results[0].Balance === null){
            return {Balance :0}
         }else{
            return results[0]
         }
       }
       
    } catch (error) {
      console.log(error)
    }
 };



 async function CreateAccountModel(AccountInfo){
    try {
       let sql = `INSERT INTO accounts SET ?`
        await pool.query(sql, AccountInfo)
        return
    } catch (error) {
       console.log(error)
    }
 }

module.exports = {
    FetchAccountList,
    FetchAccountDetail,
    FetchAccountSum,
    CreateAccountModel
}
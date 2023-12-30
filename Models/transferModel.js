const pool = require('../config/database');

async function postTransferModel(Data){
    try {
         let sql = 'INSERT INTO transfers SET ?'
         await pool.query(sql, Data)
         return
    } catch (error) {
       console.log(error)
    }
}

async function secondPostTransferModel(Data){
    try {
       // console.log(Data)
         let sql = `SELECT * FROM transfers WHERE AccountID = ? AND Reference = ? AND TrxID = ?`
         let [results] = await pool.query(sql, [Data.AccountID, Data.reference, Data.TrxID])
           if(results.length === 0){
              return {transferAmount: 0}
           }else{
             return results[0]
           }
    } catch (error) {
        return error
    }
}
 

async function updateAccountBalance(Data){
    try {
       let sql = `UPDATE accounts SET Balance = Balance - ${Data.transferAmount} WHERE inputEmail = ? AND AccountID = ? AND Account_Number = ?`
        await pool.query(sql, [Data.inputEmail, Data.AccountID, Data.Account_Number ])
        return
    } catch (error) {
      console.log(error)
    }
  }

  async function updatePostTransfer(Data){
    try {
       let sql = `UPDATE transfers SET Receiver_Name = ?, Receiver_Bank = ?, Receiver_Bank_Branch = ?, Receiver_Account_Number = ?, Receiver_Account_Holder = ?, Transfer_Method = ?, Status = ? WHERE AccountID = ? AND Reference = ? AND TrxID = ?`
        await pool.query(sql, [ Data.Receiver_Name, Data.Receiver_Bank, Data.Receiver_Bank_Branch, Data.Receiver_Account_Number, Data.Receiver_Account_Holder, Data.Transfer_Method, 'Processing', Data.AccountID, Data.Reference, Data.TrxID ])
        return
    } catch (error) {
      console.log(error)
    }
  }


  async function FetchTransferSum(Data){
    try {
      //console.log(Data)
       let sql = `SELECT SUM(transferAmount) AS Amount FROM transfers WHERE Main_Account_ID = ? AND Main_Account_Number = ?`
       let [results] = await pool.query(sql, [Data.Main_Account_ID, Data.Main_Account_Number]);
       //console.log(results)
       if(results.length === 0){
         return {Amount :0}
       }else{
         if(results[0].Amount === null){
            return {Amount :0}
         }else{
            return results[0]
         }
       }
       
    } catch (error) {
      console.log(error)
    }
  };

  async function FetchAccountSumTransfer(Data){
    try {
    //  console.log(Data)
       let sql = `SELECT Balance FROM accounts WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND Account_Number = ? AND AccountID = ?`
       let [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number, Data.Account_Number, Data.AccountID]);
       //console.log(results)
       if(results.length === 0){
         return {Balance :0}
       }else{
         return results[0]
       }
       
    } catch (error) {
      console.log(error)
    }
 };


 async function fetchReceiverInfo(Account_Number, Currency){
  try {
     let sql = `SELECT * FROM accounts WHERE Account_Number = ? AND Currency = ?`;
     let [results] = await pool.query(sql, [Account_Number, Currency]);
     if(results.length === 0){
       return {}
     }else{
       return results[0]
     }
  } catch (error) {
    
  }
 }

module.exports = {
    postTransferModel,
    secondPostTransferModel,
    updateAccountBalance,
    updatePostTransfer,
    FetchTransferSum,
    FetchAccountSumTransfer, 
    fetchReceiverInfo
}
const pool = require('../config/database');

async function AccountDetailForDeposit(Data){
    try {
       let sql = `SELECT * FROM accounts WHERE inputEmail = ? AND AccountID = ?`
       let [results] = await pool.query(sql, [Data.inputEmail, Data.AccountID]);
       if(results.length === 0){
         return {Account_Number: '', Account_Type:''  }
       }else{
        return results[0]
       }
       
    } catch (error) {
      console.log(error)
    }
 };


 async function postDepositModel(Data){
   try {
       let sql = `INSERT INTO deposits SET ?`;
       await pool.query(sql, Data);
       return;
   } catch (error) {
       console.log(error)
   }
 }


 async function savenewCard(Data){
   try {
       let sql = `INSERT INTO cards SET ?`;
       await pool.query(sql, Data);
       return;
   } catch (error) {
       console.log(error)
   }
 }

 async function fetchAddedCards(Data){
  try {
       let sql = `SELECT Card_Type, Card_Number FROM cards WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ?`;
       let [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number]);
        return results
  } catch (error) {
     console.log(error)
  }
 }


 async function selectedCardDetails(Data){
  try {
       let sql = `SELECT Card_Type, Card_Number, Card_Holder, Card_Expiry, Card_Security FROM cards WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND Card_Number = ?`;
       let [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number, Data.Card_Number]);
        
       if(results.length === 0){
         return {}
       }else{
         return results[0]
       }
  } catch (error) {
     console.log(error)
  }
 }

 async function updateDepositPost(Data){
    try {
       let sql = `UPDATE deposits SET Status = 'Pending' WHERE inputEmail = ? AND Reference = ? AND TrxID = ?`;
        await pool.query(sql, [Data.inputEmail, Data.Reference, Data.TrxID ])
        return
    } catch (error) {
      console.log(error)
    }
 }

 async function updateAccountBalance(Data){
  try {
     let sql = `UPDATE accounts SET Balance = Balance + ${Data.depositAmount} WHERE inputEmail = ? AND AccountID = ? AND Account_Number = ?`
      await pool.query(sql, [Data.inputEmail, Data.AccountID, Data.Account_Number ])
      return
  } catch (error) {
    console.log(error)
  }
}


async function RecordNewTransaction(Transactions){
  try {
      let sql = `INSERT INTO transactions SET ?`;
      await pool.query(sql, Transactions);
      return;
  } catch (error) {
      console.log(error)
  }
}


async function depositpostdetails(Data){
  try {
       let sql = `SELECT * FROM deposits WHERE AccountID  = ? AND Reference = ? AND TrxID = ?`;
       let [results] = await pool.query(sql, [ Data.AccountID, Data.Reference, Data.TrxID]);
        
       if(results.length === 0){
         return {depositAmount:0}
       }else{
         return results[0]
       }
  } catch (error) {
     console.log(error)
  }
 }


 async function FetchDepositSum(Data){
  try {
     let sql = `SELECT SUM(depositAmount) AS Amount FROM deposits WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ?`
     let [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number]);
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

 module.exports = {
    AccountDetailForDeposit,
    postDepositModel, 
    savenewCard,
    fetchAddedCards,
    selectedCardDetails,
    updateDepositPost,
    updateAccountBalance,
    RecordNewTransaction,
    depositpostdetails,
    FetchDepositSum
 }
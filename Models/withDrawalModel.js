const pool = require('../config/database');

async function updateAccountBalance(Data){
    try {
       let sql = `UPDATE accounts SET Balance = Balance - ${Data.transferAmount} WHERE inputEmail = ? AND AccountID = ? AND Account_Number = ?`
        await pool.query(sql, [Data.inputEmail, Data.AccountID, Data.Account_Number ])
        return
    } catch (error) {
      console.log(error)
    }
  }

  async function postWithdrawalData(Data){
     try {
        let sql = 'INSERT INTO withdrawals SET ?'
        await pool.query(sql, Data)
     } catch (error) {
        
     }
  }


  module.exports = {
    updateAccountBalance, 
    postWithdrawalData
  }
const pool = require('../config/database');

async function FetchUserInfoForEmail(AccountID){
    try {
          let sql = `SELECT FirstName, LastName, inputEmail, AccountID FROM users WHERE AccountID = ?`;
          let [results] = await pool.query(sql, [AccountID]);
           if(results.length == 0){
             return {}
           }else{
             return results[0]
           }
    } catch (error) {
        console.log(error)
    }
}

async function UpdateVerificationStatus(AccountID){
  try {
      let sql = `UPDATE users SET verify_email = 'Yes' WHERE AccountID = ?`
       await pool.query(sql, [AccountID])
       return
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
    FetchUserInfoForEmail,
    UpdateVerificationStatus
}
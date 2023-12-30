const pool = require('../config/database')

async function CheckIfUserExist(inputEmail){
    try {
      const sql = `SELECT inputEmail, FirstName, LastName, AccountID, Account_Number FROM users WHERE inputEmail = ?`
       const [results] = await pool.query(sql, [inputEmail])
        if(results === 0){
            return null
        } else{
          return results[0]
        }
       
    } catch (error) {
       console.log(error)
    }
  }


  async function findUserEmail(AccountID, Account_Number){
    try {
      const sql = `SELECT inputEmail FROM users WHERE AccountID = ? AND Account_Number`
       const [results] = await pool.query(sql, [AccountID, Account_Number])
        if(results === 0){
            return {}
        } else{
          return results[0]
        }
       
    } catch (error) {
       console.log(error)
    }
  }


  async function UpdatePasswod(inputEmail, newpassword){
    try {
      const sql = `UPDATE users SET password = '${newpassword}' WHERE inputEmail = ?`;

       const [results] = await pool.query(sql, [inputEmail]);

        return results
        
    } catch (error) {
       console.log(error)
    }
  }




  module.exports = {
     CheckIfUserExist,
     UpdatePasswod,
     findUserEmail
  }
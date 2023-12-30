const pool = require('../config/database');

async function SavedNotification(Data){
    try {
          let sql = `INSERT INTO notifications SET ?`
          await pool.query(sql, Data)
    } catch (error) {
        console.log(error)
    }
}

async function FetchNotification(Data){
    try {
          let sql = `SELECT * FROM notifications WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND Status = ?`
          let [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number, 'Pending']);
           return results         
    } catch (error) {
        console.log(error)
    }
}


async function UpdateNotificationState(Data){
    try {
         let sql = `UPDATE notifications SET Status = 'Viewed' WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ? AND Reference = ?`
         await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number, Data.Reference]);
         return
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    SavedNotification,
    FetchNotification, 
    UpdateNotificationState
}
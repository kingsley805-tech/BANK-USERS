const pool = require('../config/database');

async function FetchTransaction(Data){
    try {
         let sql = 'SELECT * FROM transactions WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ? ORDER BY id DESC LIMIT 10'
         const [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number ]);
         return results
    } catch (error) {
        console.log(error)
    }
}

async function FetchTransactionHistory(Data){
    try {
         let sql = 'SELECT * FROM transactions WHERE inputEmail = ? AND Main_Account_ID = ? AND Main_Account_Number = ? ORDER BY id DESC'
         const [results] = await pool.query(sql, [Data.inputEmail, Data.Main_Account_ID, Data.Main_Account_Number ]);
         return results
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    FetchTransaction,
    FetchTransactionHistory
}
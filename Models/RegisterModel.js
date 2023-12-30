const pool = require('../config/database');

async function checkForEmail(email) {
  console.log(54)
  const sql = 'SELECT * FROM users WHERE inputEmail = ?';
  try {
    const [results] = await pool.query(sql, [email]);
    return { status: 'success', results };
  } catch (err) {
    console.log(err)
    return { status: 'failure', message: err.message };
  }
}


async function saveRegistrationData(data) {
  const sql = 'INSERT INTO users SET ?';
  try {
    const [results] = await pool.query(sql, data);
    //console.log(results)
    return { status: 'success', results };
  } catch (err) {
    console.log(err)
    return { status: 'failure', message: err.message };
  }
}


async function uploadPassport(Data){
  try {
    const sql = 'UPDATE users SET profilePhoto = ? WHERE AccountID = ? AND inputEmail = ?';
     await pool.query(sql, [Data.filename, Data.AccountID, Data.inputEmail]);
     return 
  } catch (error) {
    console.log(error)
  }
}

async function uploadIdCard(Data){
  try {
     const sql = 'UPDATE users SET idCardPhoto = ? WHERE AccountID = ? AND inputEmail = ?';
     await pool.query(sql, [Data.filename, Data.AccountID, Data.inputEmail]);
     return 
  } catch (error) {
    console.log(error)
  }
}


let GenerateIndex = () =>{
    const min = 10000000;
    const max = 99999999;
   return Math.floor(Math.random() * (max - min + 1) + min);
  }

  
module.exports = {
  checkForEmail,
  saveRegistrationData,
  uploadPassport,
  uploadIdCard
};

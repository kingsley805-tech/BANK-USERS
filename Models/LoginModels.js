const { transformAuthInfo } = require('passport');
const pool = require('../config/database');

async function LoginEmailCheck(email) {
    //console.log('nbbtttt')
    const sql = 'SELECT * FROM users WHERE inputEmail = ?';
    try {
        let [results] = await pool.query(sql, [email])
        return { status: 'success', results:results }
    } catch (error) {
        console.log(error)
        return { status: 'failure', message: error };

    }
}


async function otpCheck(inputEmail, Code) {
  try { 
    const sql = `SELECT * FROM otps WHERE inputEmail = ? AND Code = ?`
    let [results] = await pool.query(sql, [index])
     if(results.length === 0){
        return null
     }else{
        return results[0]
     }
    
  } catch (error) {
    console.log(error)
    return
  }

}

async function saveOtpCode(Data){
   try {
        let sql = `INSERT INTO otps SET ?`;
        await pool.query(sql, Data)
        return null
   } catch (error) {
      console.log(error);
   }
}

async function deleteOtpCode(inputEmail){
   try {
       let sql = `DELETE FROM otps WHERE inputEmail = ?`;
       await pool.query(sql, [inputEmail]);
       return null
   } catch (error) {
    console.log(error);
     return null
   }
}


async function verifyOtpCode(inputEmail, Code){
   try {

       let sql = `SELECT * FROM otps WHERE inputEmail = ? AND Code = ?`
       let [results] = await pool.query(sql, [inputEmail, Code]);
       if(results === 0){
         return null
       }else{
          return results[0]
       }
   } catch (error) {
      console.log(error);
      return error
   }
}

module.exports = {
    LoginEmailCheck,
    otpCheck,
    saveOtpCode, 
    deleteOtpCode,
    verifyOtpCode
}

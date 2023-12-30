const pool = require('../config/database');

async function profile(inputEmail){
    try {
          let sql = `SELECT * FROM users WHERE inputEmail = ?`
          let [results] = await pool.query(sql, [inputEmail]);
          if(results.length === 0){
            return {}
          }else{
            return results[0]
          }
                   
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    profile
}
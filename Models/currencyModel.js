const pool = require('../config/database');

async function usdAccountmodel(sql, values){
    try {
          let [results] = await pool.query(sql, values);
          if(results.length === 0){
             return {Balance: 0}
          }else{
            return results[0]
          }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    usdAccountmodel
}
const pool = require('../config/database');

async function BalanceModel(sql, value){
   try {
        let [results] = await pool.query(sql, value)
         if(results.length === 0){
            return{Balance:0}
         }else{
            return results[0]
         }
   } catch (error) {
     console.log(error)
   }
}


module.exports = {
    BalanceModel
}
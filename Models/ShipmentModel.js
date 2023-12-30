const pool = require('../config/database')

async function saveShipmentPost(Data){
    const sql = `INSERT INTO shipments SET ?`
    try {
      const savePost = await pool.query(sql, Data)
       return savePost 
    } catch (error) {
        console.log(error)
    }
}


async function fetchAllShipments(){
    try {
      const sql = `SELECT * FROM shipments`
       const [results] = await pool.query(sql)
         return results
    } catch (error) {
       console.log(error)
    }
  }


  async function PendingShipments(){
    try {
      const sql = `SELECT * FROM shipments`
       const [results] = await pool.query(sql)
         return results
    } catch (error) {
       console.log(error)
    }
  }


  async function ShipmentDetail(ShipmentNumber, ID){
    try {
      const sql = `SELECT * FROM shipments WHERE ShipmentNumber =? AND id = ?`
       const [results] = await pool.query(sql, [ShipmentNumber, ID])
         if(results.length === 0){
            return  {}
         }else{
            return results[0]
         }
    } catch (error) {
       console.log(error)
    }
  }

  async function DeleteShipment (ShipmentNumber){
     try {
        let sql = `DELETE FROM shipments WHERE ShipmentNumber =?`
        const [results] = await pool.query(sql, [ShipmentNumber])
        return 
     } catch (error) {
        console.log(error)
     }
  }


  async function DeleteComments (ShipmentNumber, ID){
   try {
      let sql = `DELETE FROM comments WHERE ShipmentNumber =? AND id = ?`
      const [results] = await pool.query(sql, [ShipmentNumber, ID])
      return 
   } catch (error) {
      console.log(error)
   }
}

  async function EditShipmentPage(ShipmentNumber, ID){
   try {
     const sql = `SELECT * FROM shipments WHERE ShipmentNumber =? AND id = ?`
      const [results] = await pool.query(sql, [ShipmentNumber, ID])
        if(results.length === 0){
           return  {}
        }else{
           return results[0]
        }
   } catch (error) {
      console.log(error)
   }
 }

  async function ShipmentUpdate (Data){
    try {
      let sql = `UPDATE shipments SET
      Payment_Status = '${Data.Payment_Status}',
      Delivery_Status = '${Data.Delivery_Status}',
      Shipment_Item = '${Data.Shipment_Item}',
      City_Collection = '${Data.City_Collection}',
      Origin_city = '${Data.Origin_city}',
      Shipping_date = '${Data.Shipping_date}',
      Shipping_time = '${Data.Shipping_time}',
      Contact_name = '${Data.Contact_name}',
      Contact_address = '${Data.Contact_address}',
      Shipping_quantity = '${Data.Shipping_quantity}',
      Total_weight = '${Data.Total_weight}',
      Destination_city = '${Data.Destination_city}',
      Delivery_city = '${Data.Delivery_city}',
      Recipient_Shipping_time = '${Data.Recipient_Shipping_time}',
      Delivery_time = '${Data.Delivery_time}',
      Recipient_Contact_name = '${Data.Recipient_Contact_name}',
      Recipient_Contact_address = '${Data.Recipient_Contact_address}'
    WHERE ShipmentNumber = ?`;

       const [results] = await pool.query(sql, [Data.ShipmentNumber])
       return 
    } catch (error) {
       console.log(error)
    }
 }


 async function SaveNewComments(Data){
   const sql = `INSERT INTO comments SET ?`
   try {
     const savePost = await pool.query(sql, Data)
      return savePost 
   } catch (error) {
       console.log(error)
   }
}


 async function TrackShipmentModel(ShipmentNumber){
    try {
      const sql = `SELECT * FROM shipments WHERE ShipmentNumber = ?`
       const [results] = await pool.query(sql, [ShipmentNumber])
         if(results.length === 0){
            return 
         }else{
            return results[0]
         }
    } catch (error) {
       console.log(error)
    }
  }



  async function FindDetailShipmentModel(ShipmentNumber, ID){
   try {
     const sql = `SELECT * FROM shipments WHERE ShipmentNumber = ? AND id = ?`
      const [results] = await pool.query(sql, [ShipmentNumber, ID])
        if(results.length === 0){
           return 
        }else{
           return results[0]
        }
   } catch (error) {
      console.log(error)
   }
 }


 async function FindRelatedComments(ShipmentNumber){
   try {
     const sql = `SELECT * FROM comments WHERE ShipmentNumber = ?`
      const [results] = await pool.query(sql, [ShipmentNumber])
       return results
   } catch (error) {
      console.log(error)
   }
 }


module.exports = {
  saveShipmentPost,
  fetchAllShipments,
  PendingShipments,
  ShipmentDetail, 
  DeleteShipment,
  ShipmentUpdate,
  TrackShipmentModel,
  FindDetailShipmentModel,
  EditShipmentPage,
  SaveNewComments,
  FindRelatedComments,
  DeleteComments
  
}
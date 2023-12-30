const {saveShipmentPost, fetchAllShipments, ShipmentDetail, DeleteShipment, ShipmentUpdate, TrackShipmentModel, FindDetailShipmentModel, EditShipmentPage, SaveNewComments, FindRelatedComments, DeleteComments} = require('../Models/ShipmentModel')

const ShipmentForm = async (req, res) => {
    return res.render('shipment-forms')
}

const ShipmentNewPost = async (req, res) => {
    let City_Collection = req.body.City_Collection
    let Origin_city = req.body.Origin_city
    let Shipping_date = req.body.Shipping_date
    let Shipping_time = req.body.Shipping_time
    let Contact_name = req.body.Contact_name
    let Contact_address = req.body.Contact_address
    let Shipping_quantity = req.body.Shipping_quantity
    let Total_weight = req.body.Total_weight
    let Destination_city = req.body.Destination_city
    let Delivery_city = req.body.Delivery_city

    let Recipient_Shipping_time = req.body.Recipient_Shipping_time
    let Delivery_time = req.body.Delivery_time
    let Recipient_Contact_name = req.body.Recipient_Contact_name
    let Recipient_Contact_address = req.body.Recipient_Contact_address
    let Payment_Status = req.body.Payment_Status
    let Shipment_Item = req.body.Shipment_Item 
    let Delivery_Status = req.body.Delivery_Status

    let ShipmentNumber = GenerateIndex()
    let wordDate = new Date().toDateString()


    let Data = {City_Collection, Origin_city, Shipping_date, Shipping_time, Contact_name, Contact_address, Shipping_quantity, Total_weight, Destination_city, Delivery_city, Recipient_Shipping_time, Delivery_time,  Recipient_Contact_name , Recipient_Contact_address, Payment_Status, ShipmentNumber, wordDate, Shipment_Item, Delivery_Status   }

    let Datatwo = {title: 'Approved', Comments:'Shipping Created', Comment_Date:Shipping_date, Time:Shipping_time, ShipmentNumber:ShipmentNumber}

    await saveShipmentPost(Data)

    return res.json({Mes:'Shipment saved successfully'})
    
}

const AllShipment = async (req, res) => {
    let results = await fetchAllShipments()
    res.render('shipmentlist', {results:results})
}



const ShipmentDetailItems = async (req, res) => {
    let ShipmentNumber = (req.body.ShipmentNumber).trim()
    let ID = (req.body.ID).trim()
    let Data = await ShipmentDetail(ShipmentNumber, ID)
    res.json({Data:Data})
}


const ShipmentItemDelete = async (req, res) => {
    let ShipmentNumber = (req.body.ShipmentNumber).trim()
    await DeleteShipment(ShipmentNumber)
    res.json({Mes: 'Shipment deleted successfully'})
}

const CommentsItemDelete = async (req, res) => {
    let ShipmentNumber = (req.body.ShipmentNumber).trim()
    let ID = (req.body.ID).trim()
    await DeleteComments(ShipmentNumber, ID)
    res.json({Mes: 'Shipment deleted successfully'})
}


const UpdateShipment = async (req, res) => {
    let ShipmentNumber = (req.body.ShipmentNumber).trim()
    let ID = (req.body.ID).trim()

    let title = (req.body.title)
    let Comments = (req.body.Comments)
    let Comment_Date = (req.body.Comment_Date)
    let Time = (req.body.Time)
    let Payment_Status = (req.body.Payment_Status)
    let Delivery_Status = req.body.Delivery_Status

    let Data = {title, Comments, Comment_Date, Time, ShipmentNumber}


    await SaveNewComments(Data)


    res.json({Mes: 'Shipment Updated successfully'})
}




const UpdateShipmentTwo = async (req, res) => {
    let ShipmentNumber = (req.body.ShipmentNumber).trim()
    let Data = req.body

    //console.log(Data)


    await ShipmentUpdate(Data)


    res.json({Mes: 'Shipment Updated successfully'})
}





const TrackShipment = async (req, res) => {
    let ShipmentNumber = (req.body.ShipmentNumber).trim()
    
    let Data = await TrackShipmentModel(ShipmentNumber)

    let Comments = await FindRelatedComments(ShipmentNumber)

    if(Data){
       return res.render('detail', {Data:Data, Comments:Comments} )
    }else{
       return res.render('notfound', {Data:{ShipmentNumber} } )
    }
 
}


const FindShipmentDetails = async (req, res) => {
    let ShipmentNumber = (req.query.shipmentnumber).trim()
    let ID = (req.query.ID).trim()
    let Data = await FindDetailShipmentModel(ShipmentNumber,ID)

    let Comments = await FindRelatedComments(ShipmentNumber)

    if(Data){
       return res.render('dashdetail', {Data:Data, Comments:Comments} )
    }else{
      return res.render('dashdetail', {Data:{ShipmentNumber} } )
    }
 
}


const EditShipmentPageController = async (req, res) => {
    let ShipmentNumber = (req.query.shipmentnumber).trim()
    let ID = (req.query.ID).trim()
    let Data = await EditShipmentPage(ShipmentNumber,ID)

    if(Data){
       return res.render('editshipment', {Data:Data} )
    }else{
      return res.render('editshipment', {Data:{} } )
    }
 
}


const EditShipmentTwo = async (req, res) => {
    let ShipmentNumber = (req.query.shipmentnumber).trim()
    let ID = (req.query.ID).trim()
    let Data = await EditShipmentPage(ShipmentNumber,ID)

    if(Data){
       return res.render('edit-2', {Data:Data} )
    }else{
      return res.render('edit-2', {Data:{} } )
    }
 
}


const commentlist = async (req, res) => {
    let ShipmentNumber = (req.query.shipmentnumber).trim()
    let Data = await FindRelatedComments(ShipmentNumber)

     return res.render('comments', {Data:Data} )

 
}


let GenerateIndex = () =>{
    const min = 10000000;
    const max = 99999999;
   return Math.floor(Math.random() * (max - min + 1) + min);
  }


module.exports = {
    ShipmentForm,
    ShipmentNewPost,
    AllShipment, 
    ShipmentDetail, 
    ShipmentItemDelete,
    ShipmentDetailItems,
    UpdateShipment, 
    TrackShipment,
    FindShipmentDetails, 
    EditShipmentPageController,
    CommentsItemDelete,
    commentlist,
    EditShipmentTwo,
    UpdateShipmentTwo

}
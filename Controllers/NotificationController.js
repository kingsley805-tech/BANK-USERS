const {UpdateNotificationState} = require('../Models/notificationModel')

const RemoveNotification = async(req, res) => {
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();
    let inputEmail = (req.user.inputEmail).trim();
    let Reference = (req.body.Reference).trim();
    let Data = {Main_Account_ID, Main_Account_Number, inputEmail, Reference}
     await UpdateNotificationState(Data)
     return res.json({Mes:'Sucess'})

}

module.exports = {
    RemoveNotification
}
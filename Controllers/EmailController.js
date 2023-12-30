const {emailVerification} = require('../utils/email.util')
const {UpdateVerificationStatus} = require('../Models/emailModel')

const EmailVerificationPost = async(req, res) => {
  let Data = req.body
  await emailVerification(Data);
  return res.json('Email sent successfully')
}

const VerificationFromMail = async(req, res)=>{
    let AccountID = (req.params.AccountID).trim();
     await UpdateVerificationStatus(AccountID)
     res.render('verification-success')
}

module.exports = {
    EmailVerificationPost,
    VerificationFromMail
}
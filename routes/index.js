let express = require('express')
let router = express.Router()

// const {Logout} = require('../Controllers/LoginController')
 const {isAuthenticated} = require('../config/isAuth')
 const {FetchTransaction} = require('../Models/transactionModel')
 const {FetchNotification} = require('../Models/notificationModel')
 const {TotalAccountBalance} = require('../Controllers/AccountController')
 const {TotalDepositAmount} = require('../Controllers/DepositController')
 const {TotalTransferAmount} = require('../Controllers/TransferController')
 const {isApproved} = (require('../config/isApproved'))
 const {FetchUserInfoForEmail} = require('../Models/emailModel')
 const {EmailVerificationPost, VerificationFromMail} = require('../Controllers/EmailController')
 const {profile} = require('../Models/profileModel')


router.get('/', (req, res) => {
    res.render('index')
})


router.get('/account-register', (req, res) => {
    res.render('register-2')
})

router.get('/login', (req, res) => {
 res.render('login-2')

})

router.get('/legal', (req, res) => {
    res.render('legal')
})


router.get('/register-success', (req, res) => {
    res.render('success')
})

router.get('/forget-password-page', (req, res) => {
    res.render('forgetpassword')
})

router.get('/determine-status', (req, res) => {
    let Status = req.user.Status
   if(Status === 'Pending'){
     res.redirect('/register-success')
   }else{
    res.redirect('/dashboard')
   }
})

router.get('/profile', isAuthenticated, async(req, res) => {
   const User = await profile(req.user.inputEmail)
    res.render('profile', {User:User})
})

router.get('/dashboard', isAuthenticated, async(req, res) => {
    let inputEmail = (req.user.inputEmail).trim();
    let Main_Account_ID = (req.user.AccountID).trim();
    let Main_Account_Number = (req.user.Account_Number).trim();

    let Data = {inputEmail, Main_Account_ID, Main_Account_Number};

    let results = await FetchTransaction(Data)
    let Notification = await FetchNotification(Data)
    res.render('dashboard', {User:req.user, results, Notification})
})

router.get('/account-blocked', (req, res) => {
    res.render('account-blocked')
})

router.get('/verify-email', (req, res) => {
    let User = req.user
   let Data = {AccountID:User.AccountID, FirstName:User.FirstName, LastName:User.LastName, inputEmail:User.inputEmail}
  res.render('verify-email', {Data})
})

router.get('/register-verification/:accountID', async(req, res) => {
    let AccountID = (req.params.accountID).trim()
    let Data = await FetchUserInfoForEmail(AccountID)
    res.render('verify-email', {Data})
})


router.post('/check-user-authentication', (req, res) => {
  if(req.user == undefined){
    res.status(404).json()
  }else{
    res.status(200).json({})
  }
})

router.post('/total-account-balance', isAuthenticated, TotalAccountBalance );
router.post('/total-deposit-amount', isAuthenticated, TotalDepositAmount);
router.post('/total-transfer-amount', isAuthenticated, TotalTransferAmount)
router.post('/send-verification-mail', EmailVerificationPost)
router.get('/user-verify-email/:AccountID', VerificationFromMail)




 module.exports = router;
 const express = require('express');
const router = express.Router();
const passportUpload = require('../config/multer')


 const {Registration, uploadPassportCon,uploadIdCardCon, uploadPassportPage, uploadIdCardPage} = require('../Controllers/RegisterController')
 const {newLogin,Logout, twoFactorAuth, VerifyOTPCode} = require('../Controllers/LoginController')
 const {ForgetPassWord, UpdatePassword, resetPasswordPage}  = require('../Controllers/ForgetPasswordController')

router.post('/register', Registration)
router.get('/register-upload-passport/:AccountID/:inputEmail', uploadPassportPage)
router.get('/register-upload-id-card/:AccountID/:inputEmail', uploadIdCardPage)


router.post('/upload-profile-Picture', passportUpload.single('image'), uploadPassportCon)
router.post('/upload-id-card', passportUpload.single('image'), uploadIdCardCon)


router.post('/login', newLogin )
router.get('/logout', Logout)

router.post('/forget-password', ForgetPassWord)

router.get('/user-reset-password/:AccountID/:Account_Number', resetPasswordPage)

router.post('/update-password', UpdatePassword);

router.get('/two-factor-auth', twoFactorAuth)





 module.exports = router;

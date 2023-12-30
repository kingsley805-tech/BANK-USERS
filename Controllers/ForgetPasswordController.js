const bcrypt = require('bcryptjs');
const {CheckIfUserExist, UpdatePasswod, findUserEmail} = require('../Models/ForgetPassword');
const {ResetPasswordLink} = require('../utils/email.util')


const ForgetPassWord = async(req, res) => {
    let inputEmail = (req.body.inputEmail).trim()

    const result =  await CheckIfUserExist(inputEmail)

    if(!result){

        return res.json({mes: 'The email is not registered'});

    }else{
         
         ResetPasswordLink(result);

        return res.json({mes: 'An email reset link has been sent to your email'})
    }
}


 const resetPasswordPage = async(req, res) => {
    
     let AccountID = (req.params.AccountID).trim();
     
     let Account_Number = (req.params.Account_Number).trim()

     let user = await findUserEmail(AccountID, Account_Number)

      res.render('reset-password', {inputEmail:user.inputEmail});
 }


const UpdatePassword = async (req, res) => {
    try {
        let inputEmail = (req.body.inputEmail).trim();

        let password = (req.body.newpassword).trim()

        let salt = bcrypt.genSaltSync(10);
        
        let newpassword = bcrypt.hashSync(password, salt);

        await UpdatePasswod(inputEmail, newpassword)

        res.json({mes: 'Password Changed'});

    } catch (error) {

        console.log(error)
    }
}

module.exports = {
    ForgetPassWord,
    UpdatePassword,
    resetPasswordPage
}
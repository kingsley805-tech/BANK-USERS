const bcrypt = require('bcryptjs');
const { checkForEmail, saveRegistrationData, uploadPassport, uploadIdCard } = require('../Models/RegisterModel');


const Registration = async (req, res) => {
  const errors = [];
  try {
    // Generate and format today's date
    const today = new Date();
    const stringDate = today.toLocaleDateString();
    const wordDate = today.toDateString();
    const year = today.getFullYear();
    const AccountID =today.getTime()
    const Account_Number = GenerateIndex()
    const Status = 'Pending'

 
  
    // Validate password length and match
    if (req.body.password.length < 7) {
     
      errors.push({ msg: 'Passwords should be at least 7 characters long!' });
    } else if (req.body.password !== req.body.Confirmpassword) {
      errors.push({ msg: 'Passwords do not match' });
    }

    // Check for any errors generated
    if (errors.length > 0) {
      console.log(errors)
      return res.render('register', { errors, Title: '' });
    }

    // Check if email already exists
    const mailCheck = await checkForEmail(req.body.Email);
    //console.log(mailCheck)
    if (mailCheck.results.length > 0) {
      errors.push({ msg: 'Email address already exists' });
      return res.render('register', { errors});
    }

    const salt = bcrypt.genSaltSync(10);

    // Create user information
    const userData = {
      Account_Type:req.body.Account_Type,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Telephone: req.body.Telephone,
      inputEmail: req.body.inputEmail,
      Address: req.body.Address,
      Address_Two: req.body.Address_Two,
      City: req.body.City,
      Region: req.body.Region,
      CountryCode: req.body.CountryCode,
      Country: req.body.Country,

      Date_of_birth:req.body.Date_of_birth,
      Social_Security:req.body.Social_Security,
      Telephone_Mobile: req.body.Telephone_Mobile,
      Telephone_Office:req.body.Telephone_Office,
      Next_of_Kin: req.body.Next_of_Kin,
      Next_of_Kin_address: req.body.Next_of_Kin_address,
      Next_of_kin_telephone: req.body.Next_of_kin_telephone,
      profilePhoto: '',
      idCardPhoto: '',

      wordDate:wordDate,
      stringDate:stringDate,
      AccountID:AccountID,
      Account_Number:Account_Number,
      Status:Status,
      verify_email: 'No',
     
      password: bcrypt.hashSync(req.body.password, salt),
    };

    // Save user data to database
    await saveRegistrationData(userData);
     //console.log(56)
    req.flash('success_msg', 'You are now registered and you can log in');
    return res.redirect(`/register-upload-passport/${AccountID}/${req.body.inputEmail}`)
  } catch (error) {
    console.log(error);
    errors.push({ msg: 'Problem occured during registration' });
    return res.render('register-2');
  }
}


const uploadPassportPage = (req, res) => {
  try {
    
       let AccountID = req.params.AccountID
       let inputEmail = req.params.inputEmail
       let Data = {AccountID, inputEmail}
       return res.render('passportphoto', {Data})
  } catch (error) {
    console.log(error);
  }
}

const uploadIdCardPage = (req, res) => {
  try {
    
       let AccountID = req.params.AccountID
       let inputEmail = req.params.inputEmail
       let Data = {AccountID, inputEmail}
       return res.render('uploadIdCard', {Data})
  } catch (error) {
    console.log(error);
  }
}

const uploadPassportCon = async(req, res) => {
  try {
    console.log(req.file)
      let AccountID = (req.body.AccountID).trim()
      let inputEmail = (req.body.inputEmail).trim()
      let filename = (req.file.filename).trim()
      let Data = {AccountID, inputEmail, filename}
      await uploadPassport(Data)

      return res.redirect(`/register-upload-id-card/${AccountID}/${inputEmail}`)
  } catch (error) {
    console.log(error);
  }
}


const uploadIdCardCon = async(req, res) => {
  try {
      let AccountID = (req.body.AccountID).trim()
      let inputEmail = (req.body.inputEmail).trim()
      let filename = (req.file.filename).trim()
      let Data = {AccountID, inputEmail, filename}
      await uploadIdCard(Data)

      return res.redirect(`/register-verification/${AccountID}`);
  } catch (error) {
    console.log(error);
  }
}

let GenerateIndex = () =>{
  const min = 1000000000;
  const max = 9999999999;
 return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports ={
    Registration,
    uploadPassportCon,
    uploadIdCard,
    uploadIdCardCon,
    uploadPassportPage,
    uploadIdCardPage
}


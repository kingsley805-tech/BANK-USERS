let express = require('express');
let router = express.Router();

////////////////////is authenticated function prevent someone to access secured pages without login.
const {isAuthenticated} = require('../config/isAuth')
const {accountPage, accountDetails, createAdditional, createAccountPage} = require('../Controllers/AccountController');
const {depositPage, accountDetailForDeposit, PostDepositDetails, DepositCardMethod, CreatenewCardsService, CardDetailsView, CardServicesPage, UpdateDepositPost, depositSuccessPage, DepositWireTransfer} = require('../Controllers/DepositController');

const {fetchTransactionController} = require('../Controllers/TransactionController');
const {PostTransferController, PostTransferUpdate, SencondPostTransferController, TransferSuccess, transferPage, FetchReceiverInfo} = require('../Controllers/TransferController');
const {PostWithDrawal, WithDrawalSuccess, withdrawalPage} = require('../Controllers/WithdrawController');
const {StatementFormPage, FetchStatementController} = require('../Controllers/StatementController')
const {RemoveNotification} = require('../Controllers/NotificationController');
const {USDControllerPage, GBPControllerPage, EuroControllerPage, CADControllerPage} = require('../Controllers/CurrencyController');

const {UsdBalance, EuroBalance, GBPBalance, CadBalance} = require('../Controllers/AutomaticControllers')

const { VerifyOTPCode} = require('../Controllers/LoginController')

/////////Open the account user's page. import the the controller function from accountController
router.get('/user-account', isAuthenticated, accountPage);
//////////////Fetch details of particular account
router.post('/get-account-details', isAuthenticated, accountDetails);


///////////////////Creating new account page and post route///////
router.get('/create-new-account', isAuthenticated, createAccountPage);
router.post('/create-additional-account', isAuthenticated, createAdditional );

//////////Open deposit page /////////////////
router.get('/user-deposit', isAuthenticated, depositPage);
router.post('/deposit-find-account-detail', isAuthenticated, accountDetailForDeposit);
router.post('/post-deposit-form', isAuthenticated, PostDepositDetails);
router.get('/user-continue-deposit-card', isAuthenticated, DepositCardMethod);
router.post('/update-deposit-form', isAuthenticated, UpdateDepositPost)
router.get('/deposit-succcess-page', isAuthenticated, depositSuccessPage)
router.get('/user-continue-deposit-wire-transfer', isAuthenticated, DepositWireTransfer)

///////////////////////////////Card Services////////////////////
router.get('/user-card-service', isAuthenticated, CardServicesPage )
router.post('/create-new-card', isAuthenticated, CreatenewCardsService)
router.post('/selected-card-details', isAuthenticated, CardDetailsView)

//////////////////Transaction history route////////
router.get('/user-transction-history', isAuthenticated,fetchTransactionController )

////////////////////////Transfer handles routes/////////////////////
router.get('/user-transfer-page', isAuthenticated, transferPage);
router.post('/transfer-post-data', isAuthenticated, PostTransferController);
router.get('/transfer-data-page-two', isAuthenticated, SencondPostTransferController);
router.post('/transfer-post-data-update', isAuthenticated, PostTransferUpdate);
router.get('/transfer-success', isAuthenticated, TransferSuccess);
router.post('/transfer-fetch-receiver-info', isAuthenticated, FetchReceiverInfo);

////////////////////Withdrawal //////////////////
router.get('/user-withdrawal-page', isAuthenticated, withdrawalPage)
router.post('/post-withdrawal-data', isAuthenticated, PostWithDrawal );
router.get('/withdrawal-success', isAuthenticated, WithDrawalSuccess);

/////////////////////Statement page////////////////
 router.get('/user-statement-form', isAuthenticated, StatementFormPage);
 router.post('/user-statement-page', isAuthenticated, FetchStatementController)


 /////////////////////////Remove notification////////////////////////////////
 router.post('/remove-notification-post', isAuthenticated, RemoveNotification);

 ////////////////////////////Account page /////////////////
 router.get('/usd-account-page', isAuthenticated, USDControllerPage);
 router.get('/gbp-account-page', isAuthenticated, GBPControllerPage);
 router.get('/euro-account-page', isAuthenticated, EuroControllerPage);
 router.get('/cad-account-page', isAuthenticated, CADControllerPage);


 //////////////////////Automatic Routes/////////////////////
 router.post('/automatic-balance-usd', isAuthenticated, UsdBalance);
 router.post('/automatic-balance-gbp', isAuthenticated, GBPBalance);
 router.post('/automatic-balance-euro', isAuthenticated, EuroBalance);
 router.post('/automatic-balance-cad', isAuthenticated, CadBalance);

 router.post('/test/verifycode', VerifyOTPCode)

 
module.exports = router;
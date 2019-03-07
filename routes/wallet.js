const express = require('express');

const walletController = require('../controllers/wallet');
const transactionController = require('../controllers/transaction')
const validatorController = require('../controllers/validator');

const router = express.Router();


router.get('/wallet-info', walletController.getWallet);

router.post('/wallet/recover', walletController.postRecoverWallet)

router.post('/wallet/create', walletController.postCreateWallet)

router.post('/wallet/transact', transactionController.postTransact);

router.post('/wallet/validate', validatorController.postValidateBlock);

router.get('/wallet/validate-transactions', validatorController.getValidateTransactions);

module.exports = router;
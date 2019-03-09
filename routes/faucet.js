const express = require('express');

const transactionController = require('../controllers/transaction');

const router = express.Router();

// router.post('/validate', validatorController.postValidateBlock);
router.post('/faucet/request', transactionController.postRequest);

module.exports = router;
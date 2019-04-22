const express = require('express');

const transactionController = require('../controllers/transaction');

const router = express.Router();

router.post('/faucet/request', transactionController.postRequest);

module.exports = router;
const express = require('express');

const blockchainController = require('../controllers/blockchain');
const transactionController = require('../controllers/transaction');
const walletController = require('../controllers/wallet')

const router = express.Router();

router.get('/explorer/api/blocks', blockchainController.getBlocks);

router.get('/explorer/api/blocks/:blockId', blockchainController.getBlock);

router.get('/explorer/api/transactions', transactionController.getConfirmedTransaction);

router.get('/explorer/api/transaction-pool-map', transactionController.getTransactionMap);

router.get('/explorer/api/accounts', walletController.getAccounts);

module.exports = router;
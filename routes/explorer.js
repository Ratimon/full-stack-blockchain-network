const express = require('express');

const blockchainController = require('../controllers/blockchain');
const transactionController = require('../controllers/transaction');
// const validatorController = require('../controllers/validator');


const router = express.Router();

router.get('/explorer/blocks', blockchainController.getBlocks);

router.get('/explorer/blocks/:blockId', blockchainController.getBlock);

router.get('/explorer/transactions', transactionController.getConfirmedTransaction);

router.get('/explorer/transaction-pool-map', transactionController.getTransactionMap);




module.exports = router;
const express = require('express');

const walletController = require('../controllers/wallet');
const transactionController = require('../controllers/transaction')
const minerController = require('../controllers/miner');

const router = express.Router();


router.get('/wallet-info', walletController.getWallet);

router.post('/wallet/recover', walletController.postRecoverWallet)

router.post('/wallet/create', walletController.postCreateWallet)

router.post('/wallet/transact', transactionController.postTransact);

router.get('/wallet/mine-transactions', minerController.getMineTransactions);

router.get('/wallet/start-mining-transactions', minerController.getStartMiningTransactions);

router.get('/wallet/stop-mining', minerController.getStopMining);


module.exports = router;
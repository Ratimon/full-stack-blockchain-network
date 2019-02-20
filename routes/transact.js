const express = require('express');

const transactController = require('../controllers/transact');

const router = express.Router();

router.post('/transact', transactController.transact);
router.get('/transaction-pool-map', transactController.getTransactionMap);


module.exports = router;
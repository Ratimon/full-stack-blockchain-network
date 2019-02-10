const express = require('express');

const validatorController = require('../controllers/validator');

const router = express.Router();

router.get('/blocks', validatorController.getBlocks);

router.get('/blocks/:blockId', validatorController.getBlock);

router.post('/validate', validatorController.postValidateBlock);


module.exports = router;
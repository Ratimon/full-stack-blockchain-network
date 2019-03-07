const express = require('express');

const validatorController = require('../controllers/validator');

const router = express.Router();

router.post('/validate', validatorController.postValidateBlock);


module.exports = router;
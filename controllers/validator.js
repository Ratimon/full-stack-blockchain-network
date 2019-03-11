const { transactionPool, transactionValidator} = require('../backend/index');


exports.getValidateTransactions = (req, res) => {
    // try {
    if (transactionPool.transactionMap!=={}) {
        transactionValidator.validateTransaction();
        res.json(transactionPool.transactionMap)
    }
    // catch(error) {
    //     return res.status(400).json({ type: 'error', message: error.message});
    // }
    // res.json(transactionPool.transactionMap)

};


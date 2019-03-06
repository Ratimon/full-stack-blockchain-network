const {blockchain, pubsub, transactionPool, transactionValidator} = require('../backend/index');

exports.postValidateBlock = (req, res, next) => {

    const {data} = req.body;
    //TODO: handling balance and address parameters
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    // res.redirect('explorer/blocks');
};

exports.getValidateTransactions = (req, res) => {

    // try {
        transactionValidator.validateTransaction();
    // } catch(error) {
    //     return res.status(400).json({ type: 'error', message: error.message});
    // }

    res.json(transactionPool.transactionMap)

};


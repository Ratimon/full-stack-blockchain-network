// const { transactionPool, transactionValidator} = require('../backend/index');
const { transactionMiner} = require('../network/index');


exports.getMineTransactions = (req, res) => {

        transactionMiner.mineTransaction();
        res.end();

};

exports.getStartMiningTransactions = (req, res) => {

    // if (transactionPool.transactionMap!=={}) {
        // transactionValidator.validateTransaction();
        transactionMiner.startMining();
        res.end();
        // res.json(transactionPool.transactionMap)
    // }

};

exports.getStopMining = (req, res) => {

        transactionMiner.stopMining();
        res.end();

};



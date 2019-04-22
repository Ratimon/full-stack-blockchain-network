const { transactionMiner} = require('../network/index');


exports.getMineTransactions = (req, res) => {

        transactionMiner.mineTransaction();
        res.end();

};

exports.getStartMiningTransactions = (req, res) => {

        transactionMiner.startMining();
        res.end();

};

exports.getStopMining = (req, res) => {

        transactionMiner.stopMining();
        res.end();

};



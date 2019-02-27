// const Blockchain = require('../model/blockchain');
// const blockchain = require('../model/index')
const {blockchain, pubsub, transactionValidator} = require('../network/index');


exports.getBlocks = (req, res, next) => {
    // TODO: File System implemenatation
    // Blockchain.fetchAll(blocks => {
    //     res.json(blocks);
    // });
    res.json(blockchain.chain);
};

exports.getBlock = (req, res, next) => {
    const {blockId} = req.params;
    res.json(blockchain.chain[blockId]);
};

exports.postValidateBlock = (req, res, next) => {

    const {data} = req.body;
    //TODO: handling balance and address parameters
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('/blocks');
};

exports.getValidateTransactions = (req, res) => {

    transactionValidator.validateTransaction();

    res.redirect('/blocks');
};


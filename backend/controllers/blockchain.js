const {blockchain} = require('../network/index');


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
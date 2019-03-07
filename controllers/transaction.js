const {blockchain, pubsub, wallet, transactionPool} = require('../backend/index')


exports.postTransact = (req, res) => {
    const {amount, recipient} = req.body;

    let transaction = transactionPool
        .existingTransaction({ inputAddress: wallet.publicKey});

    try {
        if (transaction) {
            transaction.update({ senderWallet: wallet, recipient, amount});
        } else {
            transaction = wallet.createTransaction({
                recipient,
                amount,
                chain: blockchain.chain
            });
        }
    } catch(error) {
        return res.status(400).json({ type: 'error', message: error.message});
    }

    transactionPool.setTransaction(transaction);

    pubsub.broadcastTransaction(transaction);

    res.json({type: 'success',transaction})

    // res.redirect('wallet-info');

};

exports.getTransactionMap = (req, res) => {
    res.json(transactionPool.transactionMap)
};
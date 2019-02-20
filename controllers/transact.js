const Wallet = require('../wallet/index')
// const TransactionPool = require('../wallet/transaction-pool');

const {pubsub, transactionPool} = require('../network/index')
const wallet = new Wallet();


exports.transact = (req, res) => {
    const {amount, recipient} = req.body;

    let transaction = transactionPool
        .existingTransaction({ inputAddress: wallet.publicKey});

    try {
        if (transaction) {
            transaction.update({ senderWallet: wallet, recipient, amount});
        } else {
            transaction = wallet.createTransaction({recipient, amount});
        }
    } catch(error) {
        return res.status(400).json({ type: 'error', message: error.message});
    }

    transactionPool.setTransaction(transaction);

    pubsub.broadcastTransaction(transaction);

    // console.log('transactionPool', transactionPool);

    res.json({type: 'success',transaction})
};

exports.getTransactionMap = (req, res) => {
    res.json(transactionPool.transactionMap)
};
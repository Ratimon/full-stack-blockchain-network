const {blockchain, pubsub, wallet, transactionPool, faucetWallet} = require('../network/index');

exports.getTransactionMap = (req, res) => {

    res.json(transactionPool.transactionMap)
};

exports.getConfirmedTransaction = (req, res) => {

    let transactions = []

    for (let i=blockchain.chain.length-1; i>-1; i--) {
        const block = blockchain.chain[i];

        for (let transaction of block.data.reverse()) {
            transactions.push(transaction);
        }
    }

    res.json(transactions);
};

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


};

exports.postRequest = (req, res) => {
    // const recipient = '049d8f88d66b9f746bfbc42ddbee2b78096c37be9070716bf26e1bea8f501b2c6adb22a8a05f0bcc934db114cf26ad61ee50d70ad9551713014e618690e4d4adae'
    const {recipient} = req.body;
    const amount = 1000;

    let transaction = transactionPool
      .existingTransaction({ inputAddress: faucetWallet.publicKey});

    try {
        if (transaction) {
            transaction.update({ senderWallet: faucetWallet, recipient, amount});
        } else {
            transaction = faucetWallet.createTransaction({
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

    res.json(transactionPool.transactionMap);   


  }
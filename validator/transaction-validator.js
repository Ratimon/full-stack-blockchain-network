const Wallet = require('../wallet/index')
const Transaction = require('../wallet/transaction');

class TransactionValidator {
    constructor({ blockchain, transactionPool, wallet, pubsub}) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }

    validateTransaction(){
        // get the transaction pool's valid transactions
        const validTransactions = this.transactionPool.validTransactions();

        // generate the miner's reward
        // console.log(this.wallet)
        validTransactions.push(
            Transaction.rewardTransaction({ validatorWallet: this.wallet })
        );

        // add a block consisting of these transactions to the blockchain
        const address = this.wallet.publicKey;
        const balance = Wallet.calculateBalance({chain: this.blockchain.chain, address});
        
        this.blockchain.addBlock({ data : validTransactions, balance, address  });
        // this.blockchain.addBlock({ data : validTransactions  });


        // broadcast the updated blockchain
        this.pubsub.broadcastChain();

        // clear the pool
        this.transactionPool.clear()
    }
}

module.exports = TransactionValidator
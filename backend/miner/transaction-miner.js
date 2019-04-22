const Block = require('../model/block');
const Transaction = require('../wallet/transaction');

class TransactionMiner {
    constructor({ blockchain, transactionPool, wallet, pubsub}) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
        this.isMining = false;
    }

    startMining() {
        this.isMining = true;

            if (this.isMining == true) {
    
                var mining = setInterval(()=>{
                    this.mineTransaction()

                    if(this.isMining == false) {
                        clearInterval(mining);
                    }
                },2000)
    
            } 

    }

    stopMining() {
        this.isMining = false;
    }

    mineTransaction(){

            // get the transaction pool's valid transactions
            console.log('valid Transacton',this.transactionPool);

            const validTransactions = this.transactionPool.validTransactions()

            // generate the miner's reward
            validTransactions.push(
                Transaction.rewardTransaction({ minerWallet: this.wallet })
            );

            // add a block consisting of these transactions to the blockchain
            if(Block.mineBlock({
                previousBlock: this.blockchain.chain[this.blockchain.chain.length-1],
                data: validTransactions
            })) {
                
                this.blockchain.addBlock({ data : validTransactions})

                this.pubsub.broadcastChain();

                this.transactionPool.clear();
                
            }
            
    }

}

module.exports = TransactionMiner
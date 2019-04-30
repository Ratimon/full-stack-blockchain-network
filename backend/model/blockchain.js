const Block = require('./block');
const Wallet = require('../wallet/index')
const Transaction = require('../wallet/transaction');
const cryptoHash = require('../util/crypto-hash');

const {REWARD_INPUT} = require('../wallet/config');


class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
          previousBlock: this.chain[this.chain.length-1],
          data
        });
    
        this.chain.push(newBlock);

      }

    replaceChain(chain, validTransactions, onSuccess){
        if( Blockchain.getCumulativeDifficulty(chain) <= Blockchain.getCumulativeDifficulty(this.chain)){
            console.error('The new chain must be longer');
            return;
        };

        if(!Blockchain.isValidChain(chain)) {
            console.error('The new chain must be valid');
            return;
        }

        if(validTransactions && !this.validTransactionData({chain})) {
            console.error('The new chain has invalid data');
            return;
        }

        if(onSuccess) onSuccess()

        console.log('replacing chain with', chain);
        this.chain = chain;
    }

    validTransactionData({chain}) {

        let latestBlock = chain[chain.length-1]

        for(let item of latestBlock.data){

            // if(item.input.address !== '049d8f88d66b9f746bfbc42ddbee2b78096c37be9070716bf26e1bea8f501b2c6adb22a8a05f0bcc934db114cf26ad61ee50d70ad9551713014e618690e4d4adae'){

                const trueBalance = Wallet.calculateBalance({
                    chain: this.chain,
                    address: item.input.address
                });

                //in case of not reward transaction only
                if(item.input.amount) {

                    if ( item.input.amount !== trueBalance) {
                        console.log(trueBalance)
                        console.log(item.input.amount)
                        console.error('Invalid input amount');
                        return false;
                    }
                }

            }

        // }

        for(let i=1; i<chain.length; i++) {
            const block = chain[i];
            const transactionSet = new Set();

            for(let transaction of block.data){

                console.log(transaction)

                if(transaction.input.address === REWARD_INPUT.address){


                } else {
                    if(!Transaction.validTransaction(transaction)) {
                        console.error('Invalid transaction')
                        return false;
                    }

                      if(transactionSet.has(transaction)) {
                        console.error('An identical transaction appears more than once in the block');
                        return false;
                      } else {
                          transactionSet.add(transaction);
                      }

                }
            }
        }
        return true;
    }


    static isValidChain(chain) {

        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()) ){
            return false;
        }

        for(let i=1; i< chain.length; i++){
            const {index, hash, previousHash,  timestamp, data, difficulty, nonce} = chain[i];
            const actualPreviousHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;

            if(previousHash !== actualPreviousHash) {
                return false;
            }

            const validatedHash = cryptoHash(
                index,
                previousHash,
                timestamp,
                data,
                difficulty,
                nonce
            )

            if (hash !== validatedHash) {
                return false;
            }

            if (Math.abs(lastDifficulty - difficulty) > 1){
                return false;
            }
        }
        return true;
    }


    static getCumulativeDifficulty(chain) {
        return chain
            .map((block) => block.difficulty)
            .map((difficulty) => Math.pow(2, difficulty))
            .reduce((a, b) => a + b);
    }


}

module.exports = Blockchain;
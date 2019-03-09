const Block = require('./block');
const Wallet = require('../wallet/index');
const Transaction = require('../wallet/transaction');
const cryptoHash = require('../util/crypto-hash');

const BLOCK_TIME = 10;
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
const {REWARD_INPUT, REWARD} = require('../wallet/config');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({data, balance, address}){

        const validatedBlock = Block.validateBlock({
            previousBlock: this.chain[this.chain.length-1],
            data,
            difficulty: Blockchain.getDifficulty(this.chain),
            // difficulty: this.chain[this.chain.length-1].difficulty
            minterBalance: balance,
            minterAddress: address
        });

        this.chain.push(validatedBlock);
    }

    replaceChain(chain, validTransactions, onSuccess){
        // if(chain.length <= this.chain.length){
        if( Blockchain.getCumulativeDifficulty(chain) <= Blockchain.getCumulativeDifficulty(this.chain)){
            console.error('The new chain must be longer');
            return;
        };

        if(!Blockchain.isValidChain(chain)) {
            console.error('The new chain must be valid');
            return;
        }

        if(validTransactions &&!this.validTransactionData({chain})) {
            console.error('The new chain has invalid data');
            return;
        }

        if(onSuccess) onSuccess()

        console.log('replacing chain with', chain);
        this.chain = chain;
    }

    validTransactionData({chain}) {
        for(let i=1; i<chain.length; i++) {
            const block = chain[i];
            const transactionSet = new Set();
            let rewardTransactionCount = 0;

            for(let transaction of block.data){
                if(transaction.input.address === REWARD_INPUT.address) {
                    rewardTransactionCount += 1;

                    if(rewardTransactionCount > 1) {
                        console.error('Rewards exceed limit');
                        return false;
                    }

                    if(Object.values(transaction.outputMap)[0] !== REWARD) {
                        console.error('reward amount is invalid');
                        return false;
                    }
                } else {
                    if(!Transaction.validTransaction(transaction)) {
                        console.error('Invalid transaction')
                        return false;
                    }

                    const trueBalance = Wallet.calculateBalance({
                        chain: this.chain,
                        address: transaction.input.address
                      });
            
                      if (transaction.input.amount !== trueBalance) {
                        console.error('Invalid input amount');
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
            const {index, hash, previousHash,  timestamp, data, difficulty, minterBalance, minterAddress} = chain[i];
            const actualPreviousHash = chain[i-1].hash;

            if(previousHash !== actualPreviousHash) {
                return false;
            }

            const validatedHash = cryptoHash(
                index,
                previousHash,
                timestamp,
                data,
                difficulty,
                minterBalance,
                minterAddress
            )

            if (hash !== validatedHash) {
                return false;
            }
        }
        return true;
    }

    static getDifficulty (chain) {
        const latestBlock = chain[chain.length - 1];
        const {index, difficulty } = latestBlock

        if (difficulty < 1) return 1;

        if (index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && index !== 0) {
            return Blockchain.getAdjustedDifficulty(latestBlock, chain);
        } else {
            return difficulty;
        }
    };  
    
    static getAdjustedDifficulty (latestBlock, chain) {
        const preAdjustedBlock = chain[chain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
        const expectedTime = BLOCK_TIME * DIFFICULTY_ADJUSTMENT_INTERVAL;
        const takenTime = latestBlock.timestamp - preAdjustedBlock.timestamp;
        if (takenTime < expectedTime / 2) {
            return preAdjustedBlock.difficulty + 1;
        } else if (takenTime > expectedTime * 2) {
            return preAdjustedBlock.difficulty - 1;
        } else {
            return preAdjustedBlock.difficulty;
        }
    }

    static getCumulativeDifficulty(chain) {
        return chain
            .map((block) => block.difficulty)
            .map((difficulty) => Math.pow(2, difficulty))
            .reduce((a, b) => a + b);
    }

}

module.exports = Blockchain; 

// const fs = require('fs');
const path = require('path');

// TODO: File System implemenatation
const p = path.join(
    // path.dirname(process.mainModule.filename),
    path.dirname(require.main.filename),
    'data',
    'blockchain.json'
  );

const Block = require('./block');
const cryptoHash = require('../util/crypto-hash');

const BLOCK_TIME = 10;
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

// TODO: File System implemenatation
// const getBlocksFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         cb([]);
//       } else {
//         cb(JSON.parse(fileContent));
//       }
//     });
//   };

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({data}){
        const validatedBlock = Block.validateBlock({
            previousBlock: this.chain[this.chain.length-1],
            data,
            difficulty: Blockchain.getDifficulty(this.chain)
            // difficulty: this.chain[this.chain.length-1].difficulty
        })

        this.chain.push(validatedBlock);

        // TODO: File System implemenatation
        // getBlocksFromFile(blocks => {
        //     this.chain.push(validatedBlock);
        //     fs.writeFile(p, JSON.stringify(blocks), err => {
        //       console.log(err);
        //     });
        //   });
    }

    replaceChain(chain){
        // if(chain.length <= this.chain.length){
        if(Blockchain.getCumulativeDifficulty(chain) <= Blockchain.getCumulativeDifficulty(this.chain)){
            console.error('The new chain must be longer');
            return;
        };

        if(!Blockchain.isValidChain(chain)) {
            console.error('The new chain must be valid');

            return;
        }

        console.log('replacing chain with ', chain);
        this.chain = chain;
    }

    // TODO: File System implemenatation
    // saveBlockFile(block) {
    //     getBlocksFromFile(blocks => {
    //       this.chain.push(block);
    //       fs.writeFile(p, JSON.stringify(blocks), err => {
    //         console.log(err);
    //       });
    //     });
    //   }

    static fetchAll(cb) {
        getBlocksFromFile(cb);
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
        const {index, difficulty } = latestBlock;

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
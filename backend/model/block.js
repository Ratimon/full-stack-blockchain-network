const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('./config');
const {cryptoHash} = require('../util/index');


class Block {
    constructor({index, hash, previousHash, timestamp, data, nonce, difficulty}){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({ previousBlock, data }) {
        
        const previousHash = previousBlock.hash;
        let hash, timestamp;
        let { difficulty, index } = previousBlock;
        index++
        let nonce = 0;
    
        do {
          nonce++;
          timestamp = Date.now();
          difficulty = Block.adjustDifficulty({ originalBlock: previousBlock, timestamp });
          hash = cryptoHash(index, timestamp, previousHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));
    
        return new this({index, timestamp, previousHash, data, difficulty, nonce, hash });
    }
    
    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
    
        if (difficulty < 1) return 1;
    
        if ((timestamp - originalBlock.timestamp) > MINE_RATE ) return difficulty - 1;
    
        return difficulty + 1;
    }

}

module.exports = Block;
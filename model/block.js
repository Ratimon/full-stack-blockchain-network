const { GENESIS_DATA } = require('./config');
const {cryptoHash} = require('../util/index');
const BigNumber = require('bignumber.js');

const MINTING_INDEX = 100;


class Block {
    constructor({index, hash, previousHash, timestamp, data, difficulty, minterBalance, minterAddress}){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.difficulty = difficulty;
        this.minterBalance = minterBalance;
        this.minterAddress = minterAddress;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static validateBlock({previousBlock, data, difficulty, minterBalance, minterAddress }){
    // static validateBlock({previousBlock, data, difficulty }){

        const previousHash = previousBlock.hash;
        // let {index, minterBalance, minterAddress } = previousBlock;
        let {index } = previousBlock;


        index++;
        let pastTimestamp = 0;
        // let difficulty = 

        while (true) {
            let timestamp = Block.getCurrentTimestamp();
            if(pastTimestamp !== timestamp) {
                //TODO: wallet function instead of hard code address, balance wallet
                let hash = cryptoHash(index, previousHash, timestamp, data, difficulty, minterBalance, minterAddress);
                if (Block.isStakingBlockValid(previousHash, minterAddress, timestamp, minterBalance, difficulty, index)) {
                    return new this({index, hash, previousHash, timestamp, data, difficulty, minterBalance, minterAddress});
                }
                pastTimestamp = timestamp;
            }
        }
    }


    static isStakingBlockValid(previousHash, minterAddress, timestamp, balance, difficulty, index) {
        difficulty = difficulty + 1;

        if(index <= MINTING_INDEX) {
            balance = balance + 1;
        }

        // SHA256(prevhash + address + timestamp) <= 2^256 * balance / diff
        const balanceOverDifficulty = BigNumber(2).exponentiatedBy(256).times(balance).dividedBy(difficulty);
        const stakingHash = cryptoHash(previousHash , minterAddress , timestamp);
        const decimalStakingHash = BigNumber(stakingHash, 16);
        const difference = balanceOverDifficulty.minus(decimalStakingHash).toNumber();;
    
        return (difference >= 0);
    }

    static isValidNewBlock({previousBlock, newBlock}) {

        if(!Block.isValidBlockStructure(newBlock)){
            return false;
        }

        if(previousBlock.index+1 !== newBlock.index) {
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash) {
            return false;
        } else if (newBlock.hash !== cryptoHash(
            newBlock.index,
            newBlock.previousHash,
            newBlock.timestamp,
            newBlock.data,
            newBlock.difficulty,
            newBlock.minterBalance,
            newBlock.minterAddress
        )) {
            return false;
        } else if (newBlock.minterBalance < 0) {
            return false;
        } else {
            return true;
        }
    }

    static isValidBlockStructure(block) {
        return typeof block.index === 'number'
        && typeof block.hash === 'string'
        && typeof block.previousHash === 'string'
        && typeof block.difficulty === 'number'
        && typeof block.minterBalance === 'number'
        && typeof block.minterAddress === 'string';       
    }


    static getCurrentTimestamp() {
        return Math.round(new Date().getTime() / 1000);
    } 

 
}

module.exports = Block;
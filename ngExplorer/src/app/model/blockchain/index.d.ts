import Transaction = require('../transaction');
import Block = require('../block');

export = Blockchain;

declare class Blockchain {
    constructor();
    chain: Block[];
    addBlock (data: string, address: string, balance: number): void;
    replaceChain (chain: Blockchain, validTransactions: Boolean, onSuccess: any): void;
    validTransactionData (chain: Blockchain): Boolean;
    isValidChain (chain: Blockchain): Boolean;
    getDifficulty (chain: Blockchain): number;
    getAdjustedDifficulty (latestBlock: Block, chain: Blockchain): number;
    getCumulativeDifficulty(chain: Blockchain): number;
}

declare namespace Blockchain {
}
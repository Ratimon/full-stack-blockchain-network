import Transaction = require('../transaction');

export = Block;

declare class Block {
    constructor();
    index: number;
    hash: string;
    previousHash: string;
    timestamp: number;
    data: Transaction[];
    difficulty: number;
    minterBalance: number;
    minterAddress: string;
}

declare namespace Block {
}

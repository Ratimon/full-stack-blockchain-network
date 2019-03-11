import { Transaction, OutputMap, Input, Signature } from './transaction';

export class Block {
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

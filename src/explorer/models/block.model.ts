import { Transaction } from "./transaction.model";

export interface Block {
    index: number;
    hash: string;
    previousHash: string;
    timestamp: string
    data: Transaction[];
    difficulty: number;
};
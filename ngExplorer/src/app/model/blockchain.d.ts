import { Transaction, OutputMap, Input, Signature } from './transaction';
import { Block } from './block';

export class Blockchain {
    constructor();
    chain: Block[];
}

//export function addBlock (data: string, address: string, balance: number): void;
//export function replaceChain (chain: Blockchain, validTransactions: Transaction, onSuccess: any): void;
//export function validTransactionData (chain: Blockchain): Boolean;
//export function isValidChain (chain: Blockchain): Boolean;
//export function getDifficulty (chain: Blockchain): number;
//export function getAdjustedDifficulty (latestBlock: Block, chain: Blockchain): number;
//export function getCumulativeDifficulty(chain: Blockchain): number;
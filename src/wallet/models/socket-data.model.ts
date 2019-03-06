import { TransactionPool } from "./transaction-pool.model";


export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect'
}

export interface Data {
    balance : number;
    transactionPoolMap : TransactionPool;
}
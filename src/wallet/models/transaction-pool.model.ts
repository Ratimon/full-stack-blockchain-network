import { Transaction } from "./transaction.model";

export interface TransactionPool {
    transactionMap: TransactionMap;
  }

  export interface TransactionMap {
    entities: { [id: string]: Transaction };
  }
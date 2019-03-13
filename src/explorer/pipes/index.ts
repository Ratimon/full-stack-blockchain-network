import {FilterAccountPipe} from './filter-account.pipe';
import {FilterTransactionPipe} from './filter-transaction.pipe';
import {FilterBlockPipe} from './filter-block.pipe';

export const customPipes: any[] = [FilterAccountPipe, FilterTransactionPipe, FilterBlockPipe ];

export * from './filter-account.pipe';
export * from './filter-transaction.pipe';
export * from './filter-block.pipe';
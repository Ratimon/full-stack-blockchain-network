import {AccountService} from './account.service';
import {BlockService} from './block.service';
import {TransactionService} from './transaction.service';

export const services: any[] = [AccountService, BlockService, TransactionService ];

export * from './account.service';
export * from './block.service';
export * from './transaction.service';
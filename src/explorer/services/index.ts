import { TransactionService } from './transaction.service';
import {BlockService} from './block.service'

export const services: any[] = [TransactionService,BlockService ];

export * from './transaction.service';
export * from './block.service';
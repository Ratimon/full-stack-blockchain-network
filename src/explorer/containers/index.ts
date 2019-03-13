import { AccountsComponent } from './accounts/accounts.component';
import { BlocksComponent} from './blocks/blocks.component';
import { TransactionsComponent} from './transactions/transactions.component'

export const containers: any[] = [AccountsComponent, BlocksComponent, TransactionsComponent];

export * from './accounts/accounts.component';
export * from './blocks/blocks.component';
export * from './transactions/transactions.component';
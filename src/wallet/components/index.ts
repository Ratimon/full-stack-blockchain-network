import { WalletExistingComponent } from './wallet-existing/wallet-existing.component';
import { WalletKeyComponent } from './wallet-key/wallet-key.component'
import { WalletReceiveComponent } from './wallet-receive/wallet-receive.component';
import { WalletRecoverComponent } from './wallet-recover/wallet-recover.component';
import { WalletCreateComponent } from './wallet-create/wallet-create.component';
import { WalletSendComponent } from './wallet-send/wallet-send.component';
import { WalletMineComponent } from './wallet-mine/wallet-mine.component';


export const components: any[] = [
    WalletExistingComponent,
    WalletKeyComponent,
    WalletRecoverComponent,
    WalletReceiveComponent,
    WalletCreateComponent,
    WalletSendComponent,
    WalletMineComponent
];

export * from './wallet-existing/wallet-existing.component';
export * from './wallet-key/wallet-key.component';
export * from './wallet-recover/wallet-recover.component';
export * from './wallet-receive/wallet-receive.component';
export * from './wallet-create/wallet-create.component';
export * from './wallet-send/wallet-send.component';
export * from './wallet-mine/wallet-mine.component';



import { WalletService } from './wallet.service';
import { SocketService } from './socket.service';

export const services: any[] = [WalletService, SocketService ];

export * from './wallet.service';
export * from './socket.service';

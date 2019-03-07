import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';
import { TransactionPool } from '../models/transaction-pool.model';
import { Data ,Event } from '../models/socket-data.model';
import { Transaction } from '../models/transaction.model';


@Injectable()
export class SocketService {

  public socket;

  constructor() { }


  public initSocket(): void {
      this.socket = socketIo();
  }

//   public onData(): Observable<Data> {
//     return new Observable<Data>(observer => {
//         this.socket.on('data', (data: Data) => observer.next(data));
//     });
//   }
  public onTransactionPool(): Observable<Transaction[] >  {
    return new Observable<Transaction[] >(observer => {

        this.socket.on('data', (data: Data) => {
            const {transactionPoolMap} = data;
            const transactions= Object.values(transactionPoolMap.transactionMap)     
            observer.next(transactions);

        });
    });
  }

  public onBalance(): Observable<number> {
    return new Observable<number>(observer => {

        this.socket.on('data', (data: Data) => {
            const {balance} = data;
            observer.next(balance);
        });
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event, () => observer.next() );
    });
}

}
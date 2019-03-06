import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';

import { Observable } from 'rxjs';

import {WalletDialogComponent } from '../../components/wallet-dialog/wallet-dialog.component';

import { SocketService } from '../../services/socket.service'
import { WalletService } from '../../services/wallet.service';

import { Transaction } from '../../models/transaction.model'
import { TransactionPool } from '../../models/transaction-pool.model';
import { Event, Data } from '../../models/socket-data.model';


@Component({
  selector: 'wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.scss']
})
export class WalletDashboardComponent implements OnInit {

  address: string;
  private privateKey : string;
  balance$: Observable<number>;
  transactions$: Observable<Transaction[]>;


  constructor(
    private socketService: SocketService,
    private walletService: WalletService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit():void {
    this.isWalletValid();
    this.walletService.getWallet().subscribe(wallet=>{
      this.address = wallet.address;
      this.privateKey = wallet.privateKey;
    })
    this.initIoConnection();
  }

  private isWalletValid() :void{
    setTimeout(() => {
      if(this.address !== this.route.snapshot.params.address) {
        this.dialog.open(
          WalletDialogComponent,
          { width: '50%', height: '50%' }
         );
        this.router.navigate([`/wallet`]);
      }
    });
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.balance$ = this.socketService.onBalance();
    this.transactions$ = this.socketService.onTransactionPool()

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });
      
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });

  }

  onSend(event: string) {
    console.log('event',event);

    this.walletService.sendValue(event).subscribe((response)=>{
      console.log('response', response);
    });
  }

  onValidate(event) {
    this.walletService.validateTransactions().subscribe((response)=>{
      console.log('response', response);
    });
  }

}

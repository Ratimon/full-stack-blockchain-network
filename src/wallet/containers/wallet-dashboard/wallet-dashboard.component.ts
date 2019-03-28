import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectionStrategy
} from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { SocketService } from '../../services/socket.service'
import { WalletService } from '../../services/wallet.service';

import { Transaction } from '../../models/transaction.model'
import { Event} from '../../models/socket-data.model';

@Component({
  selector: 'wallet-dashboard',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.scss']
})
export class WalletDashboardComponent implements OnInit, DoCheck {

  address: string;
  private privateKey : string;
  balance$: Observable<number>;
  transactions$: Observable<Transaction[]>;

  constructor(
    private socketService: SocketService,
    private walletService: WalletService,
    private router: Router
  ) { }

  ngOnInit():void {
    this.updateWallet()
    this.initIoConnection();
  }

  ngDoCheck() {
    if(localStorage.getItem('currentAddress')!== JSON.stringify(this.address)) {
      this.updateWallet()
    }
  }

  private updateWallet():void {
    this.walletService.getWallet().subscribe(wallet =>{
      this.address = wallet.address;
      this.privateKey = wallet.privateKey;
      localStorage.setItem('currentAddress', JSON.stringify(this.address))
    })
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.balance$ = this.socketService.onBalance();
    this.transactions$ = this.socketService.onTransactionPool();

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });
      
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });

  }

  logout():void{
    this.walletService.logout();
    this.router.navigate([`/wallet`]);
  }

  onSend(event: string) {
    this.walletService.sendValue(event).subscribe((response)=>{
      console.log('response', response);
    });
  }


  onMine(){
    this.walletService.mineTransactions().subscribe((response)=>{
      console.log('response', response);
    })
  }

  onStart() {
    this.walletService.startMiningTransactions().subscribe((response)=>{
      console.log('response', response);
    });
  }


  onStop(){
    this.walletService.stopMining().subscribe((response)=>{
      console.log('response', response);
    })
  }


}
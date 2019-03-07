import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WalletService } from '../../services/wallet.service';

import { Wallet } from '../../models/wallet.model';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  wallet: any;

  constructor(
    private walletService: WalletService,
    private router: Router
  ) { }

  ngOnInit() {
    this.walletService.getWallet().subscribe(wallet=>{
      console.log(wallet);
      this.wallet = wallet;
    })
  }

  onUse(event: Wallet) {
      this.router.navigate([`/wallet/${this.wallet.address}`])
    // })
  }

  onRecover(event: string) {
      console.log('event',event);
      this.walletService.recoverWallet(event).subscribe((wallet)=>{
        console.log('response', wallet);
        this.wallet = wallet;
        this.router.navigate([`/wallet/${this.wallet.address}`])
      });
  }

  onCreate(event) {
      this.walletService.createWallet().subscribe((wallet)=>{
        console.log('response', wallet);
        this.wallet = wallet;
        this.router.navigate([`/wallet/${this.wallet.address}`])
      })
  }

}

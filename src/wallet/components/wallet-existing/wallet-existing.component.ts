import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

import { Wallet } from '../../models/wallet.model';

@Component({
  selector: 'wallet-existing',
  templateUrl: './wallet-existing.component.html',
  styleUrls: ['./wallet-existing.component.scss']
})
export class WalletExistingComponent implements OnInit {

  @Input() wallet: Wallet;
  @Output() use = new EventEmitter<Wallet>();

  constructor() { }

  ngOnInit() {
  }

  useExistingWallet() {
      this.use.emit({ ...this.wallet });
  }

}

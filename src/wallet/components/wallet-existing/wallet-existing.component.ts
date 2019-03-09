import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Wallet } from '../../models/wallet.model';

@Component({
  selector: 'wallet-existing',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

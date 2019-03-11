import {
  Component,
  // Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'wallet-validate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wallet-validate.component.html',
  styleUrls: ['./wallet-validate.component.scss']
})
export class WalletValidateComponent implements OnInit {

  // @Input() transactions: Transaction[];
  @Output() validate : EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  validateTransactions(){
    this.validate.emit(null);
  }

}

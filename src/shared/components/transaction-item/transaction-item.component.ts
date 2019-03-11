import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {Transaction, OutputMap} from '../../model/transaction.model';

@Component({
  selector: 'transaction-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent implements OnInit, OnChanges  {

  @Input() transaction: Transaction;
  id: string;
  fromAddress: string;
  fromAmount: number;
  outputMap: OutputMap;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.id=this.transaction.id;
    this.fromAddress=this.transaction.input.address;
    this.fromAmount=this.transaction.input.amount;
    this.outputMap=this.transaction.outputMap;
  }

}

import {
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';

import {Transaction} from '../../models/transaction.model';

@Component({
  selector: 'transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent implements OnInit, OnChanges  {

  @Input() transaction: Transaction;
  recipients: string[];
  sentAmounts: number[];
  id: string;
  fromAddress:string;
  fromAmount:number;
  outputMap;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.id=this.transaction.id;
    this.fromAddress=this.transaction.input.address;
    this.fromAmount=this.transaction.input.amount;
    this.outputMap=this.transaction.outputMap;
    // this.recipients = Object.keys(this.transaction.outputMap)
    // this.sentAmounts = Object.values(this.transaction.outputMap)

    // console.log(this.fromAddress);
    // console.log(this.fromAmount);
    // console.log(this.outputMap); 
    // console.log(this.recipients); 
  }

}

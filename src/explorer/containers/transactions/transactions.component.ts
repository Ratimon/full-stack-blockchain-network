import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';

import { TransactionService} from '../../services/transaction.service'

import {Transaction} from '../../models/transaction.model'

@Component({
  selector: 'transactions',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  value: string = 'Clear me';
  transactions$: Observable<Transaction[]>;

  pageIndex:number = 0;
  pageSize:number = 10;
  lowValue:number = 0;
  highValue:number = 10;

  constructor(
    private transactionService :TransactionService,
  ) { }

  ngOnInit() {
    this.transactions$=this.transactionService.getTransactions()
  }

  getPaginatorData(event){
    console.log(event);
    if(event.pageIndex === this.pageIndex + 1){
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
    }
    else if(event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }   
      this.pageIndex = event.pageIndex;
  }

}
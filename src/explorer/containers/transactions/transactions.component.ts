import { Component, OnInit } from '@angular/core';
import { TransactionService} from '../../services/transaction.service'

import { Observable } from 'rxjs';

import {Transaction} from '../../models/transaction.model'

// import {TransactionItemComponent} from '../../../app/components/transaction-item/transaction-item.component'

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  value: string = 'Clear me';
  transactions$: Observable<Transaction[]>;

  pageIndex:number = 0;
  pageSize:number = 3;
  lowValue:number = 0;
  highValue:number = 3;

  // pageSizeOptions: number[] = [5, 10, 25, 100];

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

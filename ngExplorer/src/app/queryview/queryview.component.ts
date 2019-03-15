import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import Transaction = require('../model/transaction');
import Block = require('../model/block');
import { globalBlockchain, globalTransactionList } from '../listview/listview.component';

@Component({
  selector: 'app-queryview',
  templateUrl: './queryview.component.html',
  styleUrls: ['./queryview.component.css']
})
export class QueryviewComponent implements OnInit {

  showQuery: boolean;
  transactionFound: Transaction;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.showQuery = false;
    this.messageService.add(`Query view component initialization complete...`);
  }

  getTransactionById(searchId: string): boolean {
    if ( searchId.length !== 36 ) {
      this.showQuery = false;
      this.messageService.add(`Query view component: search string ${searchId} is not 36 characters long...`);
      return;
    }
    this.transactionFound = undefined;
    this.transactionFound = globalTransactionList.find(transaction => transaction.id === searchId);
    // this.messageService.add(`Query view component: globalTransationList ID list: `);
    // for (const tx of globalTransactionList) {
    //   this.messageService.add(`Query view component: transaction id "${tx.id}"`);
    // }
    if (this.transactionFound !== undefined) {
      this.messageService.add(`Query view component: found matching transaction id "${searchId}"`);
      this.showQuery = true;
      return;
    }
    this.messageService.add(`Query view component: no matching transaction id "${searchId}"`);
    this.showQuery = false;
    return;
  }
}

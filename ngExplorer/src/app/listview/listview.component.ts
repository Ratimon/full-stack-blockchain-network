import { Component, OnInit } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { MessageService } from '../message.service';

import Transaction = require('../model/transaction');
import Block = require('../model/block');
import Blockchain = require('../model/blockchain');
import { PubsubService } from '../pubsub.service';
import { BLOCKCHAIN, GENESISCHAIN } from '../mock-blockchain';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  blockchain: Block[];
  private newchain: Block[] = [];
  displayBlkList: Block[];
  startBlkPos: number;
  endBlkPos: number;
  lengthOfBlkList: number;

  selectedBlock: Block;
  selectedTransaction: Transaction;

  transactionList: Transaction[];
  displayTxList: Transaction[];
  startTxPos: number;
  endTxPos: number;
  lengthOfTxList: number;
  refreshInterval: Observable<number>;

  constructor(private messageService: MessageService, private pubsubService: PubsubService) { }

  ngOnInit() {
    this.messageService.add('List view component initializing...');
    this.blockchain = GENESISCHAIN;
    this.messageService.add('The initial genesis blockchain: '  + JSON.stringify(this.blockchain));
    this.displayBlkList = [];
    this.getBlockchain();

    this.transactionList = [];
    this.lengthOfTxList = 0;
    this.displayTxList = [];
    this.getTransactionList();

    this.refreshInterval = interval(10000);
    this.refreshInterval.subscribe(tick => this.getBlockchain(),
            error => this.messageService.add(error) );
    this.refreshInterval.subscribe(tick => this.getTransactionList(),
            error => this.messageService.add(error) );

    this.messageService.add('List view component initialization complete...');
  }

  getBlockchain(): void {
    // this.newchain.chain = BLOCKCHAIN;
    // this.blockchain = this.newchain.chain;
    // this.blockchain = BLOCKCHAIN;
    this.pubsubService.getBlockchain().subscribe(newchain => this.blockchain = newchain);
    this.startBlkPos = -5;
    this.endBlkPos = 0;
    this.displayBlkList = this.blockchain.slice(this.startBlkPos).reverse();
  }

  getTransactionList(): void {
    for (const block of this.blockchain) {
      this.transactionList = this.transactionList.concat(block.data);
    }
    this.lengthOfTxList = this.transactionList.length;
    this.startTxPos = -5;
    this.endTxPos = 0;
    this.displayTxList = this.transactionList.slice(this.startTxPos).reverse();
  }

  onSelectBlock(block: Block): void {
    this.selectedBlock = block;
  }

  onSelectTransaction(transaction: Transaction): void {
    this.selectedTransaction = transaction;
  }

  onBackBlock() {
    this.lengthOfBlkList = this.blockchain.length;

    if (this.endBlkPos === 0 || this.lengthOfBlkList === 0 ) {
      return;
    } else {
      this.startBlkPos = this.endBlkPos;
      this.endBlkPos = this.endBlkPos + 5;
      if (this.endBlkPos === 0) {
        this.displayBlkList = this.blockchain.slice(this.startBlkPos).reverse();
      } else {
        this.displayBlkList = this.blockchain.slice(this.startBlkPos, this.endBlkPos).reverse();
      }
    }
  }

  onNextBlock() {
    this.lengthOfBlkList = this.blockchain.length;

    if ( (this.lengthOfBlkList + this.endBlkPos ) <= 5 ) {
      return;
    } else if ( (this.lengthOfBlkList + this.startBlkPos) <= 5 ) {
      this.endBlkPos = this.endBlkPos - 5;
      this.startBlkPos = -1 * this.lengthOfBlkList;
      } else {
        this.endBlkPos = this.endBlkPos - 5;
        this.startBlkPos = this.endBlkPos - 5;
      }
    this.displayBlkList = this.blockchain.slice(this.startBlkPos, this.endBlkPos).reverse();
  }

  onBackTx() {
    this.lengthOfTxList = this.transactionList.length;

    if (this.endTxPos === 0 || this.lengthOfTxList === 0 ) {
      return;
    } else {
      this.startTxPos = this.endTxPos;
      this.endTxPos = this.endTxPos + 5;
      if (this.endTxPos === 0) {
        this.displayTxList = this.transactionList.slice(this.startTxPos).reverse();
      } else {
        this.displayTxList = this.transactionList.slice(this.startTxPos, this.endTxPos).reverse();
      }
    }
  }

  onNextTx() {
    this.lengthOfTxList = this.transactionList.length;

    if ( (this.lengthOfTxList + this.endTxPos ) <= 5 ) {
      return;
    } else if ( (this.lengthOfTxList + this.startTxPos) <= 5 ) {
      this.endTxPos = this.endTxPos - 5;
      this.startTxPos = -1 * this.lengthOfTxList;
      } else {
        this.endTxPos = this.endTxPos - 5;
        this.startTxPos = this.endTxPos - 5;
      }
    this.displayTxList = this.transactionList.slice(this.startTxPos, this.endTxPos).reverse();
  }
}

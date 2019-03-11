import { Component, OnInit } from '@angular/core';
import { Transaction, OutputMap, Input, Signature } from '../model/transaction';
import { Block } from '../model/block';
import { Blockchain } from '../model/blockchain';
import { BLOCKCHAIN } from '../mock-blockchain';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  blockchain: Block[];
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

  getTransactionList() {
    for (const block of this.blockchain) {
      this.transactionList = this.transactionList.concat(block.data);
    }
    this.lengthOfTxList = this.transactionList.length;
  }

  constructor() { }

  ngOnInit() {
    this.blockchain = BLOCKCHAIN;
    this.startBlkPos = -5;
    this.endBlkPos = 0;
    this.displayBlkList = this.blockchain.slice(this.startBlkPos).reverse();

    this.transactionList = [];
    this.lengthOfTxList = 0;
    this.getTransactionList();

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

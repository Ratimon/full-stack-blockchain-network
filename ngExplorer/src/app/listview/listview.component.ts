import { Component, OnInit } from '@angular/core';
import { Block } from '../model/block';
import { Blockchain } from '../model/blockchain';
import { BLOCKCHAIN } from '../mock-blockchain';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  blockchain = BLOCKCHAIN;
  selectedBlock: Block;

  constructor() { }

  ngOnInit() {
  }

  onSelect(block: Block): void {
    this.selectedBlock = block;
  }

}

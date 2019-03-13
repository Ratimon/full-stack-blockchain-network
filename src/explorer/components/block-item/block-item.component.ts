import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Block} from '../../models/block.model';
import { Transaction} from '../../models/transaction.model';

@Component({
  selector: 'block-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-item.component.html',
  styleUrls: ['./block-item.component.scss']
})
export class BlockItemComponent implements OnInit {

  @Input() block: Block;
  index: number;
  hash: string;
  previousHash: string;
  timestamp: string;
  data: Transaction[];
  minterBalance: number;
  minterAddress: string;

  constructor() { }

  ngOnInit() {
    this.index= this.block.index;
    this.hash= this.block.hash;
    this.previousHash=this.block.previousHash;
    this.timestamp= this.block.timestamp;
    this.data= this.block.data;
    this.minterBalance=this.block.minterBalance
    this.minterAddress= this.block.minterAddress
  }

}

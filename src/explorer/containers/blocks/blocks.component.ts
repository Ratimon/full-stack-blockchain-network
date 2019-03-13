import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';

import { BlockService} from '../../services/block.service'

import { Block } from '../../models/block.model';

@Component({
  selector: 'blocks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  value: string = 'Clear me';
  block$: Observable<Block[]>;

  pageIndex:number = 0;
  pageSize:number = 5;
  lowValue:number = 0;
  highValue:number = 5;

  constructor(
    private blockService: BlockService
  ) { }

  ngOnInit() {
    this.block$ = this.blockService.getBlocks();
  }

  getPaginatorData(event){
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

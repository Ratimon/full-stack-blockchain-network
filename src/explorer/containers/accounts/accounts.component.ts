import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';

import { AccountService } from '../../services/account.service'

import {Account} from '../../models/account.model'

@Component({
  selector: 'accounts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  value: string = 'Clear me';
  accounts$: Observable<Account>;

  accountLength: number
  pageIndex:number = 0;
  pageSize:number = 3;
  lowValue:number = 0;
  highValue:number = 3;

  constructor(
    private accountService :AccountService,
  ) { }

  ngOnInit() {
    this.accounts$=this.accountService.getAccounts()
  }

  // getPaginatorData(event){
  //   console.log(event);
  //   if(event.pageIndex === this.pageIndex + 1){
  //      this.lowValue = this.lowValue + this.pageSize;
  //      this.highValue =  this.highValue + this.pageSize;
  //   }
  //   else if(event.pageIndex === this.pageIndex - 1) {
  //     this.lowValue = this.lowValue - this.pageSize;
  //     this.highValue =  this.highValue - this.pageSize;
  //   }   
  //     this.pageIndex = event.pageIndex;
  // }

}

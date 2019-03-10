import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { FaucetService } from '../../services/faucet.service'

@Component({
  selector: 'faucet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.scss']
})
export class FaucetComponent implements OnInit {

  constructor(
    private faucetService: FaucetService
  ) { }

  ngOnInit() {
  }

  onRequest(event: string){
    console.log(event);
    this.faucetService.requestValue(event).subscribe(response=> {
      console.log('response', response);   
    })
  }

}

import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'wallet-receive',
  templateUrl: './wallet-receive.component.html',
  styleUrls: ['./wallet-receive.component.scss']
})
export class WalletReceiveComponent implements OnInit {

  @Input() balance: number;
  @Input() address: string;

  constructor() { }

  ngOnInit() {
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}

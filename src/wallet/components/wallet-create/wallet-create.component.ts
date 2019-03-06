import {
  Component,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.scss']
})
export class WalletCreateComponent implements OnInit {

  @Output() create : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  createNewWallet(){
    this.create.emit(null);
  }

}

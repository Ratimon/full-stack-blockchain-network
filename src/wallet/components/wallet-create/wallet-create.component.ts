import {
  Component,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'wallet-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

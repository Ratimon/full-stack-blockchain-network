import {
  Component,
  // Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';


@Component({
  selector: 'wallet-mine',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wallet-mine.component.html',
  styleUrls: ['./wallet-mine.component.scss']
})
export class WalletMineComponent implements OnInit {

  @Output() mine : EventEmitter<any> = new EventEmitter();
  @Output() start : EventEmitter<any> = new EventEmitter();
  @Output() stop : EventEmitter<any> = new EventEmitter();

  enableMining : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  mineTransactions(){
    this.mine.emit(null);
  }

  startMiningTransactions(){
    this.start.emit(null);
    this.enableMining = true;
  }

  stopMiningTransactions(){
    this.stop.emit(null);
    this.enableMining = false;
  }

}

import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'wallet-key',
  templateUrl: './wallet-key.component.html',
  styleUrls: ['./wallet-key.component.scss']
})
export class WalletKeyComponent implements OnInit {

  hide: boolean = true;
  @Input() privateKey : string

  constructor() { }

  ngOnInit() {
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}

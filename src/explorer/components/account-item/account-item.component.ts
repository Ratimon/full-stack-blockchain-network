import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'account-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  @Input() index :number;
  @Input() address :string;
  @Input() balance: number;

  constructor() { }

  ngOnInit() {
    this.index++
  }

}

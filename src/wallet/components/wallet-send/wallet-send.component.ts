import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy

 } from '@angular/core';

import {
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'wallet-send',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.scss']
})
export class WalletSendComponent implements OnInit {

  hide :boolean = true;

  @Input() balance :number
  @Output() send = new EventEmitter<Object>();

  form = this.fb.group({
    recipient: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(130),
        Validators.maxLength(130)
      ])],
    amount: [
      '',
      Validators.compose([
        Validators.required,
        Validators.min(0)
      ])]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  get recipientControl() {
    return this.form.get('recipient') as FormControl;
  }

  get amountControl() {
    return this.form.get('amount') as FormControl;
  }

  get recipientControlInvalid() {
    return this.recipientControl.hasError('required') && this.recipientControl.touched;
  }

  get recipientControlLengthInvalid() {
    return this.recipientControl.hasError('maxlength') && this.recipientControl.hasError('minLength');
  }

  get amountControlInvalid() {
    return this.amountControl.hasError('required') && this.amountControl.touched;
  }

  get amountControlMinInvalid() {
    return this.amountControl.hasError('min');
  }

  sendValue(){
    this.send.emit({
      recipient : this.recipientControl.value,
      amount: this.amountControl.value
    });
  }

}

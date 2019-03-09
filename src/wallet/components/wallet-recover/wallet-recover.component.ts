import {
  Component,
  Output,
  OnInit,
  EventEmitter
 } from '@angular/core';

import {
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'wallet-recover',
  templateUrl: './wallet-recover.component.html',
  styleUrls: ['./wallet-recover.component.scss']
})
export class WalletRecoverComponent implements OnInit {

  hide: boolean = true;

  @Output() recover = new EventEmitter<String>();

  form = this.fb.group({
    privateKey: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(64),
        Validators.maxLength(64)
      ])]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  get privateKeyControl() {
    return this.form.get('privateKey') as FormControl;
  }

  get privateKeyControlInvalid() {
    return this.privateKeyControl.hasError('required') && this.privateKeyControl.touched;
  }

  get privateKeyControlLengthInvalid() {
    return this.privateKeyControl.hasError('maxlength') && this.privateKeyControl.hasError('minLength');
  }

  recoverWallet() {
      this.recover.emit(this.privateKeyControl.value);
  }

}

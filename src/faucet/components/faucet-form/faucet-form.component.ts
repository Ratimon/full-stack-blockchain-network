import {
  Component,
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
  selector: 'faucet-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faucet-form.component.html',
  styleUrls: ['./faucet-form.component.scss']
})
export class FaucetFormComponent implements OnInit {

  @Output() request = new EventEmitter<String>();

  form = this.fb.group({
    recipient: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(130),
        Validators.maxLength(130)
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

  get recipientControlInvalid() {
    return this.recipientControl.hasError('required') && this.recipientControl.touched;
  }

  get recipientControlLengthInvalid() {
    return this.recipientControl.hasError('maxlength') && this.recipientControl.hasError('minLength');
  }

  requestValue() {
    this.request.emit(this.recipientControl.value);
}

}

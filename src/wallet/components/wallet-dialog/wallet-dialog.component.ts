import { Component, OnInit,  } from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'wallet-dialog',
  templateUrl: './wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.scss']
})
export class WalletDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WalletDialogComponent>
  ) { }

  ngOnInit() {
  }

  chooseWallet(): void {
    this.dialogRef.close();
  }

}

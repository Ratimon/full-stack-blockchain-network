import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";


@Component({
  templateUrl: "./error.component.html",
  selector: "app-error",
})
export class ErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

}
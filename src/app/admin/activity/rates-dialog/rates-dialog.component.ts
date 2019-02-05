import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Rate } from "../../../models/Rate";

@Component({
  selector: "app-rates-dialog",
  templateUrl: "./rates-dialog.component.html",
  styleUrls: ["./rates-dialog.component.scss"]
})
export class RatesDialogComponent implements OnInit {
  rates: Array<Rate>;
  ratesGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RatesDialogComponent>,
    private _fb: FormBuilder
  ) {
    this.ratesGroup = this._fb.group({
      from: ["", Validators.required],
      to: ["", Validators.required],
      rate: ["", Validators.required]
    });
  }

  ngOnInit() {

  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  addRates() {
    if (!this.rates) this.rates = [];
    this.rates.unshift(
      new Rate(
        this.ratesGroup.get("from").value,
        this.ratesGroup.get("to").value,
        this.ratesGroup.get("rate").value
      )
    );
  }
  onSubmit() {
    return this.dialogRef.close(this.rates);
  }
}

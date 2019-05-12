import { Component, OnInit, Inject } from "@angular/core";
import { Rate } from "../../../models/Rate";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RatesService } from "../../../GeneralServices/rates.service";

@Component({
  selector: "app-edit-rates",
  templateUrl: "./edit-rates.component.html",
  styleUrls: ["./edit-rates.component.scss"]
})
export class EditRatesComponent implements OnInit {
  rates: Array<Rate>;
  newRates: Array<Rate> = [];
  ratesGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditRatesComponent>,
    private _fb: FormBuilder,
    private _rate: RatesService,
    @Inject(MAT_DIALOG_DATA) public id_activity: any
  ) {
    this.ratesGroup = this._fb.group({
      from: ["", Validators.required],
      to: ["", Validators.required],
      rate: ["", Validators.required]
    });
  }

  ngOnInit() {
    /*this._rate
      .getRates(this.id_activity)
      .subscribe(
        r => (this.rates = r),
        (err: HttpErrorResponse) => this._rate.handleError(err)
      );*/
  }

  deleteRate(index: number) {
    this._rate.deleteRate(this.rates[index]._id);
  }

  addRate() {
    this.newRates.unshift(
      new Rate(this.ratesGroup.get("from").value,
      this.ratesGroup.get("to").value,
      this.ratesGroup.get("rate").value,
      this.id_activity
      ));
    console.log(this.newRates)
  }

  onSubmit() {
    this.newRates.forEach(r => this._rate.saveRate(r));
  }
}

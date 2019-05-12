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
    this._rate.getRates(this.id_activity);
  }

  deleteRate(element, index) {
    if (element._id !== undefined) {
      this._rate.deleteRate(element._id);
      this._rate.getRates(this.id_activity);
    } else {
      this._rate.entryAndTariff.splice(index, 1)
    }
  }

  addRate() {
    this._rate.entryAndTariff.unshift(
      new Rate(this.ratesGroup.get("from").value,
        this.ratesGroup.get("to").value,
        this.ratesGroup.get("rate").value,
        this.id_activity,
        undefined
      ));
  }

  onSubmit() {
    this._rate.entryAndTariff.forEach(r => {
      this._rate.saveRate(r);
    });
  }
}

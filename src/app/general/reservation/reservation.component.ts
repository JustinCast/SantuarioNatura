import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Reserve } from 'src/app/models/Reserve';
import { ReservationService } from "src/app/GeneralServices/reservation.service";
import { MatSnackBar } from "@angular/material";
import { ActivityService } from "src/app/GeneralServices/activity.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Activity } from "../../models/Activity";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.scss"]
})
export class ReservationComponent implements OnInit {
  activity: Activity;
  icon = "priority_high";
  numbers: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];
  payments: string[] = ["Card", "Wire transfer", "When you arrive"];
  reservationFG: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public _reservationService: ReservationService,
    public snackBar: MatSnackBar,
    private _activity: ActivityService,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    this.reservationFG = this._fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      phone: [""],
      country: ["", Validators.required],
      adult: ["", Validators.required],
      children: [""],
      date: ["", Validators.required],
      feeding: [""],
      transport: [""],
      lodging: [""],
      startDate: [""],
      finishDate: [""],
      payment: ["", Validators.required],
      comment: [""]
    });
  }

  ngOnInit() {
    this._activity.getAllActivities();

    if (this._activity.activities === undefined) {
      this._router.navigate([""]);
    } else {
      this.activity = this._activity.activities[
        this.route.snapshot.paramMap.get("index")
      ];
    }

    this._reservationService.getActivities();
    this._reservationService.getCountries();

    this.reservationFG.valueChanges.subscribe(() => {
      if (this.reservationFG.valid) this.icon = "done";
      else this.icon = "priority_high";
    });
  }

  onSubmit() {
    let reserve = new Reserve(
      this.reservationFG.get("name").value,
      this.reservationFG.get("email").value,
      this.formatPhone(
        this.reservationFG.get("phone").value,
        this.reservationFG.get("country").value
      ),
      this.reservationFG.get("country").value,
      this.reservationFG.get("adult").value,
      this.verifyValue(this.reservationFG.get("children").value),
      this.activity.name,
      this.changeFormat(this.reservationFG.get("date").value),
      this.verifyBoolean(this.reservationFG.get("feeding").value),
      this.verifyBoolean(this.reservationFG.get("transport").value),
      this.verifyBoolean(this.reservationFG.get("lodging").value),
      this.changeFormat(this.reservationFG.get("startDate").value),
      this.changeFormat(this.reservationFG.get("finishDate").value),
      this.reservationFG.get("payment").value,
      this.verifyValue(this.reservationFG.get("comment").value)
    );

    this._reservationService.saveReservation(reserve);
    this.reservationFG.reset();
    this.menssage("Pre-reserva realizada con exito", "Close", 3000);
  }

  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach(name => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }

  formatPhone(auxNumber: string, country: string): string {
    if (auxNumber.length != 0) {
      let auxElement = "";
      this._reservationService.countries.forEach(element => {
        if (element.name == country) {
          auxElement = "(+" + element.callingCodes + ")" + auxNumber;
        }
      });
      return auxElement;
    }
    return null;
  }

  changeFormat(auxDate: any): string {
    var date = JSON.stringify(auxDate);
    if (date.length > 5) {
      return date.substr(1, 10);
    }
  }

  verifyValue(element: string): any {
    if (element.length > 5) {
      return element;
    }
  }

  verifyBoolean(element: string): any {
    if (element.length != 0) {
      return element;
    }
    return false;
  }

  menssage(message: string, action: string, dur: number) {
    this.snackBar.open(message, action, {
      duration: dur
    });
  }
}

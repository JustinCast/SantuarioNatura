import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UIUtilsService } from "./uiutils.service";
import { Reserve } from "../models/Reserve";

@Injectable({
  providedIn: "root"
})
export class ReservationService {
  activities: Array<any>=[];
  countries: any;
  reservations: Array<Reserve>=[];
  loading: boolean = false;

  constructor(private _http: HttpClient, private ui: UIUtilsService) {}

  getCountries(): void {
    this._http.get("https://restcountries.eu/rest/v2/all").subscribe(
      data => (this.countries = data),
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  getActivities(): void {
    this._http.get<any>(`${environment.port}getActivities`).subscribe(
      data => {
        this.activities = data;
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  getReservations(): void {
    this._http.get<Reserve[]>(`${environment.port}getReservations`).subscribe(
      data => {
        this.reservations = data;
        this.loading = false;
        console.log(data);
      },
      (err: HttpErrorResponse) => this.handleError(err)
    );
  }

  saveReservation(reserve: Reserve){
    this._http.post(`${environment.port}createReservation`, reserve).subscribe(
      () => {
        console.log("pre-reserva guardada con éxito");
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  deleteReservation(id: number): void {
    this._http
      .delete(`${environment.port}deleteReservation/${id}`)
      .subscribe(
        () =>
          this.ui.openSnackBar("Reservación eliminada con éxito", "Ok", 2500),
        (err: HttpErrorResponse) => this.handleError(err)
      );
  }

  handleError(err: HttpErrorResponse) {
    this.loading = false;
    if (err.error instanceof Error) {
      // Error del lado del cliente
      console.log("An error occurred:", err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // Error del lado del backend
      console.log(
        `Backend returned code ${err.status}, body was: ${JSON.stringify(
          err.error
        )}`
      );
    }
  }
}

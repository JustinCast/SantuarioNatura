import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UIUtilsService } from "./uiutils.service";
import { Rate } from "../models/Rate";

@Injectable({
  providedIn: "root"
})
export class RatesService {

  entryAndTariff: Array<any> = [];

  constructor(
    private _http: HttpClient,
    private _ui: UIUtilsService
    ) {}


  getRates(id_activity: number): void {
     this._http.get<Array<Rate>>(
      `${environment.port}getRates/${id_activity}`
    ).subscribe(
      data => {
        console.log(data);
        this.entryAndTariff = data;
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  saveRate(rate: Rate): void {
    this._http
      .post(`${environment.port}saveRate`, rate)
      .subscribe(
        () =>
          this._ui.openSnackBar("Tarifa guardada correctamente", "Ok", 2000),
        (err: HttpErrorResponse) => this.handleError(err)
      );
  }

  updateRate(rate: Rate): void {
    this._http
      .put(`${environment.port}updateRate`, rate)
      .subscribe(
        () =>
          this._ui.openSnackBar("Tarifa actualizada correctamente", "Ok", 2000),
        (err: HttpErrorResponse) => this.handleError(err)
      );
  }

  deleteRate(id: number): void {
    this._http
      .delete(`${environment.port}deleteRate/${id}`)
      .subscribe(
        () =>
          this._ui.openSnackBar(
            "Tarifa eliminada de forma exitosa",
            "Ok",
            2000
          ),
        (err: HttpErrorResponse) => this.handleError(err)
      );
  }

  /**
   * Manejador de errores para solicitudes http
   * @param err - Error de la solicitud Http
   */
  handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      // Error del lado del cliente
      this._ui.openSnackBar(
        `An error occurred: ${err.error.message}`,
        "Ok",
        2000
      );
    } else {
      // The backend returned an unsuccessful response code.
      // Error del lado del backend
      this._ui.openSnackBar(
        `Backend returned code ${err.status}, body was: ${JSON.stringify(
          err.error
        )}`,
        "Ok",
        2000
      );
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogManager } from "src/app/GeneralServices/dialog-manager.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UIUtilsService } from "src/app/GeneralServices/uiutils.service";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"]
})
export class ContactUsComponent implements OnInit {
  sendEmailFG: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _dialog: DialogManager,
    private _http: HttpClient,
    private _ui: UIUtilsService
  ) {
    this.sendEmailFG = this._fb.group({
      from: ["", Validators.required],
      subject: ["", Validators.required],
      text: ["", Validators.required]
    });
  }

  ngOnInit() {}

  seeLoc() {
    this._dialog.activityLocation({
      lat: 10.345984,
      lng: -84.132146
    }, false);
  }

  sendEmail() {
    let body = {
      from: this.sendEmailFG.get("from").value,
      subject: this.sendEmailFG.get("subject").value,
      text: this.sendEmailFG.get("text").value
    };
    this._http.post(`${environment.port}sendContactEmail`, body).subscribe(
      () => {
        this._ui.openSnackBar("Correo enviado exitosamente", "Ok", 2500);
      },
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
        `An error occurred:", ${err.error.message}`,
        "Ok",
        2500
      );
    } else {
      // The backend returned an unsuccessful response code.
      // Error del lado del backend
      this._ui.openSnackBar(
        `Backend returned code ${err.status}, body was: ${JSON.stringify(
          err.error
        )}`,
        "Ok",
        2500
      );
    }
  }
}

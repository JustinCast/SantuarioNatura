// import { Injectable } from "@angular/core";
// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { environment } from "src/environments/environment";
// import { UIUtilsService } from "./uiutils.service";
// import { ServiceModel } from '../models/service';

// @Injectable({
//   providedIn: "root"
// })
// export class ServiceService {
//   // services: Array<ServiceModel>;
//   // constructor(private _http: HttpClient, private ui: UIUtilsService) {}

//   // getServices() {
//   //   this._http
//   //     .get<any[]>(`${environment.port}getAllServices`)
//   //     .subscribe(
//   //       data => {this.services = data; console.log(data)},
//   //       (err: HttpErrorResponse) => this.handleError(err)
//   //     );
//   // }

//   // saveService(service: ServiceModel) {
//   //   this._http.post(`${environment.port}saveService`, service).subscribe(
//   //     () => {
//   //       this.ui.openSnackBar("Servicio guardado", "Ok", 2000);
//   //     },
//   //     (err: HttpErrorResponse) => this.handleError(err)
//   //   );
//   // }

//   // updateService(service: ServiceModel) {
//   //   this._http.put(`${environment.port}updateService`, service)
//   //   .subscribe(
//   //     () => this.ui.openSnackBar("Servicio actualizado con éxito", "Ok", 2000),
//   //     (err: HttpErrorResponse) => this.handleError(err)
//   //   )
//   // }

//   // deleteService(service: ServiceModel) {
//   //   this._http.delete(`${environment.port}deleteService/${service.id}`)
//   //   .subscribe(
//   //     () => {
//   //       this.ui.openSnackBar("Servicio borrado con éxito", "Ok", 2000);
//   //       this.services.splice(this.services.indexOf(service), 1);
//   //     },
//   //     (err: HttpErrorResponse) => this.handleError(err)
//   //   )
//   // }

//   // handleError(err: HttpErrorResponse) {
//   //   if (err.error instanceof Error) {
//   //     // Error del lado del cliente
//   //     console.log("An error occurred:", err.error.message);
//   //   } else {
//   //     // The backend returned an unsuccessful response code.
//   //     // Error del lado del backend
//   //     console.log(
//   //       `Backend returned code ${err.status}, body was: ${JSON.stringify(
//   //         err.error
//   //       )}`
//   //     );
//   //   }
//   // }
// }

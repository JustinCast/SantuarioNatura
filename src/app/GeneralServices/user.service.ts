import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { UIUtilsService } from "./uiutils.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  users: Array<User>;
  loading: boolean = false;
  constructor(
    private _http: HttpClient,
    public ui: UIUtilsService,
    private auth: AuthService
  ) {}

  getUsers(): void {
    this._http.get<User[]>(`${environment.port}getAllUsers`).subscribe(
      data => {
        this.loading = false;
        this.users = data;
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  verifyPassword(password: string): Observable<any> {
    return this._http.get(`${environment.port}verifyPassword/${password}`);
  }

  login(username: string, password: string) {
    this._http
      .post<any>(`${environment.port}login`, {
        username: username,
        password: password
      })
      .subscribe(
        response => {
          this.loading = false;
          let data = response.data[0];
          if (response.login) {
            this.auth.login(
              new User(
                data.name,
                data.username,
                data.password,
                data.role,
                data.id
              )
            );
            this.ui.openSnackBar("Logueado correctamente", "Ok", 2500);
          }
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
          this.ui.openSnackBar("Error de inicio de sesión", "Ok", 2500);
        }
      );
  }

  recoveryPassword(username: string) {
    this._http.get(`${environment.port}recoveryPassword/${username}`)
    .subscribe(
      email => this.ui.openSnackBar(`Instrucciones enviadas a ${email}`, 'Ok', 2000),
      (err: HttpErrorResponse) => this.handleError(err)
    );
  }

  updatePassword(password: string, username: string) {
    this._http.put(`${environment.port}updatePassword/${username}`, {password: password})
    .subscribe(
      () => this.ui.openSnackBar('¡Contraseña actualizada con éxito!', 'Ok', 2500),
      (err: HttpErrorResponse) => this.handleError(err)
    )
  }

  saveUser(user: User): void {
    console.log(user);
    this._http.post(`${environment.port}createUser`, user).subscribe(
      () => {
        this.ui.openSnackBar('Usuario guardado con éxito', 'Ok', 2500);
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  updateUser(user: User): void {
    this._http.put(`${environment.port}updateUser`, user).subscribe(
      () => {
        this.ui.openSnackBar('Usuario actualizado con éxito', 'Ok', 2500);
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  deleteUser(index: number) {
    this._http
      .delete(
        `${environment.port}deleteUser/${this.users[index].id}`
      )
      .subscribe(
        () => {
          this.users.splice(index, 1);
          this.ui.openSnackBar('Usuario eliminado con éxito', 'Ok', 2500);
        },
        (err: HttpErrorResponse) => this.handleError(err)
      );
  }

  handleError(err: HttpErrorResponse) {
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

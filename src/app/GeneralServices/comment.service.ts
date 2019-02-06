import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UIUtilsService } from "./uiutils.service";
import { Comments } from "../models/Comments";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class CommentService {
  commentsToConfirm: Array<any> = [];
  comments: Array<any> = [];

  constructor(
    private _http: HttpClient,
    private ui: UIUtilsService,
    private snackBar: MatSnackBar
  ) {}

  deleteComment(commentId: number) {
    this._http
      .delete(`${environment.port}deleteComment/${commentId}`)
      .subscribe(
        () => {
          this.ui.openSnackBar("Comentario borrado con éxito", "Cerrar", 3000);
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
          this.ui.openSnackBar("Fallo al borrar el comentario", "Cerrar", 3000);
        }
      );
  }

  acceptComment(_comment: Comments) {
    this._http.put(`${environment.port}acceptComment`, _comment).subscribe(
      () => {
        this.ui.openSnackBar("Comentario aceptado con éxito", "Cerrar", 3000);
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
        this.ui.openSnackBar("Fallo al aceptar el comentario", "Cerrar", 3000);
      }
    );
  }

  getComments(): void {
    this._http.get<any>(`${environment.port}getComments`).subscribe(
      data => {
        this.comments = data;
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  getCommentsToConfirm(): void {
    this._http.get<any>(`${environment.port}getCommentsToConfirm`).subscribe(
      data => {
        this.commentsToConfirm = data;
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  saveComment(comment: Comments): void {
    this._http.post(`${environment.port}createComment`, comment).subscribe(
      () => {
        this.ui.openSnackBar("Mensaje enviado con éxito", "Cerrar", 3000);
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
        this.ui.openSnackBar("Mensaje fallido", "Cerrar", 3000);
      }
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

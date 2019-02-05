import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FileInterface } from '../models/file.interface';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/Activity';
import { UIUtilsService } from './uiutils.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  loading: boolean = false;
  constructor(
    private _http: HttpClient,
    private _ui: UIUtilsService
  ) { }

  getImages(activity: Activity) {
    this._http.get<FileInterface[]>(`${environment.port}getAllImages/${activity.id}`)
    .subscribe(
      images => {
        activity.images = images;
        this.loading = false;
      },
      (err: HttpErrorResponse) => this.handleError(err)
    )
  }

  deleteImageResource(path: string, image_id: number) {
    this._http.delete(`${environment.port}deleteImageResource/${path}`)
    .subscribe(
      () => {
        this._http.delete(`${environment.port}deleteImage/${image_id}`).subscribe(
          () => this._ui.openSnackBar('Imagen eliminada con éxito', 'Ok', 2500),
          (innerErr: HttpErrorResponse) => this.handleError(innerErr))
      },
      (err: HttpErrorResponse) => this.handleError(err)
    )
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

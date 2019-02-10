import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { Activity } from "../models/Activity";
import { UIUtilsService } from "./uiutils.service";
import { environment } from "src/environments/environment";
import { FileUploader } from "ng2-file-upload";
import { FileInterface } from "../models/file.interface";
import { ImageService } from "./image.service";
import { RatesService } from "./rates.service";
import { Rate } from "../models/Rate";

@Injectable({
  providedIn: "root"
})
export class ActivityService {

  bestFourActivities: Array<any> = [];
  activities: Array<any>;
  public lastSavedActivity_id: number;
  temporaryFiles: Array<FileInterface> = [];
  loading: boolean = false;
  activitiesName: Array<any> = [];
  public uploader: FileUploader = new FileUploader({
    url: `${environment.port}upload`
  });
  constructor(
    private _http: HttpClient,
    private _ui: UIUtilsService,
    public imageService: ImageService,
    private _rates: RatesService
  ) {}


  getBestFourActivities() {
    this._http
      .get<Array<Activity>>(`${environment.port}getBestFourActivities`)
      .subscribe(
        data => {
          this.bestFourActivities = data;
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
        }
      );
  }

  getAllActivities() {
    this._http
      .get<Array<Activity>>(`${environment.port}getAllActivities`)
      .subscribe(
        data => {
          this.activities = data;
          this.getImagePath();
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
        }
      );
  }


  getImagePath() {
    if (this.activities) {
      this.imageService.loading = true;
      this.activities.forEach(a => {
        this.imageService.getImages(a);
      });
    }
  }

  saveActivity(activity: Activity) {
    this.temporaryFiles = [];
    this.uploader.uploadAll();
    this.uploader.response.subscribe((response: FileInterface) => {
      this.temporaryFiles.push(response);
    });
    this.makeActivityRequest(activity);
  }

  makeImageRequest() {
    this.temporaryFiles.forEach(it => {
      console.log(it);
      let t = JSON.parse(String(it));
      let body = {
        id_activity: this.lastSavedActivity_id,
        fieldname: t.fieldname,
        originalname: t.originalname,
        encoding: t.encoding,
        mimetype: t.mimetype,
        destination: t.destination,
        filename: t.filename,
        path: t.path,
        size: t.size
      };
      this._http.post(`${environment.port}saveImage`, body).subscribe(
        () => {
          this._ui.openSnackBar("Imagen guardada con exito", "Ok", 2500);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
          this.loading = false;
        }
      );
    });
  }

  /**
   * Método auxiliar para guardar una actividad, después de haber guardado las imágenes correspondientes
   * @param activity objeto actividad
   */
  makeActivityRequest(activity: Activity) {
    this._http.post<any>(`${environment.port}saveActivity`, activity).subscribe(
      success => {
        this.lastSavedActivity_id = success.id;
        this._ui.openSnackBar("Actividad guardada con éxito", "Ok", 2500);
        this.loading = false;
        this.makeImageRequest();
        this.makeRateRequest(activity.rates);
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
        this.loading = false;
      }
    );
  }

  makeRateRequest(rates: Array<Rate>) {
    console.log(rates);
    rates.forEach(r => {
      r._id_activity = this.lastSavedActivity_id;
      this._rates.saveRate(r);
    });
  }

  updateActivity(activity: Activity) {
    let body = {
      name: activity.name,
      description: activity.description,
      difficulty: activity.difficulty,
      includes: activity.includes,
      duration: activity.duration,
      bring: activity.bring,
      location: activity.location,
      access: activity.access,
      visits: activity.visits,
      in_offer: activity.in_offer,
      id: activity.id
    };
    this._http
      .put(`${environment.port}updateActivity`, body)
      .subscribe(
        () =>
          this._ui.openSnackBar("Actividad actualizada con éxito", "Ok", 2500),
        (err: HttpErrorResponse) => this.handleError(err)
      );
  }

  deleteActivity(activityID: number) {
    let activity_id = activityID;
    this._http
      .delete(`${environment.port}deleteActivity/${activity_id}`)
      .subscribe(
        () => {
          this.activities.splice(
            this.activities.findIndex(a => a.id === activity_id),
            1
          );
          this._ui.openSnackBar("Actividad Eliminada con éxito", "Ok", 2500);
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
        }
      );
  }

  /**
   * Manejador de errores para solicitudes http
   * @param err - Error de la solicitud Http
   */
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

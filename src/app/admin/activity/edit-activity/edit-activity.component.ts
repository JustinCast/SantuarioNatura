import { Component, OnInit } from "@angular/core";
import { ActivityService } from "../../../GeneralServices/activity.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Activity } from "../../../models/Activity";
import { DialogManager } from "../../../GeneralServices/dialog-manager.service";
import { UIUtilsService } from "../../../GeneralServices/uiutils.service";
import { FileInterface } from "../../../models/file.interface";
import { ImageService } from "../../../GeneralServices/image.service";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-edit-activity-dialog",
  templateUrl: "./edit-activity.component.html",
  styleUrls: ["./edit-activity.component.scss"]
})
export class EditActivityComponent implements OnInit {
  difficulty: Array<string> = ["Fácil - Easy", "Media - Medium", "Difícil - Hard"];
  access: Array<string> = ["En carro - By car", "A caballo - By horse", "Caminando - By walking"];
  duration: Array<string> = ["1", "2", "2-5", "5-7", "7+"];
  activity: Activity;
  images: Array<FileInterface>;
  env = environment.imgs;
  constructor(
    public _activityService: ActivityService,
    private route: ActivatedRoute,
    private _dialog: DialogManager,
    private _ui: UIUtilsService,
    private router: Router,
    private _image: ImageService
  ) {}

  ngOnInit() {
    if (
      !this._activityService.activities ||
      this._activityService.activities.length === 0
    )
      this.router.navigate(["/admin/show-activities"]);
    else {
      this.activity = this._activityService.activities[
        Number(this.route.snapshot.paramMap.get("edit"))
      ];
      if (!this.activity.images) this._image.getImages(this.activity);
    }
  }

  updateActivity() {
    this._activityService.updateActivity(this.activity);
    this._activityService.lastSavedActivity_id = this.activity.id;
    this.addImages();
  }

  editRates() {
    this._dialog.editRates(this.activity.id);
  }

  deleteImage(filename, image_id) {
    this._image.deleteImageResource(filename, image_id);
    this.activity.images.splice(this.activity.images.findIndex(i => i.image_id =  image_id), 1);
  }

  addImages() {
    this._activityService.temporaryFiles = [];
    this._activityService.uploader.uploadAll();
    this._activityService.uploader.response.subscribe((response: FileInterface) => {
      this._activityService.temporaryFiles.push(response);
      this._activityService.makeImageRequest();
      this._activityService.uploader.clearQueue();
    });
  }

  openLocDialog() {
    this._dialog
      .activityLocation(this.activity.location, true)
      .subscribe(loc => {
        if (!loc)
          this._ui.openSnackBar(
            "Recuerde que debe seleccionar una ubicación",
            "Ok",
            2500
          );
        if (loc) {
          this.activity.location = loc;
          this._ui.openSnackBar(
            "Localización actualizada con éxito",
            "Ok",
            2500
          );
        }
      });
  }
}

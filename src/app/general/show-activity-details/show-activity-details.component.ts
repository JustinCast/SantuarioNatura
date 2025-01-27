import { Component, OnInit } from "@angular/core";
import { ActivityService } from "src/app/GeneralServices/activity.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ImageService } from "src/app/GeneralServices/image.service";
import { DialogManager } from "src/app/GeneralServices/dialog-manager.service";
import { RatesService } from "src/app/GeneralServices/rates.service";
import { Activity } from "src/app/models/Activity";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-show-activity-details",
  templateUrl: "./show-activity-details.component.html",
  styleUrls: ["./show-activity-details.component.scss"]
})
export class ShowActivityDetailsComponent implements OnInit {
  activity: Activity;
  env = environment.imgs;
  constructor(
    public _activity: ActivityService,
    private route: ActivatedRoute,
    private _im: ImageService,
    private _router: Router,
    private _dialog: DialogManager,
    public _ratesService: RatesService
  ) {}

  ngOnInit() {
    if (this._activity.activities === undefined) {
      this._router.navigate([""]);
    } else {
      this.activity = this._activity.activities.find(a => a.name === String(this.route.snapshot.paramMap.get("name")));
      this._ratesService.getRates(this.activity.id);
    }
  }

  seeLocation() {
    this._dialog.activityLocation(this.activity.location, false);
  }
}

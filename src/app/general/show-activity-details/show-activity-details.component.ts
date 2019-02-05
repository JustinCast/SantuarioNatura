import { Component, OnInit } from "@angular/core";
import { ActivityService } from "src/app/GeneralServices/activity.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ImageService } from "src/app/GeneralServices/image.service";
import { DialogManager } from "src/app/GeneralServices/dialog-manager.service";
import { RatesService } from "src/app/GeneralServices/rates.service";
import { Activity } from "src/app/models/activity";

@Component({
  selector: "app-show-activity-details",
  templateUrl: "./show-activity-details.component.html",
  styleUrls: ["./show-activity-details.component.scss"]
})
export class ShowActivityDetailsComponent implements OnInit {
  activity: Activity;
  constructor(
    private _activity: ActivityService,
    private route: ActivatedRoute,
    private _im: ImageService,
    private _router: Router,
    private _dialog: DialogManager,
    private _ratesService: RatesService
  ) {}

  ngOnInit() {
    if (this._activity.activities === undefined) {
      this._router.navigate([""]);
    } else {
      this.activity = this._activity.activities[
        this.route.snapshot.paramMap.get("index")
      ];
      this._ratesService.getRates(this.activity.id);
    }
  }

  seeLocation() {
    this._dialog.activityLocation(this.activity.location, false);
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivityService } from "../../../GeneralServices/activity.service";
import { DialogManager } from "../../../GeneralServices/dialog-manager.service";

@Component({
  selector: "app-show-activities",
  templateUrl: "./show-activities.component.html",
  styleUrls: ["./show-activities.component.scss"]
})
export class ShowActivitiesComponent implements OnInit {
  constructor(
    public _activityService: ActivityService,
    private dialogManager: DialogManager
  ) {}

  ngOnInit() {
    if(this._activityService.activities.length === 0)
      this._activityService.getAllActivities();
  }

  sync() {

  }

  deleteActivity(index: number) {
    this._activityService.deleteActivity(
      this._activityService.activities[index].id
    );
  }

  editActivity(index: number) {

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/GeneralServices/activity.service';
import { ImageService } from 'src/app/GeneralServices/image.service';
import { Activity } from 'src/app/models/Activity';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-main-activities',
  templateUrl: './show-main-activities.component.html',
  styleUrls: ['./show-main-activities.component.scss']
})
export class ShowMainActivitiesComponent implements OnInit {
  normalActivities: Array<Activity>;
  env = environment.imgs;
  constructor(
    public activityService: ActivityService,
    public imageService: ImageService
    ) { }

  ngOnInit() {
    this.normalActivities = this.activityService.activities.filter(a => a.in_offer === false);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/GeneralServices/activity.service';

@Component({
  selector: 'app-most-visited-activities',
  templateUrl: './most-visited-activities.component.html',
  styleUrls: ['./most-visited-activities.component.scss']
})
export class MostVisitedActivitiesComponent implements OnInit {

  constructor(
    public _activityService: ActivityService
  ) { }

  ngOnInit() {
    this._activityService.getBestFourActivities();
  }

}

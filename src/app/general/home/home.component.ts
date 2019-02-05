import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/GeneralServices/activity.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activityService.getAllActivities();
  }
}

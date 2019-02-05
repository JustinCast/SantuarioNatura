import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/GeneralServices/image.service';
import { ActivityService } from 'src/app/GeneralServices/activity.service';
import { Activity } from 'src/app/models/Activity';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  specialOffersActivities: Array<Activity>;

  constructor(
    public activityService: ActivityService,
    public imageService: ImageService
  ) { }

  ngOnInit() {
    this.specialOffersActivities = this.activityService.activities.filter(a => a.in_offer === true);
  }
}
